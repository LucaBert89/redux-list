import React, { useEffect, useState } from "react";
import { sliceIntoChunks } from "./utils/utils";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  nextPage,
  previousPage,
  selectPagination,
  setTableData,
  filterData,
} from "./tableSlice";
import getProducts from "../../app/services";

export const Table = () => {
  const { listData, page } = useAppSelector(selectPagination);
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    const productsList = await getProducts();
    const { Products } = productsList.data;

    dispatch(setTableData(sliceIntoChunks(Products, 10)));
  };

  const orderTableList = (column: string) => {
    console.log(column);
    dispatch(filterData({ listData, column }));
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
          if (page === listData.length - 1) {
            console.log("page", page);
            dispatch(previousPage(page));
          } else {
            console.log("reduce", page);
            dispatch(nextPage(page + 1));
          }
        }}
      >
        next page
      </div>

      <table id="List">
        <thead>
          <tr>
            {listData.length > 0
              ? Object.keys(listData[0][0]).map((e: any, i: number) => {
                  return (
                    <th key={e.productId}>
                      <button onClick={() => orderTableList(e)}>{e}</button>
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {listData.length > 0
            ? listData[page].map((e: any, i: number) => {
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
