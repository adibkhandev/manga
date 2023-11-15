import React from 'react'
import {Link} from "react-router-dom"
const Navigation = (props) => {
  return (
    <>
    <div className={props.binary===0?"ashnav":"ashnav-active"}>
     <div className="logo">
         <Link to="/">
           <img src={`images/rhino-logo-${props.colour}.png`} alt="" className="logoimage"/>
         </Link>
        
     </div>
     <div className={`textnav-${props.colour}`}>
        <h1 className="nav-but">About</h1>
        <Link to="/categories" >
          <h1 className="nav-but">Categories</h1>
        </Link>
        
        <h1 className="nav-but">Explore</h1>
      
     </div>
    
     <div className="sidenav">
       <div id="icon-1" className="imgs">
        <Link to="/login">
        <img  src={`images/account-${props.colour}.png`} alt="" className="icons"/>
        </Link>
       </div>
       <div className="imgs">
        <img src={`images/love-${props.colour}.png`} alt="" className="icons"/>
       </div>
       <div className="imgs">
         <Link to="/cart">
           <img src={`images/shopping-bag-${props.colour}.png`} alt="" className="icons"/>
         </Link>
      </div>    
     </div>
    </div>

    
      
    </>
  )
}

export default Navigation