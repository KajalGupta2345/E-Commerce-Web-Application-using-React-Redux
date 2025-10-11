import axios from "../../api/axiosconfig";
import { loadproduct } from "../reducers/productSlice";

export const asyncloadProduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadproduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncloadProduct(product));
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProduct =
  (product, id) => async (dispatch, getState) => {
    try {
      await axios.patch(`/products/${id}`, product);
      dispatch(asyncloadProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/products/${id}`);
    dispatch(asyncloadProduct());
  } catch (error) {
    console.log(error);
  }
};

