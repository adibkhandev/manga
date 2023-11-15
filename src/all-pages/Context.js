import React,{createContext,useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'
export let Context = createContext()

export let AuthProvider = ({children}) =>{
    let localStorageRefresh = localStorage.getItem('refreshtoken')
    let localStorageAccess = localStorage.getItem('usertoken')
    let localStorageUserData = localStorage.getItem('userdata')
    let localStorageUser = localStorage.getItem('user')
	let [search,setSearch] = useState(null)
    let [category,setCategory] = useState(null)
    let [offer,setOffer]=useState(null)
    let [result,setResult] = useState(null)
    let [loading,setLoading] = useState(true)
    let [board,setBoard]=useState(null)
    let [biller,setBiller] = useState(0)
    let [user,setUser]=useState(JSON.parse(localStorage.getItem('userdata'))|| null)
    let navigate = useNavigate()
    let [refresh,setRefresh] = useState(JSON.parse(localStorage.getItem('refreshtoken'))|| null)
	const [token, setToken] = useState(JSON.parse(localStorage.getItem('usertoken')) || null)
	//contains user id
	let [data,setData]= useState(JSON.parse(localStorage.getItem('user'))||null)
	//
	// console.log(localStorageAccess,'access')
	// console.log(JSON.parse(localStorage.getItem('refreshtoken')),'refresh')
	let [likedID,setLikedID]= useState()
	// console.log(data.user_id)
	console.log(localStorageAccess,'local')
	// console.log(refresh)
	// console.log(search)
	let lifespan = 1000 * 60 * 4
	let url =  process.env.REACT_APP_BACKEND_URL + '/refresh/'
	// let url = 'http://127.0.0.1:8000/api/token/refresh/'
	let liked_url =  process.env.REACT_APP_BACKEND_URL + '/liked/'
	let user_url =  process.env.REACT_APP_BACKEND_URL + '/userdata/'
	// let user_url = 'http://127.0.0.1:8000/userdata/'
	let search_url =  process.env.REACT_APP_BACKEND_URL + '/search/'
	// let search_url = 'http://127.0.0.1:8000/search/'
	let search_url_cat =  process.env.REACT_APP_BACKEND_URL + '/search/cat/'
    // console.log(token,'token')


   //
   //Liked
   //
    useEffect(() => {
    	// console.log(data,'darttaa')
    	// console.log('liking')
    	if(data){
            // console.log(data,'data')
            // console.log('choddaaaa')
    		axios.post(liked_url,{"id":data.user_id})
    		 .then((response)=>{
    		 	// console.log('chhhhhh')
                setLikedID(response.data.liked)
                // console.log(likedID,'this is it')
                // console.log('chhhhh')
    		 })
    		 .catch((err)=>{
    		 	// console.log(err)
    		 })
    		

    	}
    }, [data])
    //
    //

    //
    //User
    //
    useEffect(() => {
    	// console.log('chaaaaaaa')
    	if(data){
             axios.post(user_url,{"id":data.user_id})
    		 .then((response)=>{
    		 	console.log(response.data,'chaaaaaaa')

                setUser(response.data)
                localStorage.setItem('userdata',JSON.stringify(response.data))
                console.log(JSON.parse(localStorage.getItem('userdata')),'is it')
                // console.log('chaaaa')
    		 })
    		 .catch((err)=>{
    		 	// console.log(err)
    		 })
    		 // console.log('chodaaa')
    		}
    	else{
    		localStorage.removeItem('userdata')
    	}
    }, [data])


    //
    //

    //
    //after refresh
    //
	useEffect(() => {
		let Now = setInterval(()=>{
          if(token!=null){
          axios.post(url,{'refresh':refresh})
		    .then((response)=>{
		     // console.log(response.data.refresh,'reeeeeeeeeeee')
			 setToken(response.data.access)
			 localStorage.setItem('usertoken',JSON.stringify(token))

			 // console.log('hello'+token)

		   })
		   .catch((err)=>{
			 // console.log(err)
		   })
		  }
		  else{
		  	// console.log('refresh failed')
		  }
		},lifespan)
		return () => {
			clearInterval(Now)
			// console.log('cleared')
		};
	}, [token,refresh])

	//
	//
	//

	//
	//token setter
	//
useEffect(() => {
	if(localStorageAccess){
		setToken(JSON.parse(localStorageAccess))
		setRefresh(JSON.parse(localStorageRefresh))
     if(token){
     	let userdata = jwtDecode(token)
     	console.log(userdata,'datatwatattata')
     	setData(userdata)
     	// console.log(userdata,'data')
     }		
	}
}, [token])

   //
   //
   //


//search api request

useEffect(() => {
	// console.log(category,'keywordddd')
        setLoading(true)
        setCategory(null)
        setOffer(null)
        setBoard(null)
        setSearch(null)
        // console.log('useEffect')
        // console.log(search,'search hoise')
        if(search){
        	// console.log('searchhh')
        	axios.post(search_url,{'searched':search})
        	.then((response)=>{
        		setResult(response.data)
        		setLoading(false)
        		
        	})
        	.catch((err)=>{
        		// console.log(err)
        	})
        }
        if(category){
        	// console.log('success send')
             axios.post(search_url_cat,{'category':category})
             .then((response)=>{
             	setResult(response.data)
             	setLoading(false)
             
             })
             .catch((err)=>{
             	// console.log(err)
             })
        }
        if(board){
        	setResult(board)
        	setLoading(false)
           
        }
}, [search,category,offer,board])


    //sets user data **
    // console.log(token,'t')
	let usersetter=(token)=>{
		let userdata = jwtDecode(token.access)
		// console.log(userdata)
		if(userdata){
		setData(userdata)
		   if(data){
		     localStorage.setItem('user',JSON.stringify(data))
		   }
	    }
           
	}


	let tokensetter=(sentToken)=>{
        console.log(sentToken,'token')
		if(sentToken){
		setToken(sentToken.access)
		setRefresh(sentToken.refresh)
		localStorage.setItem('usertoken',JSON.stringify(sentToken.access))
		localStorage.setItem('refreshtoken',JSON.stringify(sentToken.refresh))
        console.log(localStorage.getItem('usertoken'),'kk')
        navigate('/')
       }
	}
	let logout=()=>{
		setData(null)
		setUser(null)
		setToken(null)
		setRefresh(null)
        localStorage.removeItem('user')
		localStorage.removeItem('userdata')
		localStorage.removeItem('usertoken')
		localStorage.removeItem('refreshtoken')
		navigate('/')
		console.log(data)
	}

    let searcher =(search_keyword)=>{
    	if(search_keyword){

    	}
    }

	return(
        <Context.Provider value={{'biller':biller,'setBiller':setBiller,'logout':logout,'loading':loading,'setloading':setLoading ,'function':tokensetter,'token':token,'user':data,'usersetter':usersetter,'setsearch':setSearch,'search_result':result,'set_category':setCategory,'setresult':setResult,'board':board,setBoard:setBoard,'setUser':setUser,'userdata':user,'setUserdata':setUser}} >
        	{children}
        </Context.Provider>
	)
}

export default Context