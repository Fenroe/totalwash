export const clearFocus = () => {
  const activeElement = document.activeElement as HTMLElement;
  if (activeElement && activeElement !== document.body) activeElement.blur();
};
