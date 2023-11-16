import React,{useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Order from './all-pages/Order'
import GeoMap from './all-pages/GeoMap'
import Landing from './all-pages/Landing'
import RunningOut from './all-pages/RunningOut'
import MostPopular from './all-pages/MostPopular'
import Categories from './all-pages/Categories'
import Searched from './all-pages/Searched'
import Bottom from './all-pages/Bottom-nav'
import Post from './all-pages/Post'
import Navigation from './all-pages/Navigation-ash'
import Cart from './all-pages/Cart'
import Bill from './all-pages/Bill'
import Reviewer from './all-pages/Reviewer'
import Liked from './all-pages/Liked'
import LogReg from './all-pages/Log-reg'
import Nav from "./all-pages/Nav"
import Load from "./all-pages/Load"
import Account from "./all-pages/Account"
import {Taka} from "./all-pages/Components"
import Loader from './all-pages/Loader'
import {AuthProvider,Context} from './all-pages/Context'
import {BrowserRouter , Routes,Route,Link} from "react-router-dom"
const App = () => {
  let [loaded,setLoaded]=useState(false)
  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL,'nackend')
    let loading = setTimeout(()=>{
         setLoaded(true)
         console.log('done')
    },4200);

    return () => {
        clearTimeout(loading)  
    };
  }, [])
  return (
     <>
     <div style={!loaded?{overflow:'hidden'}:{overflow:'initial'}} className="frame">
        {!loaded?<Loader/>:''}
        <BrowserRouter basename={process.env.PUBLIC_URL} >
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} ></Route>
            <Route path="/categories" element={<Categories/>} ></Route>
            <Route path="/map" element={<GeoMap/>} ></Route>
            <Route path="/cart" element={<Cart/>} ></Route>
            <Route path="/post" element={<Post/>} ></Route>
            <Route path="/searched" element={<Searched />} ></Route>
            <Route path="/bill" element={<Bill/>} ></Route>
            <Route path="/reviewer" element={<Reviewer/>} ></Route>
            <Route path="/liked" element={<Liked/>} ></Route>
            <Route path="/login" element={<LogReg/>} ></Route>
            <Route path="/order" element={<Order/>} ></Route>
            <Route path="/account" element={<Account/>} ></Route>
          </Routes>  
          </AuthProvider>
        </BrowserRouter>     

     </div>
     </>
  )
}

export default App