export function filterByCategory(items, category) {
  return category
    ? items.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    : items;
}

export default function sortItems(items, order) {
  if (order === "A-Z") {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (order === "Z-A") {
    return [...items].sort((a, b) => b.title.localeCompare(a.title));
  }
  return items;
}
