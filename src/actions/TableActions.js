export const addRow = (text) => {
  return {
    type: 'ADD_ROW',
    text: text
  };
};

export const changeTitleColor = () => {
  return {
    type: "CHANGE_TITLE_COLOR"
  };
};
