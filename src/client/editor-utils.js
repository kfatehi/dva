export function hookHandler(next, preFunc) {
  return function(event) {
    event.persist();
    event.preventDefault();
    preFunc();
    setTimeout(()=>next(event), 0);
  }
}
