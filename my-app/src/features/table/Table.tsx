import React, { useEffect, useState } from "react";
import { sliceIntoChunks } from "./utils/utils";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  nextPage,
  previousPage,
  selectPagination,
  setTableData,
  sortData,
  filterDataList,
} from "./tableSlice";
import getProducts from "../../app/services";
import { Products } from "../../../../server/products/interfaceProducts";

export const Table = () => {
  const { listData, page, filterList } = useAppSelector(selectPagination);
  const [order, setOrder] = useState<boolean>(true);
  const [inputFilter, setInputFilter] = useState<Products>({
    productId: "",
    product: "",
    productName: "",
    productDescription: "",
    price: "",
    companyName: "",
  });
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    const productsList = await getProducts();
    const { Products } = productsList.data;

    dispatch(setTableData(sliceIntoChunks(Products, 10)));
  };

  const orderTableList = (column: string) => {
    setOrder(!order);
    dispatch(sortData({ listData, column, order }));
  };

  const filterData = (column: string, e: any) => {
    const { value } = e.target;

    setInputFilter({ ...inputFilter, [column]: value.toString() });
    dispatch(
      filterDataList({
        listData,
        column,
        value,
      })
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Comments List</h1>
      <button onClick={() => fetchProducts()}>CLICCA</button>
      <div
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
          color: "red",
          position: "relative",
          display: "flex",
        }}
        onClick={() => {
          if (page < filterList.length - 1) {
            dispatch(nextPage(page));
          }
        }}
      >
        next page
      </div>
      <div
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
          color: "red",
          position: "relative",
          display: "flex",
        }}
        onClick={() => {
          if (page > 0) dispatch(previousPage(page));
        }}
      >
        prev page
      </div>

      <table id="List">
        <thead>
          <tr>
            {listData.length > 0
              ? Object.keys(listData[0][0]).map((header: string, i: number) => {
                  return (
                    <th key={header}>
                      <input
                        type="text"
                        onChange={(e) => filterData(header, e)}
                        value={inputFilter[header as keyof typeof inputFilter]}
                      ></input>
                      <button onClick={() => orderTableList(header)}>
                        {header}
                      </button>
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {filterList.length > 0
            ? filterList[page].map((e: Products, i: number) => {
                return (
                  <tr key={e.productId}>
                    <td>{e.productId}</td>
                    <td>{e.product}</td>
                    <td>{e.productName}</td>
                    <td>{e.productDescription}</td>
                    <td>{e.price}</td>
                    <td>{e.companyName}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};
