import React,{useState,useEffect,useContext,useRef} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import Context from './Context'
let array = [0,1,2,3] 
const MostPopular = () => {
    let url =  process.env.REACT_APP_BACKEND_URL + '/ranker/'
    let image_url =  process.env.REACT_APP_BACKEND_URL
	let context = useContext(Context)
	let setResult = context.setresult
	let setLoading = context.setloading
	let board = context.board
	let setBoard = context.setBoard
	let [rank,setRank]= useState(null)

	
    let [popular,setPopular]=useState([])
    let [load,setLoad] = useState(true)
  useEffect(() => {
    // console.log('use')
       axios.get(url)
       .then((response)=>{
        // console.log('hocche')
        setRank(response.data)
    	console.log('going to: ',url)
        // console.log(response.data,'rank')
        // console.log('being s')

       })
       .catch((err)=>{
        // console.log(err)
		console.log('error from: ',url)
       })
  },[])
  useEffect(() => {
  	if(rank){
  		// console.log('rank ase')
    
  	setBoard(rank)
  	
  	// console.log(board)
    }
  }, [rank])
  useEffect(() => {
     if(board){
    setPopular(board.slice(0,4))
    setLoad(false)
  		
  	}
  }, [board])
    let resultHandler = () =>{
    	// console.log(popular,'pops')
    	setLoading(false)
    }
	return (
		<div className="page3">
			<div className="description">
				<h1 className="heading">Most Popular</h1>
				<h1 className="discon">Discount on</h1>
				<h1 className="subheading">Manga Light novels and all</h1>
				<div onClick={resultHandler} className="but-con">
				<Link to='/searched' >
					<button className="callToaction">Shop Now</button>
				</Link>
				</div>
					
				
			</div>
			
			<div className="populars">
			        {!load?popular.map((item)=>{
			        	// console.log(item.image)
			        	return(
                      <Item item={item} ></Item>  
			        	)
			        }):'hi'}
				  
					

					
				</div>
			
		</div>
	)
}


let Item = ({item}) =>{
	// let image_url = 'http://127.0.0.1:8000'
	let image_url = process.env.REACT_APP_BACKEND_URL
	let [visible,setVisible] = useState(false)
	let cardRef = useRef(null)
	let callback = entries =>{
		     let [entry] = entries
		     if(entry){

         setVisible(entry.isIntersecting)
         console.log(visible,'issss')
		     }
		     else{
		     	console.log('no')
		     }
	}
	let options = {
		root:null,
		rootMargin:'0px',
		threshold:0.6
	}
	useEffect(() => {
		let observer = new IntersectionObserver(callback,options)
		if(cardRef.current){
			observer.observe(cardRef.current)
		}
		return () => {
			if(cardRef.current){
				
			observer.unobserve(cardRef.current)
			}
		};
	}, [cardRef,options])
	return(
     <Link to="./post" state={item} >
					      <div ref={cardRef} className={!visible?"card out":"card"}>
						      <img src={`${image_url}${item.image}`} alt="" className="card-image"/>
						      <h1 className="card-title">{item.name}</h1>
						      <div className="price">
						       <img src="manga/images/taka.png" alt="" className="price-icon"/>
						       <h1 className="card-price">{item.price}</h1>
						      </div>
						
					      </div>
				   	
     </Link>
	)
}
export default MostPopular