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
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_PRODUCT } from "../../services/query";

export const ProductDetail = () => {
  
  const { id } = useParams<paramsId>();


  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productId: id },
  });

  if (loading) return (
    <div>
      Loading
      <div></div>
    </div>
  );
  if (error) return (
    <div>
      Error
      <div></div>
    </div>
  );;

  const {Product} = data
 
  return (
    <div>
      <div>ProductName: {Product.productName}</div>
      <div>Price: {Product.price}</div>
      <div>Product: {Product.product}</div>
      <div>Product Description: {Product.productDescription}</div>
    </div>
  );
};
