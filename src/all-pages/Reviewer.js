import React,{useState,useEffect,useContext,useRef} from 'react'
import {Nav} from './Nav'
import {Taka,Stars} from "./Components"
import axios from 'axios'
import Navigation from './Navigation-ash'
import {useLocation,Link,useNavigate} from 'react-router-dom'
import Context from './Context'
import ImagePoster from './ImagePoster'

const Reviewer = () => {
	let location = useLocation()
	let data = location.state
	let context = useContext(Context)
        let user_data = context.user || null
        /*let userid = id.user_id || 28*/
        let userid = 28
        let navigate = useNavigate()

        let url = process.env.REACT_APP_BACKEND_URL + 'addrev/'
	let url2 = process.env.REACT_APP_BACKEND_URL
        // let url = '//127.0.0.1:8000/addrev/'
        // let url2 = '//127.0.0.1:8000/'
	let [image1,setImage1]=useState(null)
	let [image2,setImage2]=useState(null)
	let [image3,setImage3]=useState(null)
	let [star,setStar] = useState(0)
	let [writing,setWriting]=useState('')
	let pk = data.id
	let config = {
		headers:{
                       "content-type":"multipart/form-data",
		},
	};
	let sender = {userid,pk,writing,star,image1,image2,image3} 
	let ref_image1 = useRef(null) 
	let ref_image2 = useRef(null)
	let ref_image3 = useRef(null)
	let writeRef = useRef(null)
	let focusHandler=()=>{
		writeRef.current.focus()
	}
        let postHandler =() =>{
        	
                let formdata = new FormData();
        	formdata.append("userid",user_data.user_id)
        	formdata.append("pk",pk)
        	formdata.append("star",star)
        	formdata.append("writing",writing)
        	if(image1){
        		formdata.append("image1",image1)
        		if(image2){
        			formdata.append("image2",image2)
        			if(image3){
        				formdata.append("image3",image3)
        			}
        		}
        	}
        	   axios.post(url,formdata,{config})
        	    .then((response)=>{
        	       console.log(sender,'sending this')
                       console.log(response.data)
                       navigate('/')
                       window.location.reload(false)
        	    })
        	    .catch((err)=>{
                        console.log(err)
        	    })
        }

	let imageHandler=()=>{
	       if(image1==null){
	       	  ref_image1.current.click()
	       	  console.log('1st')
	       }
	       else if(image1){
	       	  if(image2){
	       	   if(image3){
                     console.log('no more')
                     setImage3(null)
	       	   }
	       	   else{
                   ref_image3.current.click()
                   console.log('3rd')
	       	   }
	       	  }
	       	  else{
	       	   ref_image2.current.click()
                   console.log('2nd')
	       	  }

	       }
	}
 

	return (
		<div className="reviewer-page">
            	<Nav colour={"ash"} visible={true} stick={false} ></Nav>
			<div className="product-details">
				<img className="review-image" src={`${url2}${data.image}`} alt=""/>
				<div className="details">
				    <h1 className="title">{data.name}</h1>
					<h1 className="story"> {data.story}</h1>
					<Taka num={"one"} taka={data.price}></Taka>
					<Stars setStar={setStar} >
						
					</Stars>
				</div>
			</div>
			<div className="input">
				<input ref={writeRef} onChange={(e)=>setWriting(e.target.value)} value={writing}  placeholder="Write your own review"  type="text"  className="rev">

				</input>
				 <img onClick={focusHandler} src="images/edit.png" alt="" className="write"/>
			</div>
			<div className="buttons">

			   <div className="btn-2 image-poster">
			       {/* <input onChange={}  type="file" multiple/>
					<img src="images/photo-camera.png" alt=""/>*/}
	                         {image1?<Image image={image1} />:''}
	                         {image2?<Image image={image2} />:''}
	                         {image3?<Image image={image3} />:''}

                                

                                <div className="clicker">
                                <div onClick={imageHandler} className="desc">
                                	<h1>Add Photos</h1>
                                	<div className="plus">
                                		<div className="vert"></div>
                                		<div className="hor"></div>
                                	</div>
                                </div>
				<input onChange={(e)=>{
				        console.log(e.target.files[0])	
					setImage1(e.target.files[0])

				} }
				className="input1" ref={ref_image1} type="file"/>
				<input onChange={(e)=>setImage2(e.target.files[0])} className="input2" ref={ref_image2} type="file"/>
				<input onChange={(e)=>setImage3(e.target.files[0])} className="input3" ref={ref_image3} type="file"/>	
                                </div>
			   </div>
				<div className="btn-1">
				        
				        	
					<button onClick={postHandler} >
						Post review
					</button>
				        
				</div>
				
			</div>
		</div>
	)
}


const Image = ({image}) =>{
        let [url,setUrl] = useState(null)
        useEffect(() => {
        	if(image){
        		const reader = new FileReader()
        		reader.onloadend = () =>{
        			setUrl(reader.result)
        		}
        		reader.readAsDataURL(image)
        	}
        	else{
        		setUrl(null)
        	}
        }, [image])
	return(
       <>
       <div className="input-image" >
       	 <img src={url} alt=""/>
       </div>
       </>    
	)
}

export default Reviewer