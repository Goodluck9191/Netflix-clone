import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'

const App = () => {

  const navigate = useNavigate();

  useEffect(() =>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in: ", user);
        navigate('/');
      } else {
        console.log("No user is signed in.");
        navigate('/Login');
      }

  })
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
 
    </div>
  )
}

export default App
