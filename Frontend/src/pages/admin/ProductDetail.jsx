import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { categories } from "./CategoriesData";
import { useState, useEffect } from "react";
import { asyncUpdateProduct } from "../../store/actions/productAction";
import { asyncDeleteProduct } from "../../store/actions/productAction";
import { asyncupdateuser } from "../../store/actions/userAction";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
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

  const { id } = useParams();
  const [mainCategory, setmainCategory] = useState("");

  // console.log(products,users);

  const product = products?.find((product) => product.id == id);
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: "",
      title: "",
      description: "",
      price: "",
      mainCategory: "",
      subCategory: "",
    },
  });
  useEffect(() => {
    if (product) {
      reset({
        image: product.image,
        title: product.title,
        description: product.description,
        price: product.price,
        mainCategory: product.mainCategory,
        subCategory: product.subCategory,
      });
      setmainCategory(product.mainCategory); // enable subcategory dropdown
    }
  }, [product, reset]);
  const navigate = useNavigate();
  const UpdateProductHandler = (product) => {
    dispatch(asyncUpdateProduct(product, id));
    navigate("/");
  };
  const DeleteProductHandler = () => {
    dispatch(asyncDeleteProduct(id));
    navigate("/");
  };
  return product ? (
    <>
      <div className="flex flex-col items-center gap-10 p-4 sm:p-6 md:p-10 bg-gray-200 rounded-lg min-h-screen">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:items-start gap-10 p-6 md:p-10">
          <img
            className="w-full sm:w-2/3 md:w-1/2 lg-w-[40%] p-5 h-auto border-gray-300 border-2  object-contain rounded-xl shadow-md"
            src={product.image}
            alt={product.title}
          />
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left gap-4 p-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              ₹{product.price}
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed ">
              {product.description}
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-500 ">
              Category:{" "}
              <span className="font-semibold text-gray-700">{product.mainCategory}</span> ,{" "}
              <span className="font-semibold text-gray-700">{product.subCategory}</span>
            </p>

            <Link
              to="/cart"
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-base sm:text-lg mt-6 py-2 px-5 rounded-lg shadow-md w-fit mx-auto md:mx-0"
              onClick={()=>AddToCartHandler(product)}
            >
              Add to Cart
            </Link>
          </div>
        </div>
        {/*  Update Product */}
        {users && users.isAdmin && (
          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="flex flex-col gap-5 w-full bg-white  shadow-xl rounded-2xl p-6 max-w-2xl "
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 cursor-pointer">
                Update & Delete Product
              </h1>
            </div>
            <input
              type="url"
              className="outline-none px-4 py-3 rounded-lg text-sm sm:text-base md:text-lg focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
              placeholder="Enter image..."
              {...register("image")}
            />
            <input
              className="outline-none px-4 py-3 rounded-lg text-sm sm:text-base md:text-lg focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
              type="text"
              placeholder="Enter title..."
              {...register("title")}
            />
            <input
              type="number"
              className="outline-none px-4 py-3 rounded-lg text-sm sm:text-base md:text-lg focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
              placeholder="Enter price..."
              {...register("price")}
            />
            <textarea
              className="outline-none px-4 py-3 rounded-lg text-sm sm:text-base md:text-lg focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
              placeholder="Enter description..."
              {...register("description")}
            ></textarea>

            {/* main category */}
            <select
              className="outline-none px-4 py-3 rounded-lg text-sm sm:text-base md:text-lg focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
              {...register("mainCategory")}
              onChange={(e) => {
                setmainCategory(e.target.value);
                setValue("subCategory", "");
              }}
            >
              <option value="">Select Main Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* sub category */}

            <select
              className="outline-none px-4 py-3 rounded-lg text-sm sm:text-base md:text-lg focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 w-full"
              {...register("subCategory")}
              disabled={!mainCategory}
            >
              <option value="">Select Sub Category</option>

              {mainCategory &&
                categories[mainCategory].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
            <div className="flex gap-5">
              <button className="text-white w-full bg-blue-600 px-4 py-3 hover:bg-blue-700 text-base sm:text-lg rounded-lg shadow-md transition-all">
                Update Product
              </button>
              <button
                onClick={DeleteProductHandler}
                className="text-white w-full bg-red-600 px-4 py-3 hover:bg-red-700 text-base sm:text-lg rounded-lg shadow-md transition-all"
              >
                Delete Product
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-96 text-xl font-semibold">
      "Loading..."
    </div>
  );
};

export default ProductDetail;
