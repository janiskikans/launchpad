export function disableBodyScroll() {
  document.documentElement.style.overflowY = 'hidden';
  document.body.scroll = 'no';
}

export function enableBodyScroll() {
  document.documentElement.style.overflowY = 'scroll';
  document.body.scroll = 'yes';
}
