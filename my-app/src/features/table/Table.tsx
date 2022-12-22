import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  nextPage,
  previousPage,
  selectPagination,
  setTableData,
} from "./tableSlice";
import getPosts from "../../app/services";

export const Table = () => {
  const { listData, page } = useAppSelector(selectPagination);
  console.log(page);
  const fetchPosts = async () => {
    const postsList = await getPosts();
    const { posts } = postsList.data.user;

    dispatch(setTableData(sliceIntoChunks(posts.data, 5)));
  };

  function sliceIntoChunks(arr: [], chunkSize: number) {
    const res = [];
    console.log(arr);
    for (let i = 0; i < arr.length; i += chunkSize) {
      console.log("iterator", i);
      const chunk = arr.slice(i, i + chunkSize);
      console.log("chunk", chunk);
      res.push(chunk);
    }

    return res;
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Comments List</h1>

      <button onClick={() => fetchPosts()}>CLICCA</button>
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
      {console.log("pagina", page)}
      {listData.length > 0
        ? listData[page].map((e: any, i: number) => {
            return <div>{e.title}</div>;
          })
        : null}
      {/* <table id="List">
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Berglunds snabbköp</td>
          <td>Christina Berglund</td>
          <td>Sweden</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Königlich Essen</td>
          <td>Philip Cramer</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
        <tr>
          <td>North/South</td>
          <td>Simon Crowther</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Paris spécialités</td>
          <td>Marie Bertrand</td>
          <td>France</td>
        </tr>
      </table> */}
    </div>
  );
};
