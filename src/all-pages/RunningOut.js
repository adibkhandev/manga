import React,{useState,useEffect,useContext} from 'react'
import {Taka} from './Components'
import axios from 'axios'
import {Link} from "react-router-dom"


const RunningOut = () => {
  let url = process.env.REACT_APP_BACKEND_URL + 'news/'
  let image_url = process.env.REACT_APP_BACKEND_URL
  let [active,setActive]=useState(0)
  let [animate,setAnimate]=useState(0)
   let [deduct,setDeduct]=useState(0)
   let [products,setProducts]=useState([])
   useEffect(()=>{
       // console.log(active)
       // console.log(products.length )

   },[active])

   useEffect(() => {
       axios.get(url)
       .then((response)=>{
          // console.log(response.data,'yess')
          setProducts(response.data)
          // console.log(products[0],"att")
       })
       .catch((err)=>{
         // console.log(err)
       })
   }, [])




  let inactive = products.filter((inactiveProducts,index)=>{
    return index!==active
  })
  // console.log(animate)
  return (
    <>
        
     {products[active]?(
       <div className="page2">

      
              <div className={animate===1?"txts ghost-text":animate===2?"txts ghost-text human-text":"txts"}>
                <div className="headers">
                  <h1 className={"small"}>
                    {products[active].news_title}
                  </h1>
                  <h1 className={"big"}>
                    {products[active].news_header}
                  </h1>
                </div>
                <div className="pricers">
                     <h1 className={"title"}>{products[active].product.name}</h1>
                  <Taka taka={products[active].product.price} num={"one"} ></Taka>
                    <Link to="/post" state={products[active].product} >
                   <button>
                    Shop Now
                   </button>
                   </Link>

                </div>
              </div>

            
              <div      onAnimationEnd={()=>{
                           if(animate===1 ){
                            
                              if(active>0 ){
                                if(active+1<products.length){
                                 setActive(active+deduct)
                                 setAnimate(2)
                               }
                                 else{
                                  setActive(0)
                                  setAnimate(2)
                                 }

                              }
                              if(active===0){
                                if(deduct>0){
                                 setActive(active+deduct)
                                 setAnimate(2)
                                }
                                else{
                                  setActive(0)
                                  setAnimate(2)

                                }
                              }
                              

                            
                              
          
                              
                           
                            
                             
                         }
                         if(animate===2){
                          setAnimate(0)

                         }
                       
                       

              }}
                        className={animate===1?"images ghost":animate===2?"images ghost human":"images"}>
                      <div className="img-cont">
                        
                      <img  src={`${image_url}${products[active].product.image}`} alt=""/>
                      </div>

                       {inactive.map((inac)=>{
                        return(
                          <div className="img-cont">
                            
                            <img className="inactive-images" src={`${image_url}${inac.product.image}`} alt=""/>
                          </div>
                        )
                       })}
                      
                 
              </div>

            
              <div className="movers">
                <button onClick={()=>{
                        setAnimate(1)
                        setDeduct(-1)
                      }
                    } >
                  <img id="left" src="images/arrow-icon.png" alt=""/>
                </button>
                <button onClick={()=>{
                        setAnimate(1)
                        setDeduct(1)
                      }
                    } >
                  <img id="right" src="images/arrow-icon.png" alt=""/>
                </button>

              </div>
           


           </div>
     ):(
          <div className="hi">hi</div>

     )

     }
      
           
    
           
           </>

  


  )
}

export default RunningOut