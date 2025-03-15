import './App.css'
import { css } from '@emotion/react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { Navigate, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div css={css({
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      overflow: "none"
    })}>
      <Routes>
				<Route path='/' element={<Login/>} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
			</Routes>
    </div>
  )
}

export default App
