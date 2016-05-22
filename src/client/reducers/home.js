import { Map, List, fromJS } from 'immutable';

export function home(state = Map(), action) {
  function setNotebooks(state, notebooks) {
    return state.update('notebooks', () => fromJS(notebooks));
  }

  switch (action.type) {
    case 'SET_NOTEBOOKS':
      return setNotebooks(state, action.notebooks);
  }
  return state;
}
