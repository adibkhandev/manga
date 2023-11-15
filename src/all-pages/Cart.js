import React,{useState,useEffect,useContext,useCallback} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Navigation from './Navigation-ash' 
import Context from './Context'
import {Nav} from './Nav'
import {Taka} from "./Components"
import Counter from './Counter'
import {Link} from "react-router-dom"
const Cart = () => {
	
	// let [biller,setBiller]=useState(0)
	let [amount,setAmount]=useState(0)
     let [hover,setHover]=useState(0)
	let data = useSelector((state)=> state.cartState.data)
     let notifications = useSelector((state)=>state.notifyState.notifications)
     let dispatch = useDispatch()
    useEffect(() => {
    	// window.location.reload(false)
    	if(notifications.cart>0){
            dispatch({type:"NULLIFY-CART"})
    		
    	}
    }, [notifications])
	useEffect(() => {
		if(data){
			let total = data.map((item)=>{
				return(
                   item.product.price*item.count
				)
			})
			let sum = total.reduce((accumulator,currentValue)=> accumulator+currentValue,0)
		     setAmount(sum)
		     setBiller(sum)
		}
	}, [data])
	console.log(amount,'amm')
	let context = useContext(Context)
	let biller = context.biller
	let setBiller = context.setBiller
	let dispatcher = () => {
		dispatch({type:"ADD"})
	}
	

	console.log('hello')
	console.log(data)
	console.log('unique')
	let list = [0,1,2]
	return (
		
			<div className="cart-page">
			<Nav colour={"ash"} visible={true} stick={false} ></Nav>
			<div className="cart">
				<div className="desc">
					<div className="cover">
						<h1 >Cover</h1>
					</div>
					<div className="Product">
						<h1 >Product</h1>
					</div>
					<div className="triplet">
						<h1 className="trips">Price</h1>
						<h1 className="trips">Quantity</h1>
						<h1 className="trips">Subtotal</h1>
					</div>
				</div>
				<div className="items">
					{data?data.map((items,i)=>{
						console.log("fuck",items.id)
						
						{/*setBill(itemscost)*/}
						
						return(
                              <Item  i={i} biller={biller} setBiller={setBiller}  items={items} ></Item>
						)
					}):"hi"}
				</div>
				<div className="net">
					<h1 className="net-header" >Net total  :</h1>
					<Taka  num={"zero"} taka={amount} ></Taka>
				</div>
				   <Link to="/bill">
				<button className="buy-but">
				   	Buy
					
				</button>
				   </Link>
               
			</div>
		</div>
		
		
		
		
	)
}
let Item = ({items,biller,setBiller,i})=>{
	let url2 =  process.env.REACT_APP_BACKEND_URL
	let [subtotal,setSubtotal] = useState(0)
	let [last,setLast]= useState(0)
    let dispatch = useDispatch()

	useEffect(() => {
    
            if(subtotal>0){
        	setLast(subtotal)

            }
        	
        	setSubtotal(items.product.price*items.count)
        	console.log(last,subtotal)
        
	}, [items.count,subtotal])


	return(
     <div className="item">
           <div className="image">
            <img src={`${url2}${items.product.image}`} alt=""/>
           </div>
           <div className="title">
           	<h1>{items.product.name}</h1>
           </div>
          	<div className="trio">
          		<Taka num={"one"} taka={items.product.price} ></Taka>
          		<Counter id={i} count={items.count} ></Counter>
          		
          		<Taka num={"one"} taka={subtotal} ></Taka>
          	</div>
          	<div  className="remover">
          		<div onClick={()=>{
                      setBiller(biller-subtotal)
          		  dispatch({type:'DELETE',payload:items})
          		}
          	} className="btn">
          			<img src="images/close.png" alt=""/>
          		</div>
          	</div>
          </div>
	)
}

export default Cart