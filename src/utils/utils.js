export const preloader = (formButton, isLoading, textStatus) => {
  if (isLoading) {
    formButton.textContent = 'Сохранение...'
  } else {
    formButton.textContent = textStatus;
  }
}
