import csvParseSync from 'csv-parse/lib/sync';


let parsers = {
  'json': {
    parse: function(str) {
      return JSON.parse(str);
    }
  },
  'csv': {
    parse: function(str) {
      return csvParseSync(str, { delimiter: ',', columns: true })
    }
  },
  'tsv': {
    parse: function(str) {
      return csvParseSync(str, { delimiter: '\t', columns: true })
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
