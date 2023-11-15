import React,{useState,useEffect,useContext} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Context from './Context'
import {Nav} from './Nav'
import {Taka,Item} from './Components'
const Liked = () => {
	let da = {
		"userid":27,
		"products":[
          {
          	"id":1,
          	"count":1
          },
          
		],
	}
   let context = useContext(Context)
   let likes = context.userdata? context.userdata.liked : null
   let notifications = useSelector((state)=>state.notifyState.notifications)
   let dispatch = useDispatch()
    let list = [0,1,2,3,4]
    
    let [hover,setHover]=useState(0)
    useEffect(() => {
    	// window.location.reload(false)
    	if(notifications.liked>0){
            dispatch({type:"NULLIFY-LIKE"})
    		window.location.reload(false)
    	}
    }, [notifications])
    console.log(context,'llll')
	return (
		<>
	<div className="liked-page">
	    <Nav colour={"ash"} visible={true} stick={false} ></Nav>

		<div className="items">
					{likes ? likes.map((list)=>{
						return(
							  <Item data={list} liked={true}></Item>
                              
						)
					}): <h1>hi</h1>
				 }
				</div>		
	</div>
		</>
	)
}

export default Liked