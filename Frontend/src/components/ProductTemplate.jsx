import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userAction";

const ProductTemplate = ({ product }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const AddToCartHandler = (product) => {
    const copyuser = { ...users, cart: [...users.cart] };

    const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);

    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }
    dispatch(asyncupdateuser(users.id, copyuser));
  };
  return (
    <div
     className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col  min-h-[400px] "
      key={product.id}
    >
      <img
        loading="lazy" className="w-full h-40 sm:h-44 md:h-48  object-contain mb-4"
        src={product.image}
        alt={product.title}
      />
      <h1 className="font-semibold text-lg line-clamp-2 mb-2 text-gray-600 text-center">
        {product.title}
      </h1>
      <small className="text-gray-600 text-center line-clamp-2 mb-4">
        {product.description.slice(0, 60)}...
      </small>

      <div className="flex justify-between gap-2 md:flex-col md:gap-2 xl:flex-row items-center mt-auto ">
        <p className="font-bold text-xl text-green-600">₹{product.price}</p>
        <Link
          to="/cart"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => AddToCartHandler(product)}
        >
          Add to cart
        </Link>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="mt-2 text-blue-500 hover:underline hover:text-blue-600"
      >
        More Info
      </Link>
    </div>
  );
};

export default ProductTemplate;
