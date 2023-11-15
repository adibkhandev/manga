import React,{useState,useContext} from 'react'
import {useDispatch} from 'react-redux'
import {Nav} from './Nav'
import {Link,useNavigate} from "react-router-dom"
import {SearchEngine} from './Nav'
import {Taka,FixedStars,Filter,NotFound} from "./Components"
import Like from './Like'
import Context from './Context'
const  Searched = () => {
	let context = useContext(Context)
	let results = context.search_result
	let loading = context.loading
	let setSearch = context.setsearch
	console.log(results,'achieved')
	return (
		<>
		<div className="pg">
			
        <div className="searched-page">
         
         
         	    
         {
         	
         	  <>	
        	  <Nav stick={false} ase={true} searchon={true} visible={true} colour={'ash'}></Nav>
              <Results loading={loading} results={results} > </Results>
           
              </>
              
         }        
         	
        </div> 
        <div className="conter">
         <SearchEngine
            ase={true}
            searchon={true}
            setSearch={setSearch}
            >
          </SearchEngine>
        	
        </div>
		</div>
		</>
	)
}
const Results=({results,loading})=>{
	let [start,setStart]=useState(0)
	let [limit,setLimit]=useState(20000)

	let resultFiltered = results?results.filter((result)=>{
		return start<=result.price && result.price<=limit
	}):[]
	console.log(resultFiltered.length,'got')
	return(
		<>
		  
		  <div className="all">
		   <Filter start={start} setStart={setStart} limit={limit} setLimit={setLimit} /> 
	       {!loading && results.length!==0?(
	       	 <div  className={resultFiltered.length<6?"cards shortage":"cards"}>
              
	       	  {resultFiltered.map((result)=>{
	       	  	return(
	       	  
                   <Card result={result} ></Card>
	       	  	
	       	  
	       	    )})
	       	   }
	          </div>
	        ):<NotFound></NotFound>}	
		  	
		  </div>
		</>
      
	)
}
const Card =({result})=>{
	let url2 = process.env.REACT_APP_BACKEND_URL
	let context = useContext(Context)
	// let url2 = 'http://127.0.0.1:8000'
	let dispatch = useDispatch()
	let navigate = useNavigate()
	console.log(result.rev,'revv')
	let Totalrating = [0]
	let rate = result.rev.map((item)=>{
		return Totalrating+=item.rating
	})
	let star = Totalrating/result.rev.length
	console.log(star,'st')
	console.log(Totalrating,'tot') 
	console.log(rate,'ratee')
	return(
        <>  
          <div className="cont">
            <Link to="/post" state={result} >
            <div className="card">
                    <div className="image-cont">
                    	
                   	<img className="card-img" src={`${url2+result.image}`} alt=""/>
                    </div>
                   	<h1 className="title">
                   		{result.name}
                   	</h1>
                   	<Taka num={"minier"} taka={result.price}  ></Taka>
                   	
            </div>
            </Link>
            <div className="functional-buttons">
                  {star?<FixedStars star={star} ></FixedStars>:<FixedStars ></FixedStars>}
            	    
                   	<div className="cart-like">
                   	    
                   		<h1 onClick={()=>{
                          if(context.userdata){
                   		  dispatch({type: 'ADD' , payload:result ,count:1}) 
                   		  dispatch({type:'ADD-CART'})
                          }
                          else{
                           navigate('/login')
                          }
                   		}}>
                   		Add tocart

                   		</h1>
                   	    
                   	   
                         <Like product={result} id={result.id} ></Like>
                         
                   	</div>
            </div>
          	
          </div>
        </>
	)
}

export default  Searched