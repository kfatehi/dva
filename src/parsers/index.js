let parsers = {
  'json': {
    parse: function(str) {
      return JSON.parse(str);
    },
    stringify: function(obj) {
      return JSON.stringify(obj);
    }
  }
}

export function parseData(parser, data) {
  try {
    return parsers[parser].parse(data);
  } catch (e) {
    return [];
  }
}
