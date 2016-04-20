const initialState = {
  title: {
    text: 'My Title',
    color: 'red'
  },
  rows: []
};

const TableReducer = ( state = initialState, action = {} ) => {

  switch ( action.type ) {
    case 'ADD_ROW':
      return Object.assign({}, state, {
        rows: state.rows.concat({
          text: action.text
        })
      });
    case 'CHANGE_TITLE_COLOR':
      return Object.assign({}, state, {
        title: {
          text: 'My Title',
          color: 'black'
        }
      });
    default:
      return state;
  }

  return state;
};

export default TableReducer;
