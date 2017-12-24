export function formatDate(row, column, cell) {
  const date = new Date(cell);

  return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
