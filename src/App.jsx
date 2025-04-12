import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/All/Home'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import Profile from './pages/User/Profile'
import Header from './components/User/Header'
import Products from './pages/User/Products'
import AddProduct from './pages/Admin/AddProducts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products />} />
        <Route path='/addproducts' element={<AddProduct />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
