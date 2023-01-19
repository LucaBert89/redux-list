import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectPagination, retrieveProductInfo } from "../table/tableSlice";

export const ProductDetail = () => {
  const { listData, product } = useAppSelector(selectPagination);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(product);
    dispatch(retrieveProductInfo({ listData, id }));
  }, []);

  return <div>{id}</div>;
};
