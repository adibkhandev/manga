 import React,{useContext,useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Context from './Context'
import axios from 'axios'
const Account = () => {
	let navigate = useNavigate()
	let [username,setUsername]=useState()
	let [number,setNumber]=useState()
	let [mail,setMail]=useState()
	let [adress,setAdress]=useState()
	let [pfp,setPfp]=useState(null)
	let [imageUrl,setImageUrl]= useState(null)
	let pfp_ref = useRef(null)
	let num_ref = useRef(null)
	let mail_ref = useRef(null) 
	let update_url = process.env.BACKEND_URL + '/update/'
		let config = {
		 headers:{
                       "content-type":"multipart/form-data",
		 },
	    };

	let url =  process.env.REACT_APP_BACKEND_URL
    let context = useContext(Context)
    let logout = context.logout
    let userdata = context.userdata
    let setUser = context.setUser
    useEffect(() => {
    	if(pfp){
    	const reader = new FileReader()
        		reader.onloadend = () =>{
        			setImageUrl(reader.result)
        		}
        		reader.readAsDataURL(pfp)
        }
    }, [pfp])
	return (
		userdata?
		<div className="account-page">
			<div className="left">
				<div className="pfp-cont">
					<img onClick={()=>pfp_ref.current.click()} src={imageUrl?imageUrl : userdata.profile_pic?`${url}${userdata.profile_pic}`:"images/pfp.jpg"} alt=""/>
					<input onChange={(e)=>setPfp(e.target.files[0])} type="file" ref={pfp_ref}/>
				</div>
				<div className="texts">
				<div className="username">
				   <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder={userdata.first_name+userdata.last_name}/>	
				</div>
				<div className="number-input-container">
					<input ref={num_ref} className="number-input" onChange={(e)=>setNumber(e.target.value)} value={number} type="text" placeholder={`0${userdata.phonenumber}`}/>
					<div  className="write-cont">
						
					<img onClick={()=>num_ref.current.focus()} src="images/write.png" alt="" className="pen"/>
					</div>
				</div>
                <div className="mail-input-container">
                	<input ref={mail_ref} className="mail-input" onChange={(e)=>setMail(e.target.value)} value={mail} type="text" placeholder={userdata.email}/>
                	<div  className="write-cont">
                		
                	<img onClick={()=>mail_ref.current.focus()} src="images/write.png" alt="" className="pen"/>
                	</div>
                </div>
					
				</div>

			</div>
			<div className="right">
				<div className="adress">
					<h1>
						Adress
					</h1>
					<textarea  type="textarea"  onChange={(e)=>setAdress(e.target.value)} value={adress}  placeholder={userdata.adress}/>
					
					<div className="mapper-cont">
					<Link to="/map">
					<img src="images/pin.png" alt="" className="mapper"/>
						
					</Link>
						
					</div>
				</div>
				<div className="lists">
					<div className="wishlist">
					<h1>
						WishList
					</h1>
					<div className="images">
						{ userdata.liked.slice(0,3).map((item)=>{
							return(
								<img src={`${url}${item.image}`} alt=""/>
						    )
						})
					    }
					    <Link to="/liked">
					    <div className="go-to">
                        	<img src="images/arrow-icon.png" alt=""/>
                        </div>
					    </Link>
					</div>
				</div>
				<div className="orders">
					<h1>
						Orders
					</h1>
					<div className="images">
						{
							userdata.ordered.slice(0,3).map((item)=>{
								return(
								<img src={`${url}${item.product[0].image}`} alt=""/>
							    )
							})
						}
						<Link to="/order">
						<div className="go-to">
							<img src="images/arrow-icon.png" alt=""/>
						</div>
						</Link>
					</div>
				</div>
				</div>
				<div className="btns">
					<button onClick={()=>{
						console.log(pfp,'pff')
                         axios.post(update_url,{"id":userdata.id,"username":username,"pfp":pfp,"number":number,"mail":mail,"adress":adress},config)
                         .then((response)=>{
                         	console.log(response.data)
                         	setUser(response.data)
                            navigate('/')
                            window.location.reload(false)
                         })
                         .catch((err)=>{
                         	console.log(err)
                         })

					}
				} 

					className="btn-1">
						Save Changes
					</button>
					<button onClick={logout} className="btn-2">
						Logout
					</button>
				</div>

			</div>
		</div>:'hi'
	)
}

export default Account

