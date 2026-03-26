import EmbeddedSubtitles from './EmbeddedSubtitles';
import { spawn } from 'child_process';
import * as fs from 'fs';

jest.mock('child_process');
jest.mock('fs');
jest.mock('../core/Properties', () => ({
	__esModule: true,
	default: {
		isUsingStremioService: false,
		enhancedPath: '/mock/enhanced/path',
	},
}));
jest.mock('./StremioService', () => ({
	__esModule: true,
	default: {
		findExecutable: jest.fn(() => '/mock/stremio/stremio-server'),
	},
}));
jest.mock('./logger', () => ({
	getLogger: jest.fn(() => ({
		error: jest.fn(),
		info: jest.fn(),
		warn: jest.fn(),
	})),
}));

describe('EmbeddedSubtitles.extractSubtitles', () => {
	const mockedSpawn = spawn as jest.MockedFunction<typeof spawn>;
	const mockedExistsSync = fs.existsSync as jest.MockedFunction<typeof fs.existsSync>;
	const mockedReaddirSync = fs.readdirSync as jest.MockedFunction<typeof fs.readdirSync>;

	beforeEach(() => {
		jest.clearAllMocks();

		mockedExistsSync.mockReturnValue(true);
		mockedReaddirSync.mockReturnValue([]);
	});

	it('should handle missing tags, language, and title gracefully', async () => {
		const mockStreams = [
			{
				index: 0,
				codec_type: 'subtitle',
				codec_name: 'webvtt',
				// Missing tags entirely
			},
			{
				index: 1,
				codec_type: 'subtitle',
				codec_name: 'subrip',
				tags: {
					// Missing language and title
				}
			}
		];

		const mockFfprobeOutput = JSON.stringify({ streams: mockStreams });

		// Mock ffprobe spawn
		const mockFfprobeStdout = {
			[Symbol.asyncIterator]: async function* () {
				yield mockFfprobeOutput;
			}
		};

		const mockFfprobeProcess = {
			stdout: mockFfprobeStdout,
			on: jest.fn((event, callback) => {
				if (event === 'close') {
					callback(0); // Success exit code
				}
			}),
		};

		// Mock ffmpeg spawn
		const mockFfmpegProcess = {
			on: jest.fn((event, callback) => {
				if (event === 'close') {
					callback(0); // Success exit code
				}
			}),
		};

		mockedSpawn.mockImplementation((command) => {
			if (command.includes('ffprobe')) {
				return mockFfprobeProcess as any;
			} else if (command.includes('ffmpeg')) {
				return mockFfmpegProcess as any;
			}
			return {} as any;
		});

		const result = await EmbeddedSubtitles.extractSubtitles('http://mock.stream.url');

		expect(result).toHaveLength(2); // Two subtitle streams

		// Assert fallback behavior for first subtitle stream (missing tags)
		expect(result[0]).toMatchObject({
			shortLang: 'track0',
			descriptiveName: 'track0',
		});

		// Assert fallback behavior for second subtitle stream (missing language and title in tags)
		expect(result[1]).toMatchObject({
			shortLang: 'track1',
			descriptiveName: 'track1',
		});

		// Verify ffmpeg was called with correct fallback names in output paths
		expect(mockedSpawn).toHaveBeenCalledWith(
			expect.stringContaining('ffmpeg'),
			expect.arrayContaining([expect.stringContaining('subs_track0_0.vtt')]),
			expect.any(Object)
		);

		expect(mockedSpawn).toHaveBeenCalledWith(
			expect.stringContaining('ffmpeg'),
			expect.arrayContaining([expect.stringContaining('subs_track1_1.vtt')]),
			expect.any(Object)
		);
	});

	it('should handle missing tags, language, and title in codec extraction gracefully with full mapping', async () => {
		const mockStreams = [
			{
				index: 0,
				codec_type: 'subtitle',
				codec_name: 'webvtt',
				// Tags missing
			},
			{
				index: 1,
				codec_type: 'subtitle',
				codec_name: 'webvtt',
				tags: {}
			}
		];

		const mockFfprobeOutput = JSON.stringify({ streams: mockStreams });

		// Mock ffprobe spawn
		const mockFfprobeStdout = {
			[Symbol.asyncIterator]: async function* () {
				yield mockFfprobeOutput;
			}
		};

		const mockFfprobeProcess = {
			stdout: mockFfprobeStdout,
			on: jest.fn((event, callback) => {
				if (event === 'close') {
					callback(0); // Success exit code
				}
			}),
		};

		// Mock ffmpeg spawn
		const mockFfmpegProcess = {
			on: jest.fn((event, callback) => {
				if (event === 'close') {
					callback(0); // Success exit code
				}
			}),
		};

		mockedSpawn.mockImplementation((command) => {
			if (command.includes('ffprobe')) {
				return mockFfprobeProcess as any;
			} else if (command.includes('ffmpeg')) {
				return mockFfmpegProcess as any;
			}
			return {} as any;
		});

		const result = await EmbeddedSubtitles.extractSubtitles('http://mock.stream.url');

		expect(result).toHaveLength(2);
		expect(result[0]).toMatchObject({
			shortLang: 'track0',
			descriptiveName: 'track0',
		});
		expect(result[1]).toMatchObject({
			shortLang: 'track1',
			descriptiveName: 'track1',
		});
	});

	it('should return empty array if no streams are present', async () => {
		const mockFfprobeOutput = JSON.stringify({ streams: [] });

		// Mock ffprobe spawn
		const mockFfprobeStdout = {
			[Symbol.asyncIterator]: async function* () {
				yield mockFfprobeOutput;
			}
		};

		const mockFfprobeProcess = {
			stdout: mockFfprobeStdout,
			on: jest.fn((event, callback) => {
				if (event === 'close') {
					callback(0); // Success exit code
				}
			}),
		};

		mockedSpawn.mockImplementation((command) => {
			if (command.includes('ffprobe')) {
				return mockFfprobeProcess as any;
			}
			return {} as any;
		});

		const result = await EmbeddedSubtitles.extractSubtitles('http://mock.stream.url');
		expect(result).toHaveLength(0);
		expect(mockedSpawn).toHaveBeenCalledTimes(1); // Only ffprobe called
	});
});
