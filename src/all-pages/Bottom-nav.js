import React,{useState,useEffect} from 'react'

const Bottom = () => {
	let [num,setNum]=useState(0)
	let [margin,setMargin]=useState(0)
     console.log(margin)
     console.log(num)
	
	let navoption = [1,2,3,4,5,6,7,8,9,10]

	return (
		<div className="bottom-nav-cont">
		 <img onClick={()=>{
		 	if(margin>0){
		 	setMargin(margin-2.8)
		 }
		     else{
		     	setMargin(0)
		     }
		 }
		 } id="left" src="images/arrow-icon.png" alt="" className="arrow-icons"/>
		 <div className="cotainer">
		 	<div style={
		 		{
		 			marginLeft:-margin+"em",
		 			transitionDuration : "0.75s" ,
		 			transitionTimingFunction : 'ease-in-out'
		 }
		} className="num-nav">
		 	{navoption.map((navs,i)=>{
		 		return(
		 			
		 		<button className={num===i? 'btn-act' : 'btn'} onClick={()=>{
		 			 setNum(i)
		 			 
		 			 console.log(i)
                     
                 }
		 	         
		 	    }
		 	     key={i} >{navs}</button>
		 		)

		 	})}
		 </div>
		 </div>
		 
		 <img onClick={()=>{
		 	         if(margin<(navoption.length-8)*2.8){
		 	          setMargin(margin+2.8)
		 	          console.log('hi')
		 	          
                      }
                      else{
                      	setMargin(0)
                      	console.log('bye')
                      }
		 	         }} src="images/arrow-icon.png" alt="" className="arrow-icons"/>
			
		</div>
	)
}

export default Bottom