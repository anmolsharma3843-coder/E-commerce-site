import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store/index.js";

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

import AdminRoute from "./context/AdminRoute.jsx";
import UserRoute from "./context/UserRoute.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

//lazy loading pages

const App = lazy(() => import("./App.jsx"));

const Home = lazy(() => import("./Pages/Homepage/Home.jsx") );

const Cart = lazy(() => import("./Pages/Cart/Cart.jsx") );

const Emptycart = lazy(() => import("./Pages/Cart/Emptycart.jsx") );

const ItemDetails = lazy(() => import("./Pages/ItemDetails.jsx") );
const Login = lazy(() => import("./Pages/Auth/Login.jsx") );
const SignUp = lazy(() => import("./Pages/Auth/Signup.jsx") );

const Wishlist = lazy(() => import("./Pages/Wishlist.jsx") );
const MyOrders = lazy(() => import("./Pages/MyOrders.jsx") );
const CategoryItems = lazy(() => import("./Pages/CategoryItems.jsx") );
const Shop = lazy(() => import("./Pages/Shop.jsx") );

const CheckoutFlow = lazy(() => import("./Payment/CheckoutFlow.jsx") );

//Admin pages

const Dashboard = lazy(() => import("./Admin/Dashboard.jsx") );

const Adminpanel = lazy(() => import("./Admin/Adminpanel.jsx") );
const AddProduct = lazy(() => import("./Admin/AddProduct.jsx") );

const ManageProducts = lazy(() => import("./Admin/ManageProducts.jsx") );

const Orders = lazy(() => import("./Admin/Orders.jsx") );
const EditProduct = lazy(() => import("./Admin/EditProduct.jsx") );
const Users = lazy(() => import("./Admin/Users.jsx") );

//Routers

const router = createBrowserRouter([
  {
  path: "/",
  element: <App />,
  children: [
    {
      index: true,
      element: <Home />,
    },

    {
      path: "product/:id",
      element: <ItemDetails />,
    },

    {
      path: "category/:category",
      element: <CategoryItems />,
    },

    {
      path: "shop",
      element: <Shop />,
    },

    // Protected routes
    {
      path: "wishlist",
      element: (
        <UserRoute>
          <Wishlist />
        </UserRoute>
      ),
    },

    {
      path: "orders",
      element: (
        <UserRoute>
          <MyOrders />
        </UserRoute>
      ),
    },
  ],
},
  {
    path: "/cart",

    element: (
      <UserRoute>
        <Cart />
      </UserRoute>
    ),
  },

  {
    path: "/Emptycart",

    element: (
      <UserRoute>
        <Emptycart />
      </UserRoute>
    ),
  },

  {
    path: "/payment",

    element: (
      <UserRoute>
        <CheckoutFlow />
      </UserRoute>
    ),
  },

  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/Signin",
    element: <SignUp />,
  },

  {
    path: "/admin",

    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),

    children: [
      {
        index: true,
        element: <Adminpanel />,
      },

      {
        path: "add-product",
        element: <AddProduct />,
      },

      {
        path: "products",
        element: <ManageProducts />,
      },

      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "editproducts/:id",
        element: <EditProduct />,
      },

      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-xl font-semibold">
           <LoadingSpinner/>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        limit={2}
        theme="colored"
        toastClassName="rounded-xl shadow-lg text-sm font-medium"
        bodyClassName="px-3 py-2"
      />
    </Provider>
  </StrictMode>
);