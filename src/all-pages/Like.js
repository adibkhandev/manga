import {useState,useContext,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Context from './Context'
import axios from 'axios'
 
let Like =({product,id,liked})=>{
   let navigate = useNavigate()
   let dispatch = useDispatch()
   let context = useContext(Context)
   let userid = context.user? context.user.user_id : null
   let [like,setLike]= useState(liked?true:false)
   // let url = 'http://127.0.0.1:8000/like/'
   // let url2 = 'http://127.0.0.1:8000/dislike/'
   let url =  process.env.REACT_APP_BACKEND_URL + '/like/'
   let url2 =  process.env.REACT_APP_BACKEND_URL + '/dislike/'
   let likes = context.userdata? context.userdata.liked : null
   useEffect(() => {
      console.log(likes,id,'kkk')
      console.log(context.userdata)
      // console.log(likes.includes(product))

      if(likes){
         console.log(likes.filter(e=>e.id===id).length)
        if(likes.filter(e=>e.id===id).length!==0){
         setLike(true)
        }
      }
   }, [likes])
   return(
      <div onClick={()=>{

         if(context.userdata){
             if(!like){
             axios.post(url,{'userid':userid,'productid':id})
              .then((response)=>{
               console.log(response,'likes')
              })
              .catch((err)=>{
               console.log(err)
              })
               setLike(true)
               dispatch({type:'ADD-LIKE'})
               }
             else if(like){
             axios.post(url2,{'userid':userid,'productid':id})
              .then((response)=>{
               console.log(response,'likes')
              })
              .catch((err)=>{
               console.log(err)
              })
               setLike(false)  
             }

             }
         else{
            navigate('/login')
         }

          }
       } className="like">
         
         <svg className={like?"heart liked":"heart"} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      
               <path  d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z" 
          />
       </svg>
      </div>
   )
}

export default Like