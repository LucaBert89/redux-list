import { useEffect, useState } from "react";
import { sliceIntoChunks } from "./utils/utils";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  nextPage,
  previousPage,
  selectPagination,
  setTableData,
  sortData,
  filterDataList,
  removeItems,
} from "./tableSlice";
import { getProducts } from "../../services";
import { Products } from "../../../../../server/products/interfaceProducts";
import "./style/table.css";

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

  const removeButton = (productId: string) => {
    dispatch(removeItems({ filterList, productId }));
  };

  const orderTableList = (column: string) => {
    setOrder(!order);
    dispatch(sortData({ listData, column, order }));
  };

  const undoProductRemove = (undo: boolean) => {
    dispatch(removeItems({ filterList, undo }));
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
    if (filterList.length === 0) fetchProducts();
  }, []);

  return (
    <div>
      <h1>Comments List</h1>
      <div className="table-buttons">
        <div
          className="table-button_prev"
          onClick={() => {
            if (page > 0) dispatch(previousPage(page));
          }}
        >
          prev page
        </div>
        <div
          className="table-button_next"
          onClick={() => {
            if (page < filterList.length - 1) {
              dispatch(nextPage(page));
            }
          }}
        >
          next page
        </div>
      </div>
      <table id="table-list">
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
            <th>
              <button>Delete</button>
            </th>
            <th>
              <button>Dettaglio</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filterList.length > 0
            ? filterList[page].map((e: Products, i: number) => {
                return (
                  <tr className="table-rows" key={e.productId}>
                    <td className="table-column">{e.productId}</td>
                    <td className="table-column">{e.product}</td>
                    <td className="table-column">{e.companyName}</td>
                    <td
                      className="table-column"
                      onClick={() => removeButton(e.productId)}
                    >
                      Delete
                    </td>
                    <td className="table-column">
                      <button>
                        <Link
                          to={`/products/${e.productId}`}
                          state={filterList}
                        >
                          Dettaglio
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
          <button>Conferma</button>
          <button onClick={() => undoProductRemove(true)}>Annulla</button>
        </tbody>
      </table>
    </div>
  );
};
