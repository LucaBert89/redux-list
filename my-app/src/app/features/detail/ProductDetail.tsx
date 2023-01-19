import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getSingleProduct } from "../../services";
import {
  selectPagination,
  retrieveProductInfo,
  getProduct,
} from "../table/tableSlice";
import { paramsId } from "./interfaces/idParams";

export const ProductDetail = () => {
  const { listData, productDetail } = useAppSelector(selectPagination);
  const { id } = useParams<paramsId>();

  const dispatch = useAppDispatch();

  const fetchProductInfo = async () => {
    const productInfo = dispatch(getProduct(id));

    // dispatch(setTableData(sliceIntoChunks(Products, 10)));
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  console.log(productDetail);
  return (
    <div>
      {id}
      <div></div>
    </div>
  );
};
