import React,{useState,useEffect,useContext} from 'react'

import {Nav} from './Nav'
import Ordercomp from './Ordercomp'
import axios from 'axios'
import {Taka} from "./Components"
import Counter from './Counter'
import Context from './Context'
const Order = () => {
let url =  process.env.REACT_APP_BACKEND_URL + '/ordered/'
// let url = 'http://127.0.0.1:8000/ordered/'
let context = useContext(Context)
console.log(context.user.user_id)
let userid = context.user? context.user.user_id : false
let [orderedData,setOrderedData] = useState()
useEffect(() => {
     if(userid){
     axios.post(url,{"userid":userid})
       .then((response)=>{
          console.log(response.data,'res')
          let itemArray = response.data.ordered.slice().reverse().map((data)=>{
               return(
                  data
               )
          })
          setOrderedData(response.data.ordered.slice().reverse())
          console.log(orderedData,'orderrr')
       })
       .catch((err)=>{
          console.log(err)
       })
    }
     else{
          console.log('unauthorized')
     }
}, [])

       let active = true
       console.log('t')
	return (
		<>
           <div className="order-page">
            <Nav colour={"ash"} visible={true} stick={false} ></Nav>
           	 <div className="orders">

           	 	{orderedData?orderedData.map((orders,i)=>{
                        return(
                           <Ordercomp className='order-cont-comp' data={orders} ></Ordercomp>
                         )             
                    }  
           	)
               : <h1>hi</h1>
               }
           	 </div>
           </div>
		</>
	)
}

export default Order