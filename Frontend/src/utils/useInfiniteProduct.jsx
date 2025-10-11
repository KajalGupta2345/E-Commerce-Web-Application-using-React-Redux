import { useDispatch, useSelector } from "react-redux";
import { loadlazyproduct } from "../store/reducers/productSlice";
import axios from "../api/axiosconfig";
import {useEffect, useState} from "react";

const useInfiniteProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [hasMore, sethasMore] = useState(false);

  const fetchproducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=8&_start=${products.length}`
      );
      if (data.length == 0) {
        sethasMore(false);
      } else {
        sethasMore(true);
        dispatch(loadlazyproduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return {products,fetchproducts,hasMore};
};

export default useInfiniteProduct;
