import Settings from './Settings';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] ?? null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('Settings Manager', () => {
    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();
    });

    describe('get()', () => {
        it('should return defaultValue if key does not exist', () => {
            const result = Settings.get('nonexistent_key', 'default_value');
            expect(result).toBe('default_value');
            expect(window.localStorage.getItem).toHaveBeenCalledWith('nonexistent_key');
        });

        it('should return null if key does not exist and no default is provided', () => {
            const result = Settings.get('another_nonexistent');
            expect(result).toBeNull();
        });

        it('should parse and return valid JSON objects', () => {
            window.localStorage.setItem('my_obj', JSON.stringify({ a: 1, b: "two" }));
            const result = Settings.get('my_obj');
            expect(result).toEqual({ a: 1, b: "two" });
        });

        it('should parse and return valid JSON arrays', () => {
            window.localStorage.setItem('my_arr', JSON.stringify(["plugin1", "plugin2"]));
            const result = Settings.get('my_arr');
            expect(result).toEqual(["plugin1", "plugin2"]);
        });

        it('should return raw string if value is not valid JSON', () => {
            window.localStorage.setItem('my_str', 'just_a_string');
            const result = Settings.get('my_str');
            expect(result).toBe('just_a_string');
        });
    });

    describe('set()', () => {
        it('should store a plain string directly', () => {
            Settings.set('str_key', 'hello');
            expect(window.localStorage.setItem).toHaveBeenCalledWith('str_key', 'hello');
            expect(window.localStorage.getItem('str_key')).toBe('hello');
        });

        it('should serialize and store an object as JSON string', () => {
            Settings.set('obj_key', { a: 1 });
            expect(window.localStorage.setItem).toHaveBeenCalledWith('obj_key', '{"a":1}');
            expect(window.localStorage.getItem('obj_key')).toBe('{"a":1}');
        });

        it('should serialize and store an array as JSON string', () => {
            Settings.set('arr_key', [1, 2, 3]);
            expect(window.localStorage.setItem).toHaveBeenCalledWith('arr_key', '[1,2,3]');
            expect(window.localStorage.getItem('arr_key')).toBe('[1,2,3]');
        });
    });

    describe('remove()', () => {
        it('should remove an item by key', () => {
            window.localStorage.setItem('key_to_remove', 'value');
            Settings.remove('key_to_remove');
            expect(window.localStorage.removeItem).toHaveBeenCalledWith('key_to_remove');
            expect(window.localStorage.getItem('key_to_remove')).toBeNull();
        });
    });
});
