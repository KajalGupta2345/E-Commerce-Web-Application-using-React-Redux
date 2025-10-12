import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userAction";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const users = useSelector((state) => state.userReducer.users);

  const increaseCartQuantityHandler = (index) => {
    const copyuser = { ...users, cart: [...users.cart] };

    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const decreaseCartQuantityHandler = (index) => {
    const copyuser = { ...users, cart: [...users.cart] };
    if (users.cart[index].quantity > 1) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    } else {
      copyuser.cart.splice(index, 1);
    }
    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const cartItems = users?.cart?.map((c, index) => {
    return (
      <li
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-2xl shadow-md hover:shadow-lg p-5 sm:p-6  transition "
        key={c.product.id}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <img
            className="sm:w-32 sm:h-32 h-24 w-24 rounded-xl border-4 p-2 border-blue-400 object-contain bg-white"
            src={c.product.image}
            alt=""
          />
          <div className="text-center sm:text-left ">
            <p className="text-base sm:text-lg font-medium text-gray-800">
              {c.product.title}
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              ₹{c.product.price}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-end gap-4 mt-4 sm:mt-0">
          <button 
            className="w-8 h-8 sm:w-10 sm:h-10  bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold rounded-full cursor-pointer"
            onClick={() => decreaseCartQuantityHandler(index)}
          >
            -
          </button>
          <span className="text-base sm:text-lg bg-blue-500 text-white px-4 py-2 rounded-lg min-w-[50px] text-center">
            {c.quantity}
          </span>
          <button
            className="w-8 h-8 sm:w-10 sm:h-10  bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold rounded-full cursor-pointer "
            onClick={() => increaseCartQuantityHandler(index)}
          >
            +
          </button>
        </div>
      </li>
    );
  });
  return (
    <div className="min-h-screen bg-gray-50 rounded py-10 px-4 sm:px-6 lg:px-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        🛒 Add Your Cart
      </h1>

      <ul className="flex flex-col gap-6 max-w-5xl mx-auto">{cartItems}</ul>
    </div>
  );
};

export default Cart;
