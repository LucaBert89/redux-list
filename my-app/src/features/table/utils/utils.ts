export function sliceIntoChunks(arr: any, chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
}

export function sortingList(listData: [], column: string, order: any) {
  const sortedList = listData.sort((a: any, b: any) => {
    if (a[column] < b[column]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[column] > b[column]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sortedList;
}
