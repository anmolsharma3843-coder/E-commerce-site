import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/index.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Cart from './Pages/Cart/Cart.jsx';
import ItemDetails from './Pages/ItemDetails.jsx';
import Emptycart from './Pages/Cart/Emptycart.jsx'
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Auth/Login.jsx'
import SignUp from './Pages/Auth/Signup.jsx';
import Protected from './context/Protect.jsx';
import AdminRoute from './context/AdminRoute.jsx';
import Dashboard from './Admin/Dashboard.jsx';
import AddProduct from './Admin/AddProduct.jsx';
import ManageProducts from './Admin/ManageProducts.jsx';
import Orders from './Admin/Orders.jsx';
import PaymentPage from './Payment/PaymentPage.jsx';
import CheckoutFlow from './Payment/CheckoutFlow.jsx';
import Adminpanel from './Admin/Adminpanel.jsx';
import EditProduct from './Admin/EditProduct.jsx';
import Users from './Admin/Users.jsx';
import UserRoute from './context/UserRoute.jsx';
import UserOrder from './Pages/MyOrders.jsx'
import CategoryItems from './Pages/CategoryItems.jsx';
import Home from './Pages/Homepage/Home.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import MyOrders from './Pages/MyOrders.jsx';
import Shop from './Pages/shop.jsx';
const router = createBrowserRouter(
  [
    {
      path: "/", element: <UserRoute><App /></UserRoute>, children: [
        {
          path: "/", element: <Home/>
        },
        {
          path: "/product/:id",
          element: <ItemDetails />
        },
        {
      path:"/category/:category", element:<CategoryItems/>
    },
     {
      path:"/wishlist", element:<Wishlist/>
    },
     {
      path:"/orders", element:<MyOrders/>
    },
    {path:"/shop" ,element:<Shop />}

      ]
    },
    {
  path: "/cart",
  element: <UserRoute><Cart /></UserRoute>
},
{
  path: "/Emptycart",
  element: <UserRoute><Emptycart /></UserRoute>
},
{
  path: "/payment",
  element: <UserRoute><CheckoutFlow /></UserRoute>
},

    {
      path: "/Login",
      element: <Login />
    },
    {
      path: "/Signin",
      element: <SignUp />
    },
    {
  path: "/admin",
  element: <AdminRoute><Dashboard /></AdminRoute>,
  children: [
    { index: true, element: <Adminpanel /> },

    { path: "add-product", element: <AddProduct /> },
    { path: "products", element: <ManageProducts /> },
    { path: "orders", element: <Orders /> },
    { path: "editproducts/:id", element: <EditProduct /> },
    { path: "users", element: <Users /> }
  ]
}
  
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
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
  </StrictMode>,
)
