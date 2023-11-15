import React,{useState,useEffect,useContext} from 'react'
import { useId } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {Link} from "react-router-dom"
import axios from 'axios'
import Context from './Context'
import {useNavigate} from 'react-router-dom'
const Post =(props)=>{
	let base_url = process.env.REACT_APP_BACKEND_URL
	// let base_url = '127.0.0.1:8000'
	let [available,setAvailable] = useState(0)
	let store = useSelector((state)=> state.data)
	let [open,setOpen]=useState(false)
	let [num,setNum] = useState(null)
	let [images,setImages]=useState([])
	console.log('hello')
	console.log(store)
	let location = useLocation()
	let data = location.state
	console.log(available,'avvaaasa')

	return(
		<div className="post-page">
			<MainPost setOpen={setOpen} setAvailable={setAvailable} num={num} open={open} data={data} ></MainPost>
			<WriteReview   data={data} ></WriteReview>
			<ReviewSlide available={available} setAvailable={setAvailable} num={num}  setImages={setImages} setNum={setNum} open={open} setOpen={setOpen} data={data}></ReviewSlide>
			{num!=null?(
      	    <div
             onClick={()=>{
             	setNum(null)
             	setImages([])
             }}
      	     className={'revimager'} >
			 <div className="image">
				<img src={base_url+images[num].image} alt=""/>
			 </div>
			 <div
              onClick={(e)=>{
              	e.stopPropagation()
              	if(num<images.length-1){
              	setNum(num+1)
              	console.log(num)
              }
              }}
			  className="directioners"
              id="right"
			  >
				<img src="images/arrow-icon.png" alt=""/>
			 </div>
			 <div
              onClick={(e)=>{
              	e.stopPropagation()
              	if(num>0){
              		setNum(num-1)
              		console.log(num)
              	}
              }}
			  className="directioners"
              id="left"
			  >
				<img src="images/arrow-icon.png" alt=""/>
			 </div>
		</div>
      		)
      	:'hi'
      }
		</div>
    
	)
}
const MainPost = ({data,open,num,setAvailable,setOpen}) => {
	let [count,setCount]=useState(1)

	let url2 = process.env.REACT_APP_BACKEND_URL
	// let url2 = '127.0.0.1:8000'
	let dispatch = useDispatch()
	let cartid = useId()
    console.log("post",data)
    console.log(num,'sdffdsfjoal')
	return (
		     <>
			   <div onClick={()=>{
			   	setAvailable(0)
			   	setOpen(false)
			   }} id={num!=null?'blur':''} className={open?"post reve":"post revless"}>
			   	
			  
				<div className="picture">
					<img src={`${url2}${data.image}`} alt="" className="post-image"/>
				</div>
				<div className="text">
				     <div className="described">
				     	<h1 className="title">
						 {data.name}
					    </h1>
					    <h1 className="story">
						 {data.story}
					    </h1>
					    <div className="price">
						  <img src="images/taka.png" alt=""/>
						  <h1 className="price">{data.price}</h1>
					    </div>
				     </div>
					
					
					
					<div className="buttons">
						<div className="add">
						<Link to='/cart'>
						 <button  onClick={() => {
						 	   dispatch({ id:cartid , type: 'ADD' , payload:data ,count:count})
						 	   dispatch({type:'ADD-CART'})
						 	}}
						 	className="add"
						 	>
							Add to cart
						 </button>
							
						</Link>
					    </div>
					    <div className="count">
					    	<img onClick={()=>{
					    		return(
					    		setCount(count-=1),
					    		console.log(count)
					    		)
					    	}}
					    	 src="images/arrow-icon.png" alt="" className="right"/>
					    	
					    	<h1 className="num">{count}</h1>
					    	
					    	<img onClick={()=>{
					    		return(
					    		setCount(count+=1),
					    		console.log(count)
					    		)
					    	}}  
					    	src="images/arrow-icon.png" alt="" className="left"/>
					    </div>
					</div>
					
				</div>
				</div>
				</>
			
		
	)
}


