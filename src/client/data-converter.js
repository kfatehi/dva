import { List } from 'immutable';

export function toRowCol(data) {
  let columns = Object.keys(data[0]);
  let rows = data.map(row=> columns.map(key=>row[key]));
  return { rows, columns };
}

export function toRowColImmutable(data) {
  let columns = List(data.get(0).keys());
  let rows = data.map(row=> columns.map(key=>row.get(key)));
  return { rows, columns };
}
