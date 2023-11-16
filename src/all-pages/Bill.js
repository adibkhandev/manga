import React,{useState,useContext,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Navigation from './Navigation-ash'
import {Link,useNavigate} from "react-router-dom"
import {Nav} from './Nav'
import {Taka} from "./Components"
import Counter from './Counter'
import Context from './Context'
import axios from 'axios'
const Bill = () => {
    useEffect(() => {
    	if(!data){
    		navigate('/')
    	}
    }, )
	let list = [0,1,2,3]
	let [total,setTotal]=useState(0)
	let data = useSelector((state)=> state.cartState.data)
	let url =  process.env.REACT_APP_BACKEND_URL+ '/orderplace/'
	let url2 =  process.env.REACT_APP_BACKEND_URL
	let context = useContext(Context)
	let bill = context.biller
	console.log("bill",data)
	let id = context.userdata.id || null
	let products = data.map((items)=>{
		return {
			"id":items.product.id,
			"count":items.count,
		}
	})
	console.log(products)
	let [billed,setBilled]=useState(false)
	let navigate = useNavigate()
	return (
		<>
		<div className={billed?"total-bill center":"total-bill"}>
			
		<div   className={billed?"int-bill off":"int-bill"  }>
		        	<Nav colour={"ash"} visible={true} stick={false} ></Nav>
		<div className="bill-page" >
		 
		 <div onClick={()=>setBilled(false)} className="content">
			 <div className="bill">
				<div className="items">
					{data.map((dataItems,i)=>{

						return(
                              <div className="item">
                              	<div className="image">
                              	 <img src={`${url2}${dataItems.product.image}`} alt=""/>
                              	</div>
                              	<div className="title">
                              		<h1>{dataItems.product.name}</h1>
                              	</div>
                              	<div className="trio">
                              		<Taka num={"minier"} taka={dataItems.product.price} ></Taka>
                              		<Counter movable={true} id={i} count={dataItems.count} ></Counter>
                              		
                              		<Taka num={"minier"} taka={dataItems.product.price*dataItems.count} ></Taka>
                              	</div>
                              </div>
						)
					})}
				</div>
				<div className="net">
					<h1 className="net-header" >Net total  :</h1>
					<Taka  num={"zero"} taka={bill} ></Taka>
				</div>
			</div>
			<div className="details">
				<div className="adressed">
					<h1 className="ship-1">Shipping Adress :</h1>
					<h1 className="ship-2">4,road 8,banasree,rampura,dhaka</h1>
				</div>
				<div className="delivery-time">
					<h1 className="time-1">
						Estimated delivery time :
					</h1>
					<h1 className="time-2">
						4D-5D
					</h1>
				</div>
				<div className="cont">
					<div className="bill-sec">
						<div className="heading">
							<h1>
								Bill
							</h1>
						</div>
						<div className="titles">
							  <div className="title">
							  <div className="joined">
							 	<h1 className="header">
							    	Subtotal
							     </h1>
						         <h1 className="colon">
								  : 
							     </h1>
							  	
							     </div>
                                  <Taka num={"mini"} taka={bill} ></Taka>							  
                                 </div>

							   <div className="title">
							   <div className="joined">
								 <h1 className="header">
							    	Delivery fee
							     </h1>
						         <h1 className="colon">
								  :
							     </h1>
							   	
							    </div>
							    <Taka num={"mini"} taka={"50"} ></Taka>
							  </div>
							   <div className="title">
							   <div className="joined">
								 <h1 className="header">
							    	Vat
							     </h1>
						         <h1 className="colon">
								  :
							     </h1>
							   	
							    </div>
							    <Taka num={"mini"} taka={bill*0.15} ></Taka>
							  </div>
							   <div className="title">
							   <div className="joined">
								 <h1 className="header">
							    	Total
							     </h1>
						         <h1 className="colon">
								  :
							     </h1>
							   	
							    </div>
							    <Taka num={"mini"} taka={bill+(bill*0.15)+50} ></Taka>
							  </div>
						</div>
					</div>
					{/*<div className="payment-method">
						<h1 className="heading">
							Payment method
						</h1>
						<div className="radios">
						 <div className="radio">
							<input type="radio" id="Cash" className="radio"/>
							<label for="Cash">Cash on delivery</label>
						 </div>
						 <div className="radio">
							<input type="radio" id="Credit" className="radio"/>
							<label for="Credit">Credit Card</label>
						 </div>
						 <div className="radio">
							<input type="radio" id="Bkash" className="radio"/>
							<label for="Bkash">Bkash Send Money</label>
						 </div>	
						</div>
					</div>*/}
				</div>
			</div>
		 </div>
		 <button onClick={()=>{
		 	console.log({'userid':id,'products':products})
		 	if(id){
		    products.map((product)=>{
		    	console.log(product)
		    	return(
                  axios.post(url,{'userid':id,'products':product})
		           .then((response)=>{
		           	   console.log('done')
		 	           setBilled(true)
		           })
		           .catch((err)=>{
                       console.log(err)
		           })      
		    	  )
		    })

		    }
		    else{
		    	console.log('unauthorized')
		    }
		    }
		    }
		    className="checkout-btn"
		    >
		 	Confirm Order
		 </button>
		 
		</div>
			
		</div>

		<div className={billed?"ext-bill":"poof"}>
			<img src="manga/images/order-cover.jpg" alt=""/>
			<div className="parts-ext">
				<h1>Your order has been placed .</h1>
			<div className="buttonS">
			<button id="btn-explore" >
				Explore more
			</button>
			<Link to="/order" >
			<button id="btn-order">
				Order list
			</button>
				
			</Link>
				
			</div>
			</div>
				
			
		</div>
		</div>
		</>
	)
}

export default Bill


