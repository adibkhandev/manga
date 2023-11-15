import { createStore } from "redux";
import { combineReducers } from 'redux'
let initialState = {
	                  data:[],
	                  notifications:{
                         liked:0,
                         cart:0,
	                  },

                   
 }
let cartState=(state=initialState,action)=>{
	switch(action.type){
	case "ADD": return {
		
		...state,
		data:[...state.data ,
		           {
		           	  
		               	product:action.payload,
		               	count:action.count,
		           }
                            
			 ]

	}
	case "UPDATE-": 
        let subArray = state.data.map((item,i)=>{
        	if(i==action.id){
        		return{
                   ...item,
                   count:state.data[action.id].count-1,
        		}
        	}
        	else{
        		return{
        			...item
        		}
        	}
        })
        return{
        	...state.data,
        	data:subArray
        }

     case "UPDATE+": 
        let addArray = state.data.map((item,i)=>{
        	if(i==action.id){
        		return{
                   ...item,
                   count:state.data[action.id].count+1,
        		}
        	}
        	else{
        		return{
        			...item
        		}
        	}
        })
        return{
        	...state.data,
        	data:addArray
        }
     case "DELETE":
     	 return{
     	 	...state,
     	 	data:state.data.filter((item)=>{
     	 		return item!=action.payload
     	 	})
     	 }
		
		

    default: return state
	}
    



}

let notifyState=(state=initialState,action)=>{
   switch(action.type){
    case "ADD-LIKE":

      return{
      	...state,
      	notifications:{
      		...state.notifications,
      		liked:state.notifications.liked+1
      	}

      } 
    case "NULLIFY-LIKE":
    	return{
    		...state,
      	notifications:{
      		...state.notifications,
      		liked:0
      	}
    	}
     case "ADD-CART":

      return{
      	...state,
      	notifications:{
      		...state.notifications,
      		cart:state.notifications.cart+1
      	}

      } 
    case "NULLIFY-CART":
    	return{
    		...state,
      	notifications:{
      		...state.notifications,
      		cart:0
      	}
    	}
   }

 return state
}
let reducer = combineReducers({cartState,notifyState})
let store = createStore(reducer)

export default store