import { Products } from "../interfaces/Products";

export function sliceIntoChunks(arr: Products[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
}

export function sortingList(listData: Products[], column: string, order: boolean) {
  const sortedList = listData.sort((a: Products, b: Products) => {
    if (a[column as keyof typeof a] < b[column as keyof typeof b]) {
      return order ? -1 : 1;
    }
    if (a[column as keyof typeof a] > b[column as keyof typeof b]) {
      return order ? 1 : -1;
    }
    return 0;
  });
  return sortedList;
}
