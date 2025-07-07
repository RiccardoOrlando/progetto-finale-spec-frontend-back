
export function filterByCategory(items, category) {
  return category
    ? items.filter(item => item.category.toLowerCase() === category.toLowerCase())
    : items;
}

export function sortItems(items, order) {
  if (order === "a-z") {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }
  if (order === "z-a") {
    return [...items].sort((a, b) => b.title.localeCompare(a.title));
  }
  return items;
}