const WriteReview=({data})=>{

	return(
       <>
       <Link to="/reviewer" state={data} >
       <div className="review-container">
       	<img src="images/edit.png" alt="" className="review-image"/>
       </div>
       </Link>
       </>
	)
}
const ReviewSlide=({data,open,setOpen,setImages,setNum,num,available,setAvailable})=>{
	let [reviews,setReviews] = useState()
	console.log(available,'dsfdslkjfs')

    
	return(
<>

	<div className={available===0?"semi-circle-1-active":"semi-circle-1-inactive"}>
	</div>
	<div onClick={()=>{{
		setAvailable(1)
		setOpen(true)
	}}} className={available===0?'semi-circle-2-active':'semi-circle-2-inactive'}>
		<h1 className={available===0?"review-title-active":"review-title-inactive"}>
		  Reviews
	    </h1>
		
	</div>
	
	<div id={num!=null?'blur':''} className={available===1?'reviewer':'reviewer close'}>

	    <div onClick={()=>{{
		setAvailable(0)
		setOpen(false)
	}}} className="rev-title">
	    	Reviews
	    </div>
	    <div className="reviews">
		{data.rev.map((data)=>{
			return(
               <Review setImages={setImages} setNum={setNum} data={data} ></Review>
			)
		})}
	    	
	    </div>
	</div>
	
</>
	)
}

const Review = ({data,setNum,setImages}) =>{
	let [image,setImage] = useState(null)
	let context = useContext(Context)
	let userid = context.user?context.user.user_id:0
	let navigate = useNavigate()
	
	console.log(userid,'usr')
	let url = process.env.REACT_APP_BACKEND_URL + 'images/'
	let base_url = process.env.REACT_APP_BACKEND_URL
	// let url = '//127.0.0.1:8000/review/images/'
	// let base_url = '//127.0.0.1:8000/'
    console.log(data.creater_id,'data')
    useEffect(() => {
    	axios.post(url,{'id':data.id})
    	.then((response)=>{
            console.log(response.data,'RES')
            setImage(response.data)
    	})
    	.catch((err)=>{
    		console.log(err)

    	})
    }, [])
    // let deleteUrl =  '//127.0.0.1:8000/delrev/' 
    let deleteUrl = process.env.REACT_APP_BACKEND_URL + 'delrev/'
    let deleteRev = () =>{
    	console.log(data.id)
       axios.post(deleteUrl,{'id':data.id})
       .then((response)=>{
       	console.log(response.data)
         navigate('/')
       	window.location.reload(false);
       })
       .catch((err)=>{
       	console.log(err)
       })
    }
	return(
      <div className="container-rev">
      	<div className="pfp">
      		<img src={data.creater_pfp?`${base_url}${data.creater_pfp}`:"images/pfp.jpg"} alt=""/>
      	</div>
      	<div className="data">
      		<div className="namerate">
      			<h1 className="creater_name">
      				{data.creater_name}
      			</h1>
      			<div className="rating">
      				<h1>{data.rating}/5</h1>
      				<img src="images/star.svg" alt=""/>
      			</div>
      		</div>
      		<div className="writing">
      			{data.review}
      		</div>
      		{userid==data.creater_id?(
      		<img onClick={deleteRev} className='delete' src="images/delete.png" alt=""/>
      		):''}
      		<div className="images">
      			{image?image.map((img,i)=>{
      				console.log(i)
      				return(
      					<div onClick={()=>{
      						console.log(i)
                             setNum(i)
                             setImages(image)
                         
                             console.log(image,'im')
      					}} 
      					className="rev_image_cont">
      						
      					<img className='rev_images' src={`${base_url}${img.image}`} alt=""/>
      					</div>
      				)
      			})
      		    :
      		    ""
      		   }
      		</div>
      	</div>
      	
      	

      </div>
	)
}

export default Post