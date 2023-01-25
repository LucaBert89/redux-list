import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Products } from "./interfaces/Products";
import { PaginationState, FilterDataPayload, SortDataPayload } from "./interfaces/TableSlice";
import { sliceIntoChunks, sortingList } from "./utils/utils";


const initialState: PaginationState = {
  listData: [],
  filterList: [],
  deletedItems: [],
  backupList: [],
  page: 0,
  orderDirection: true,
  productDetail: [],
  status: "idle",
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTableData: (state, action: PayloadAction<any>) => {
      state.listData = action.payload;
      state.filterList = action.payload;
    },
    nextPage: (state, action: PayloadAction<number>) => {
      console.log("setPage", action.payload);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.page += 1;
    },
    previousPage: (state, action: PayloadAction<number>) => {
      console.log("setPage", action.payload);
      state.page -= 1;
    },
    sortData: (state, action: PayloadAction<SortDataPayload>) => {
      const { listData, column, order } = action.payload;

      const sortData = sortingList(listData.flat(), column, order);
      const result = sliceIntoChunks(sortData, 10);
      state.filterList = result;
    },
    filterDataList: (state, action: PayloadAction<FilterDataPayload>) => {
      const { listData, column, value } = action.payload;

      const filteredData = listData.flat().filter((item: Products) => {
        return (
          item[column as keyof typeof item].substring(0, value.length).toLowerCase() ===
          value.toLowerCase()
        );
      });
      const result = sliceIntoChunks(filteredData, 10);
      if (result.length > 0) {
        state.filterList = result;
      } else {
        state.filterList = listData;
      }
    },
    retrieveProductInfo: (state, action: PayloadAction<any>) => {
      const { listData, id } = action.payload;

      const productInfo = listData.flat().find((item: Products) => {
        return item.productId === id;
      });

      state.productDetail = productInfo;
    },
    removeItems: (state, action: PayloadAction<any>) => {
      const { filterList, productId, undo } = action.payload;
      if (state.backupList.length === 0) {
        state.backupList = filterList;
      }

      if (undo) {
        state.filterList = state.backupList;
        state.deletedItems = [];
        return;
      }

      const filteredData = filterList.flat().filter((item: Products) => {
        return item.productId !== productId;
      });

      const result = sliceIntoChunks(filteredData, 10);
      state.filterList = result;
      state.deletedItems.push(productId);
    },
  },
});

export const selectPagination = (state: RootState) => state.table;

export const {
  nextPage,
  previousPage,
  setTableData,
  sortData,
  filterDataList,
  retrieveProductInfo,
  removeItems,
} = tableSlice.actions;

export default tableSlice.reducer;
