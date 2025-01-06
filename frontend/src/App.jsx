import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Email from './Components/Email/Email';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Nav from './Components/Nav/Nav';
import Seller from './Components/Seller/Seller';
import EditSeller from './Components/EditSeller/EditSeller';
import AddProduct from './Components/AddProduct/AddProduct';
import UserD from './Components/UserD/UserD';
import CatProd from './Components/CatProd/CatProd';
import EditProduct from './Components/EditProduct/EditProduct';
import Product from './Components/Product/Product';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Orders from './Components/Orders/Orders';
import MyOrders from './Components/MyOrders/MyOrders'
import Final from './Components/Final/Final';

function App() {
  const [user,setUser]=useState(" ")
  const [login,setLogin]=useState(" ")

  return (
    <>
      <BrowserRouter>
      {user && <Nav user={user} login={login}></Nav>}
      <Routes>
      <Route path="/" element={<Home setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/email" Component={Email}></Route>
        <Route path="/final" Component={Final}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/product/:id" element={<Product setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/orders/:id" element={<Orders setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/myorders"  element={<MyOrders setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/cart" element={<Cart setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/catprod/:category" element={<CatProd setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/editproduct/:id" element={<EditProduct setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path="/userd" element={<UserD setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path='/seller' element={<Seller setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path='/editseller' element={<EditSeller setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path='/addproduct' element={<AddProduct setUser={setUser} setLogin={setLogin}/> }></Route>
        <Route path='/wishlist' element={<Wishlist setUser={setUser} setLogin={setLogin}/> }></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
