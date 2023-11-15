import React from 'react'
import {Taka} from "./Components"
import Counter from './Counter'


const Ordercomp = ({data}) => {
     let image_url =  process.env.REACT_APP_BACKEND_URL
     // let image_url = 'http://127.0.0.1:8000'
     console.log(data)
	return (
		<div>
		                 <div className="order">
                              <div className={`${"item"} ${!data.delicered? "purpled":"ash"}`}>
                                   <div className="image">
                                    <img src={`${image_url}${data.product[0].image}`} alt=""/>
                                   </div>
                                   <div className="title">
                                        <h1>{data.product[0].name}</h1>
                                   </div>
                                   <div className="trio">
                                        <Taka white={!data.delicered} num={"zero"} taka={data.product[0].price} ></Taka>
                                        <Counter movable={true} white={!data.delicered} fixed={true} count={data.orderNumber}></Counter>
                                        
                                        <Taka white={!data.delicered} num={"zero"} taka={data.product[0].price * data.orderNumber} ></Taka>
                                   </div>
                              </div>
                              <div className={`${"deliver"} ${!data.delicered? "purpled":"ash"}`}>
                                        
                                   <div className="center">
                                   <div className="deliver-time">
                                        <h1 className="info-title">Order Delivey :</h1>
                                        <h1 className="time" > Tommorow </h1>
                                   </div>
                                   <div className="order-time">
                                        <h1 className="info-title">Order Placed  :</h1>
                                        <h1 className="time" > 3d ago </h1>
                                   </div>
                                   </div>

                              </div>
                              
                           </div>   	
		</div>
	)
}

export default Ordercomp