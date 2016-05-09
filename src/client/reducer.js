import {List, Map} from 'immutable';

export default function (state = Map(), action) {
  switch (action.type) {
    default: {
      console.log("unhandled action", action.type, action);
      return state;
    }
  }
  return state;
}
