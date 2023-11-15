import react ,{useState,useEffect,useRef,useContext}from 'react'
import Navigation from './Navigation'
import '../sass/main.scss'
import RunningOut from './RunningOut'
import MostPopular from "./MostPopular"
import { motion } from "framer-motion"
// import Nav from './Nav'
import {SearchEngine,Nav} from './Nav'

import axios from 'axios'

import {AuthProvider,Context} from './Context'

let Landing = ({setSearch})=>{
 
  let [isout,setIsout] = useState(true)
  let [searchon,setSearchon]= useState(true)
  let local = localStorage.getItem('usertoken')
  // console.log(JSON.parse(local),'json')
    let context = useContext(Context)
    // console.log(context)
    let usersetter = context.usersetter
    let token = context.token
    let SetSearch = context.setsearch
     // useEffect(() => {
     //   if(token){
     //     // console.log(token,'tok')
     //   }
     // }, [token])
  return(
    <>
    <div   className="land">
      <Nav  setSearch={setSearch}  stick={true} ase={true} searchon={searchon?true:false} visible={true} colour={'white'} ></Nav>
     <Home setsearch={SetSearch} searchon={searchon} ase={true} scrolling={setSearchon} referer={setIsout}  ></Home>
     <RunningOut  ></RunningOut>
     <MostPopular ></MostPopular>
    </div>
     
     </>
  )
}

let Home =(props)=>{
  let [buttonthere,setButtonthere] = useState(true)
  let myref = useRef();

  //  useEffect(() => {
     
     


    
  //   return () => {
  //     let observer = new IntersectionObserver ((entries,options)=>{
  //       let entry = entries[0];
  //       props.referer(entry.isIntersecting)
  //       console.log(entry)

  //     })
  //     if(myref.current){
  //     observer.observe(myref.current)
  // }
  //       }
  // }, [])

   let scroller=()=>{
     if(window.scrollY>400){
         setButtonthere(false)
        
     }
     if(window.scrollY<400){
      setButtonthere(true)
     }
   }
   useEffect(() => {
   window.addEventListener('scroll',scroller)
     return () => {
       window.removeEventListener('scroll',scroller)
     };
   })
   // props.scrolling(buttonthere)
  return(
    <>
       <div  
        className="page1"
        
        >
         
           <motion.div
             ref={myref} 
             className="hero-section"
             initial={{ y: -8}}
             animate={{ y: 8}}
            transition={{ 
              repeat: Infinity,
              duration: 1,
              repeatType: "mirror"
              }}
             
            >
           <div className="image">
             <img src="/rhinoapp/images/gojo.webp" alt=""/>
           </div>
           {/*<div className="image-mob">
             <img src="rhinoapp/images/gojo.webp" alt=""/>
           </div>*/}
             
           
           </motion.div>
           
           <Scrolldown visibility={buttonthere} >
         
           </Scrolldown>
           <div className="floating-search">
           
           <SearchEngine setSearch={props.setsearch} searchon={props.searchon} ase={props.ase} >
             
           </SearchEngine>
             
           </div>
             
        

       </div>
 
       
    </>
  )
}
let Scrolldown = (props)=>{
  
  return(
    <>
      <button onClick={()=>{
        window.scroll(0,1000)
      }} className={props.visibility?"arrow-down-button appear" : "arrow-down-button flee"}>
       <img src="images/arrow-icon.png" alt="" className="scrolldown"/>
      </button>
    </> 
  )
}

let Heading=()=>{
  
  return(
        <h1>
          largest 
          <span>manga</span> shop in bangladesh
         
        </h1>

  )
}
let Popup =()=>{

  return(
      
       <img src="rhinoapp/images/mikasa.png" alt="" className="pop-img"/>
      
  )
}

export default Landing;
