import React , {useState} from 'react'
import {useDispatch} from 'react-redux'
import Star from './Stars'
import {Link} from "react-router-dom"
import Like from "./Like"
export let Filter =({start,setStart,limit,setLimit})=>{
   return(
   <>
   <div className="filter-widget">
     <div className="filter-inputs">
        <input onChange={(e)=>{
         // console.log(start)
               if(e.target.value<limit){
                  setStart(e.target.value)
               }
               else{
                  setStart(0)
               }
               }} placeholder={start} type="text" className="filter-inp"/>
        <input onChange={(e)=>{
         // console.log(limit)
              
                  setLimit(e.target.value)
            }}
               placeholder={limit} type="text" className="filter-inp"/>
     </div>
     <div className="desc">
          <h1>
             Price Range
          </h1>
     </div>
   </div>  

   </>
   )
}

export let Taka =(props)=>{
   // console.log(props.white)
   return(
           <div className={"taka"+" " +props.num}>
             <img src={props.white?"images/taka-white.png":"images/taka.png"} alt="" className="tkimg"/>
             <h1 className="tknum" >{props.taka}</h1>
           </div>
   )
}
export let Stars2 =(props)=>{
   return(
           <div className="stars">
            <img src="images/star-brown-filled.svg" alt="" className="star"/>
            <img src="images/star-brown-filled.svg" alt="" className="star"/>
            <img src="images/star-brown-filled.svg" alt="" className="star"/>
            <img src="images/star-brown.svg" alt="" className="star"/>
            <img src="images/star-brown.svg" alt="" className="star"/>
           </div>
   )


}

export let Stars =({setStar})=>{
   let [stars,setStars]=useState(0)
   
   return(
           <div onChange={setStar(stars)} className="stars">
            <img onClick={()=>setStars(1)} src={stars>0?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img onClick={()=>setStars(2)} src={stars>1?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img onClick={()=>setStars(3)} src={stars>2?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img onClick={()=>setStars(4)} src={stars>3?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img onClick={()=>setStars(5)} src={stars>4?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            
           </div>
   )


}
export let FixedStars =({star})=>{
   let [stars,setStars]=useState(()=>{
      if(star){
         return star
      }
      else{
         return 0
      }
   })
   
   return(
           <div  className="stars">
            <img  src={stars>0?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img  src={stars>1?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img  src={stars>2?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img src={stars>3?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            <img  src={stars>4?"images/star-brown-filled.svg":"images/star-brown.svg"} alt="" className="star"/>
            
           </div>
   )


}

export let NotFound = () =>{
   return(
      <div className="container">
         <img src="images/cat.png" alt=""/>
         {/*<h1>Cat found nothing by that name</h1>*/}
      </div>
   )
}

export let Item = (props)=>{
   let [liked,setLiked]=useState(()=>{
       if(props.liked){
         return true
       }
       else{
         return false
       }
    })
   let data = props.data
   // let url = 'http://127.0.0.1:8000'
   let url =  process.env.REACT_APP_BACKEND_URL
   let dispatch = useDispatch()
   return(
           <div className="item-cont" >
            <div className="item">
               <div className="image">
                  <img src={`${url}${props.data.image}`} alt=""/>
               </div>
               <div className="title">
                  <h1>{props.data.name}</h1>
               </div>
                             
               <Taka num={"one"} taka={props.data.price} ></Taka>
                <Like product={props.data} id={props.data.id} ></Like>
                                    
               
             </div>
 
             <div className="hoverer" >               
               <div className="cont">
                  <Link to='/cart'>
                   <div onClick={() => {
                   dispatch({type: 'ADD' , payload:data ,count:1}) 
                   dispatch({type:'ADD-CART'})
                   }}

                   className="content">
                  <h1  >Add to Cart</h1>
                  <div className="imgs">
                     <img className="cart-icon" src="images/grocery-cart.png" alt=""/>
                     <img className="plus" src="images/plus.svg" alt=""/>
                  </div>
                   </div>
                     
                  </Link>
                  
                     
                   <div className="purple-line">
                     
                   </div>
               </div>
             </div>

                              
          </div>
   )
}
