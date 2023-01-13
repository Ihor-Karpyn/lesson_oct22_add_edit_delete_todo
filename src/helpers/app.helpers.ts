interface IdObject {
  id: number;
}

export const getNewId = (arr: IdObject[]) => {
  if (arr.length === 0) {
    return 1;
  }

  const ids = arr.map(el => el.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
