import { useContext } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/All/Home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import Profile from './pages/User/Profile';
import Header from './components/User/Header';
import Products from './pages/User/Products';
import AddProduct from './pages/Admin/AddProducts';
import ProductDetail from './pages/User/ProductDetail';
import Cart from './pages/User/Cart';
import Order from './pages/User/Order';
import Wishlist from './pages/User/Wishlist';
import SubHeader from './components/User/SubHeader';
import TrackingOrder from './pages/User/TrackingOrder';
import { AuthContext } from './context/AuthContext';
import UserLayout from './components/Layout/UserLayout';
import Loader from './components/Home/Loading';
import AllProducts from './pages/Admin/AllProducts';
import AdminLayout from './components/Layout/AdminLayout';
import ProductDetails from './pages/Admin/ProductDetails';
import AllUsers from './pages/Admin/AllUsers';
import UserDetail from './pages/Admin/UserDetail';
import Dashboard from './pages/Admin/Dashboard';
import AllOrders from './pages/Admin/AllOrders';
import OrderDetail from './pages/Admin/OrderDetail';
import MyProfile from './pages/Admin/MyProfile';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/' element={<Navigate to='/login' />} />
          </>
        )}

        {user && user.role === "user" && user.accountStatus === "approved" ? (
          <Route path='/user' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<ProductDetail />} />
            <Route path='cart' element={<Cart />} />
            <Route path='order' element={<Order />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='trackorder' element={<TrackingOrder />} />
          </Route>
        ) : (
          <Route path='/user/*' element={<Navigate to="/login" />} />
        )}

        {user && user.role === "admin" ?
          (
            <Route path='/admin' element={<AdminLayout />}>
              <Route path='addproducts' element={<AddProduct />} />
              <Route path='allproducts' element={<AllProducts />} />
              <Route path='allproducts/:id' element={<ProductDetails />} />
              <Route path='allusers' element={<AllUsers />} />
              <Route path='addusers' element={<RegisterPage />} />
              <Route path='allusers/:id' element={<UserDetail />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='allorders' element={<AllOrders />} />
              <Route path='allorders/:id' element={<OrderDetail />} />
              <Route path='profile' element={<MyProfile />} />
            </Route>
          )
          :
          (
            <Route path='/admin/*' element={<Navigate to="/login" />} />
          )
        }
      </Routes>
    </BrowserRouter>
  );
}


export default App;
