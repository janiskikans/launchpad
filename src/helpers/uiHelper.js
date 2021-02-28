export function disableBodyScroll() {
  document.documentElement.style.overflowY = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = 'no';
}

export function enableBodyScroll() {
  document.documentElement.style.overflowY = 'scroll';
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = 'yes';
}
