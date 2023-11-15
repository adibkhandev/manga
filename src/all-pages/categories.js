import React,{useContext} from 'react'
import {Nav} from './Nav'
import Context from './Context'
import {Link} from "react-router-dom"
const Categories = () => {
	return (
        <div className="whole-page-cat">
        	<Nav colour={"ash"} visible={true} stick={false} ></Nav>
        	<Content></Content>
        </div>
	)
}
const Content =()=>{
	
let context = useContext(Context)
let setCategory = context.set_category
	return(
   <div className="content-cont">
      	
     <div className="top">
      <div className="aside">
      	<div className="first-row">
          
             
      	   <div onClick={()=>setCategory('anime_goods')} id="box-1" className="boxes">
              <Link to="/searched" >
             <img src="images/gojo.jpg" alt=""/>
              <h1>ANIME GOODS</h1>
             </Link>
           </div>	
           <div onClick={()=>setCategory('manga')} id="box-2" className="boxes">
           <Link to="/searched" >
            <img src="images/garo.jpg" alt=""/>
            <h1>MANGA</h1>
            </Link>
           </div>
      	</div>
      	   

           <div className="second-row">
           	<div onClick={()=>setCategory('novel')} id="box-3" className="boxes">
             <Link to="/searched" >
            <img src="images/asta.jpg" alt=""/>
            <h1>NOVEL</h1>
            </Link>
           </div>
           </div>

      </div>
      <div className="right-side">
      	<div onClick={()=>setCategory('lamps')} id="box-4" className="boxes">
              <Link to="/searched" >
             <img src="images/dabi.jpg" alt=""/>
             <h1>LAMPS</h1>
             </Link>
         </div>
      </div>
            
      </div>
        
        
        
        <div className="bottom">
        	<div onClick={()=>setCategory('accessories')}  id="box-5" className="boxes">
          <Link to="/searched" >
           <img src="images/kaneki.jpg" alt=""/>
           <h1>ACCESSORIES</h1>
          </Link>
          </div>
        <div onClick={()=>setCategory('action_figures')}  id="box-6" className="boxes">
          <Link to="/searched" >
         <img src="images/tanjiro.jpg" alt=""/>
         </Link>
         <h1>ACTION FIGURES</h1>
        </div>
        </div>
    </div>
      
	)
}

export default Categories