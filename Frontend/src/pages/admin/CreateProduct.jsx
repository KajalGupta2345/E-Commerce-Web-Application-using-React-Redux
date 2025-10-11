import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productAction";
import { useState } from "react";
import { categories } from "./CategoriesData";

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mainCategory, setmainCategory] = useState("");
  const CreateProductHandler = (product) => {
    const newProduct = {
      ...product,
      id: nanoid(),
      category:{
        main:product.mainCategory,
        sub:product.subCategory
      }
    };
    console.log(newProduct);
    dispatch(asyncCreateProduct(product));
    navigate("/");
    reset();
  };
  return (
    <div className="flex p-10 gap-10 flex-col  md:flex-row w-full  min-h-screen justify-center items-center rounded bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1675020007254-eaa81f584161?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] p-6">
       {/* Left Side Info Section */}
      <div className="flex flex-col justify-center items-center md:w-1/2 sm:p-10 md:text-left w-full bg-black/60 p-10 rounded-2xl shadow-xl ">
        <h1 className="lg:text-5xl md:text-4xl text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
          Create & Showcase Your Products 🚀
        </h1>
        <p className="text-white md:text-lg sm:text-base text-sm mb-6">
          Easily add new products to our marketplace. Upload images, set prices,
          and categorize them to reach more people.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
          alt="Ecommerce Icon"
          className="lg:w-52 md:w-44 w-24 sm:w-32 mx-auto mt-6 drop-shadow-2xl mt-4"
        />
      </div>
      <form
        onSubmit={handleSubmit(CreateProductHandler)}
        className="flex flex-col gap-5 w-full md:w-1/2 bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10  "
      >
        <div>
          <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-center text-gray-800">
            Create Product
          </h1>
        </div>
        <input
          type="url"
          className="outline-none px-4 py-3  rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          placeholder="Enter image..."
          {...register("image")}
        />
        <input
          className="outline-none px-4 py-3  rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          type="text"
          placeholder="Enter title..."
          {...register("title")}
        />
        <input
          type="number"
          className="outline-none px-4 py-3  rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          placeholder="Enter price..."
          {...register("price")}
        />
        <textarea
          className="outline-none px-4 py-3  rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-900 bg-blue-50 focus:ring-blue-400 text-2xl w-full"
          placeholder="Enter description..."
          {...register("description")}
        ></textarea>

        {/* main category */}
        <select
          className="outline-none px-4 py-3 rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-500 bg-blue-50 focus:ring-blue-400  w-full"
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
          className="outline-none px-4 py-3 rounded-lg md:text-lg sm:text-base text-sm focus:ring-2 text-gray-500 bg-blue-50 focus:ring-blue-400 w-full"
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

        <button className="cursor-pointer text-white w-full bg-blue-600 px-4 py-3 hover:bg-blue-700 md:text-lg sm:text-base text-sm rounded-lg shadow-md tansition-all">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
