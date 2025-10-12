import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetail = lazy(() => import("../pages/admin/ProductDetail"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const Cart = lazy(() => import("../pages/Cart"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
import AuthWrapper from "./AuthWrapper";
import UnauthWrapper from "./UnauthWrapper";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MainRoutes = () => {
  const user = useSelector((state) => state.userReducer.users);
  return (
    <Routes>
      <Route path="/" element={<Products />} />


      <Route
        path="/login"
        element={
          <UnauthWrapper>
            <Login />
          </UnauthWrapper>
        }
      />

      <Route
        path="/register"
        element={
          <UnauthWrapper>
            <Register />
          </UnauthWrapper>
        }
      />

      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />

      <Route
        path="/products/:id"
        element={
          <AuthWrapper>
            <ProductDetail />
          </AuthWrapper>
        }
      />
      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />

      <Route
        path="/forgot/password"
        element={
          // <AuthWrapper>
            <ForgotPassword />
          // </AuthWrapper>
        }
      />
      <Route
        path="/reset/password"
        element={
          // <AuthWrapper>
            <ResetPassword />
          // </AuthWrapper>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
