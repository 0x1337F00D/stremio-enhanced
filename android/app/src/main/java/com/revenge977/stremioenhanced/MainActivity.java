package com.revenge977.stremioenhanced;

import android.app.PictureInPictureParams;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.provider.DocumentsContract;
import android.util.Rational;
import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.webkit.JavascriptInterface;
import android.webkit.WebViewClient;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import com.getcapacitor.BridgeWebViewClient;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {

    private View mCustomView;
    private WebChromeClient.CustomViewCallback mCustomViewCallback;
    private boolean webViewConfigured = false;
    private boolean pictureInPictureEnabled = false;
    private Rational pictureInPictureAspectRatio = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onStart() {
        super.onStart();
        setupWebView();
        // Initial injection (fallback)
        injectPreload();
    }

    @Override
    public void onResume() {
        super.onResume();
        // Re-inject in case of reload/navigation (fallback)
        injectPreload();
        setImmersiveMode();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && !isInPictureInPictureCompat()) {
            setImmersiveMode();
        }
    }

    @Override
    public void onUserLeaveHint() {
        super.onUserLeaveHint();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            return;
        }

        if (pictureInPictureEnabled) {
            enterPictureInPictureInternal();
        }
    }

    @Override
    public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode, Configuration newConfig) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);

        if (!isInPictureInPictureMode) {
            setImmersiveMode();
        }

        emitToWeb("stremio-enhanced-pip-mode", "{ isInPictureInPicture: " + isInPictureInPictureMode + " }");
    }

    private boolean isInPictureInPictureCompat() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && isInPictureInPictureMode();
    }

    private void setImmersiveMode() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }

    private void setupWebView() {
        try {
            if (this.getBridge() == null) return;
            WebView webView = this.getBridge().getWebView();
            if (webView == null) return;
            if (webViewConfigured) return;

            webViewConfigured = true;
            webView.addJavascriptInterface(new StremioEnhancedAndroidBridge(), "StremioEnhancedAndroid");

            // Setup Custom WebChromeClient for Fullscreen
            webView.setWebChromeClient(new BridgeWebChromeClient(this.getBridge()) {
                @Override
                public void onShowCustomView(View view, CustomViewCallback callback) {
                    if (mCustomView != null) {
                        callback.onCustomViewHidden();
                        return;
                    }

                    mCustomView = view;
                    mCustomViewCallback = callback;

                    FrameLayout decor = (FrameLayout) getWindow().getDecorView();
                    decor.addView(mCustomView, new FrameLayout.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT));

                    setImmersiveMode();
                }

                @Override
                public void onHideCustomView() {
                    if (mCustomView == null) {
                        return;
                    }

                    FrameLayout decor = (FrameLayout) getWindow().getDecorView();
                    decor.removeView(mCustomView);
                    mCustomView = null;

                    if (mCustomViewCallback != null) {
                        mCustomViewCallback.onCustomViewHidden();
                        mCustomViewCallback = null;
                    }

                    setImmersiveMode();
                }
            });

            // Setup Custom WebViewClient for Injection on Navigation
            webView.setWebViewClient(new BridgeWebViewClient(this.getBridge()) {
                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);
                    injectPreload();
                }
            });

        } catch (Exception e) {
             e.printStackTrace();
        }
    }

    private void injectPreload() {
        try {
            if (this.getBridge() == null) return;
            WebView webView = this.getBridge().getWebView();
            if (webView == null) return;

            InputStream is = getAssets().open("preload.js");
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            String script = sb.toString();

            // Execute as anonymous function to avoid scope pollution if run multiple times
            String safeScript = "if (!window.stremioEnhanced) { (function() { " + script + " })(); }";

            webView.evaluateJavascript(safeScript, null);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean supportsPictureInPicture() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                && getPackageManager().hasSystemFeature(PackageManager.FEATURE_PICTURE_IN_PICTURE);
    }

    private Rational buildAspectRatio(double width, double height) {
        int safeWidth = (int) Math.round(width);
        int safeHeight = (int) Math.round(height);

        if (safeWidth <= 0 || safeHeight <= 0) {
            return null;
        }

        int divisor = greatestCommonDivisor(safeWidth, safeHeight);
        return new Rational(safeWidth / divisor, safeHeight / divisor);
    }

    private int greatestCommonDivisor(int left, int right) {
        int first = Math.abs(left);
        int second = Math.abs(right);

        while (second != 0) {
            int remainder = first % second;
            first = second;
            second = remainder;
        }

        return first == 0 ? 1 : first;
    }

    private PictureInPictureParams buildPictureInPictureParams() {
        PictureInPictureParams.Builder builder = new PictureInPictureParams.Builder();

        if (pictureInPictureAspectRatio != null) {
            builder.setAspectRatio(pictureInPictureAspectRatio);
        }

        View sourceView = mCustomView != null ? mCustomView : (this.getBridge() != null ? this.getBridge().getWebView() : null);
        if (sourceView != null) {
            Rect sourceRectHint = new Rect();
            if (sourceView.getGlobalVisibleRect(sourceRectHint)) {
                builder.setSourceRectHint(sourceRectHint);
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            builder.setAutoEnterEnabled(pictureInPictureEnabled);
            builder.setSeamlessResizeEnabled(true);
        }

        return builder.build();
    }

    private void updatePictureInPictureState(boolean enabled, double width, double height) {
        pictureInPictureEnabled = enabled;
        pictureInPictureAspectRatio = buildAspectRatio(width, height);

        if (!supportsPictureInPicture()) {
            return;
        }

        setPictureInPictureParams(buildPictureInPictureParams());
    }

    private boolean enterPictureInPictureInternal() {
        if (!supportsPictureInPicture() || isInPictureInPictureCompat()) {
            return false;
        }

        return enterPictureInPictureMode(buildPictureInPictureParams());
    }

    private Uri buildInitialDocumentsUri(String path) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O || path == null) {
            return null;
        }

        String normalizedPath = path.trim();
        if (normalizedPath.startsWith("content://") || normalizedPath.startsWith("file://")) {
            return Uri.parse(normalizedPath);
        }

        String documentsPath = normalizedPath.isEmpty()
                ? "Documents/Stremio Enhanced"
                : "Documents/" + normalizedPath;
        String documentId = "primary:" + documentsPath;
        return DocumentsContract.buildDocumentUri("com.android.externalstorage.documents", documentId);
    }

    private void openPathInFilesApp(String relativePath) {
        String normalizedPath = relativePath == null ? "" : relativePath.trim();
        String displayPath = normalizedPath.isEmpty() ? "Documents/Stremio Enhanced" : "Documents/" + normalizedPath;

        Toast.makeText(this, "Manage files in " + displayPath, Toast.LENGTH_LONG).show();

        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_GRANT_READ_URI_PERMISSION
                | Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);

        Uri initialUri = buildInitialDocumentsUri(normalizedPath);
        if (initialUri != null) {
            intent.putExtra(DocumentsContract.EXTRA_INITIAL_URI, initialUri);
        }

        try {
            startActivity(Intent.createChooser(intent, "Open Files"));
        } catch (ActivityNotFoundException exception) {
            Intent settingsIntent = new Intent(
                    Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                    Uri.fromParts("package", getPackageName(), null)
            );
            startActivity(settingsIntent);
        }
    }

    private void emitToWeb(String eventName, String detailJson) {
        if (this.getBridge() == null || this.getBridge().getWebView() == null) return;

        String script = "window.dispatchEvent(new CustomEvent(" +
                JSONObject.quote(eventName) +
                ", { detail: " + detailJson + " }));";

        this.getBridge().getWebView().post(() ->
                this.getBridge().getWebView().evaluateJavascript(script, null)
        );
    }

    private class StremioEnhancedAndroidBridge {
        @JavascriptInterface
        public boolean isPictureInPictureSupported() {
            return supportsPictureInPicture();
        }

        @JavascriptInterface
        public boolean enterPictureInPicture(double width, double height) {
            if (!supportsPictureInPicture()) {
                return false;
            }

            runOnUiThread(() -> {
                updatePictureInPictureState(true, width, height);
                enterPictureInPictureInternal();
            });
            return true;
        }

        @JavascriptInterface
        public void setPictureInPictureState(boolean enabled, double width, double height) {
            runOnUiThread(() -> updatePictureInPictureState(enabled, width, height));
        }

        @JavascriptInterface
        public void openPath(String path) {
            runOnUiThread(() -> openPathInFilesApp(path));
        }
    }
}
