// Mock setImmediate for winston logger in JSDOM
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = setTimeout;
}
