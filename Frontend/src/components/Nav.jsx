import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);
  const [isopen, setIsopen] = useState(false);

  const toggleMenu = () => setIsopen(!isopen);

  return (
    <nav className=" bg-gray-100 relative rounded text-gray-600 px-7 py-5 flex font-bold justify-between items-center shadow-md  text-2xl">
     <div className="flex flex-col">
       <img
        width="35"
        height="35"
        src="https://img.icons8.com/color/48/opencart.png"
        alt="opencart"
        className="sm:w-10 sm:h-10 md:w-14 md:h-14"
      />
      <span className="text-sm text-yellow-400">ShopNexa</span>
     </div>
      <button onClick={toggleMenu} className="md:hidden text-blue-500 z-20">
        {isopen ? <X size={28} /> : <Menu size={28} />}
      </button>
      
      {/* Desktop menu */}
      <div className="hidden md:flex gap-10 items-center text-xl">
        <NavLink className={(e) => (e.isActive ? "text-blue-500" : "")} to="/">
          Home
        </NavLink>

        {user ? (
          <>
            {user && user.isAdmin && (
              <NavLink
                to="/admin/create-product"
                className={(e) => (e.isActive ? "text-blue-500" : "")}
              >
                Create Product
              </NavLink>
            )}
            <NavLink
              to="/admin/user-profile"
              className={(e) => (e.isActive ? "text-blue-500" : "")}
            >
              Settings
            </NavLink>
            <NavLink
              to="/cart"
              className={(e) => (e.isActive ? "text-blue-500" : "")}
            >
              Cart
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={(e) => (e.isActive ? "text-blue-500" : "")}
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile menu */}

      <div className={`${isopen?"flex":"hidden"} md:hidden absolute top-full left-0 text-sm w-full bg-gray-100 flex-col items-start p-6 gap-2 transition-all duration-300 `}>
        <NavLink className={(e) => (e.isActive ? "text-blue-500" : "")} to="/">
          Home
        </NavLink>

        {user ? (
          <>
            {user && user.isAdmin && (
              <NavLink
                to="/admin/create-product"
                className={(e) => (e.isActive ? "text-blue-500" : "")}
              >
                Create Product
              </NavLink>
            )}
            <NavLink
              to="/admin/user-profile"
              className={(e) => (e.isActive ? "text-blue-500" : "")}
            >
              Settings
            </NavLink>
            <NavLink
              to="/cart"
              className={(e) => (e.isActive ? "text-blue-500" : "")}
            >
              Cart
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={(e) => (e.isActive ? "text-blue-500" : "")}
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
