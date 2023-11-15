import React,{useState,useContext} from 'react'
import Context from './Context'
import Navigation from './Navigation-ash'
import {Nav} from './Nav'
import axios from 'axios'


const Log = (props) => {
   
   let [mail,setMail]=useState()
   let [password,setPassword]=useState()
   let context = useContext(Context)
   let tokensetter = context.function
   let usersetter = context.usersetter
   let user = context.user

   // console.log(context)
   let url =  process.env.REACT_APP_BACKEND_URL + '/api/token/'
   // let url = '//127.0.0.1:8000/api/token/'
   let config = {
      headers:{
         'Content-Type':'application/json'
      }
   }
   let handleSubmit =()=>{
     
      
      axios.post(url,{ 
         "email":mail,
         "password":password
      },config)
      .then((response)=>{
         if(response.status==200){
         console.log(response.data)
         tokensetter(response.data)
         usersetter(response.data)
         props.func()
         }

         
      })
      .catch((err)=>{
         if(mail && password){
         props.setNotifyLog('Login Failed')

         }
         else{
            props.setNotifyLog('Please fill up all the fields to proceed')
         }
         console.log('sdsa')
      })
   }
    return(

       <div className="reg-background">
       <Nav binary={props.binary===0?1:0}  stick={true} ase={true} searchon={true}  colour={'white'}/>
           <div className={props.binary===0?"login-inputs gone":"login-inputs"}>
       		 <h1 className="headline">
       			Log in your account. 
       		 </h1>
       	

             
              <input onChange={(e)=>setMail(e.target.value)} value={mail}  placeholder="Email" type="text" className="email"/>
              <input onChange={(e)=>setPassword(e.target.value)} value={password}  placeholder="Enter password" type="text" className="password"/>
             <h1 className="shifter" onClick={props.func} >Don't have an account? Sign up</h1>
             <div className="but">
             	<button onClick={handleSubmit} >Login</button>
             </div>
           </div>
         </div>  
    )	
 
 
}
export default Log