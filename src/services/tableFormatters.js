export function formatDate(row, column, cell) {
  const date = new Date(cell);

  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function formatAuthor(row, column, cell) {
  return cell.attributes.name;
}
