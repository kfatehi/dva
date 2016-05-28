export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', Object.assign({}, action, {
      meta: {
        uuid: store.getState().getIn(['notebook', 'uuid'])
      }
    }))
  }
  return next(action);
}
