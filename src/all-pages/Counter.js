import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
const Counter = ({id,count,movable}) => {
	console.log("id",id)
    let dispatch = useDispatch()
	return (
		<div className="counter-cont" >
			{!movable?(
               <img onClick={() =>  {
                console.log("clicked")  
				dispatch({type:"UPDATE-" , id:id})
                      
				
				} 
			 }
			 src="images/arrow-icon.png" alt="" className="left-arrow"
			 />
			 ):''}
			   

			   <div className="header-cont">
			     <h1 className="count" >
			     	{count || 0}
			     </h1> 
			   </div>
			

			{!movable?(
               <img onClick={() =>  {
                console.log("clicked")  
				dispatch({type:"UPDATE+" , id:id})
                      
				
				} 
			 } 
			 src="images/arrow-icon.png" alt="" className="right-arrow"/>
			):''}
		</div>
	)
}

export default Counter