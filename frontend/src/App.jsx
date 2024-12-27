import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Email from './Components/Email/Email';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Nav from './Components/Nav/Nav'  

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
        <Route path="/login" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
