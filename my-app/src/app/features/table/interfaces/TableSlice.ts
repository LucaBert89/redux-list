import { Products } from "./Products";

export interface FilterDataPayload {
    listData: Products[][],
    column: string,
    value: string
  }

  export interface SortDataPayload {
    listData: Products[][],
    column: string,
    order: boolean
  }
  
  
  export interface PaginationState {
    listData: Products[][];
    filterList: Products[][];
    deletedItems: string[];
    backupList:Products[][];
    page: number;
    orderDirection: boolean;
    productDetail: string[];
    status: "idle" | "loading" | "failed";
  }