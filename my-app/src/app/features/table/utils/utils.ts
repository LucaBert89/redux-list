import { Products } from "../interfaces/Products";

export function sliceIntoChunks(arr: any, chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
}

export function sortingList(listData: Products[], column: string, order: boolean) {
  const sortedList = listData.sort((a: any, b: any) => {
    if (a[column] < b[column]) {
      return order ? -1 : 1;
    }
    if (a[column] > b[column]) {
      return order ? 1 : -1;
    }
    return 0;
  });
  return sortedList;
}
