export function formatDateToSave(date) {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
}

