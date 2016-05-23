export function hookHandler(next, preFunc) {
  return function(event) {
    preFunc();
    event.persist();
    setTimeout(()=>next(event), 0);
  }
}
