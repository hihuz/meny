export const sortByName = (a, b) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) {
    return -1;
  }
  return 1;
};

export const sortByDate = (a, b) => b.updated - a.updated;
