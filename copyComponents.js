const fs = require('fs');
const path = require('path');

// Copy .html and .js files from src/components/** to dist/components/**
function copyFiles(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    
    const items = fs.readdirSync(srcDir);
    
    items.forEach(item => {
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);
        
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
            copyFiles(srcPath, destPath);
        } else if (stat.isFile() && !srcPath.endsWith('.ts')) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} to ${destPath}`);
        }
    });
}

const srcDir = 'src/components';
const destDir = 'dist/components';

copyFiles(srcDir, destDir);
