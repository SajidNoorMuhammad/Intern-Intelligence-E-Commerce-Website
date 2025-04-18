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

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {user && user.role === "user" ? (
          <Route path='/user' element={<UserLayout />}>
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

        <Route path='/addproducts' element={<AddProduct />} />
        <Route path='/allproducts' element={<AllProducts />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
