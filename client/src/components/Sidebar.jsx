import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaBox,
  FaFileInvoice,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../services/AuthApiService";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.auth.user);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      localStorage.removeItem("theme");

      if (response.ok) {
        dispatch(logout());
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaHome />,
    },
    {
      name: "Add",
      path: "/admin/add-product",
      icon: <FaPlus />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FaBox />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaFileInvoice />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
        hidden lg:flex
        w-72
        h-screen
        sticky top-0
        flex-col
        justify-between
        bg-white dark:bg-gray-900
        border-r
        border-gray-200
        dark:border-gray-800
      "
      >
        <div>
          {/* User */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.username?.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {user?.username}
              </h3>

              <p className="text-sm text-gray-500">
                Administrator
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">
            {menu.map((item) => {
              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="
            flex items-center gap-3
            w-full
            px-4 py-3
            rounded-xl
            bg-red-100
            text-red-600
            dark:bg-red-900/20
            dark:text-red-400
            hover:bg-red-500
            hover:text-white
            transition
          "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div
        className="
        lg:hidden
        fixed bottom-0 left-0 right-0
        z-50
        bg-white dark:bg-gray-900
        border-t
        border-gray-200 dark:border-gray-800
        shadow-lg
      "
      >
        <div className="grid grid-cols-6">
          {menu.map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                flex flex-col items-center justify-center
                py-3
                text-xs
                ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-500 dark:text-gray-400"
                }
              `}
              >
                <span className="text-lg mb-1">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
          <button
  onClick={handleLogout}
  className="
    flex flex-col
    items-center
    justify-center
    py-3
    text-xs
    text-red-500
  "
>
  <FaSignOutAlt className="text-lg mb-1" />
  <span>Logout</span>
  </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;