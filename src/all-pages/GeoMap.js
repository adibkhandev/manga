import React, { useState, useEffect,useContext} from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css';
import Context from './Context'

let GeoMap = ()=> {
  let navigate = useNavigate()
  let context = useContext(Context)
  let data = context? context.userdata : null
  let id = data? data.id : null
  let before_adress = data? data.adress : null
  console.log(id)
  let [search,setSearch]=useState('')
  let [adress,setAdress] = useState(before_adress || null)
  const [viewport, setViewport] = useState({latitude: 23.7531959, longitude: 90.4374604});
  useEffect(() => {
    console.log(viewport)
  }, [viewport])
  useEffect(() => {
    console.log(viewport)
    if("geolocation" in navigator){
      console.log('available')
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude,position.coords.longitude)
        setViewport({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
        })
        console.log(viewport,'vee')
      })
    }
    else{
      console.log('bug')
    }
  },[])

  let onMarkerDragStart = (event) => {
    const {latitude, longitude} = event;
   
  }

  let onDragEnd = (event) => {
    
    if(event.lngLat){
      let url =`https://api.geoapify.com/v1/geocode/reverse?lat=${event.lngLat.lat}&lon=${event.lngLat.lng}&apiKey=24d9c36345a346f1be7bc3c92cf1f26b`
      axios.get(url)
       .then((response)=>{
        console.log(response.data.features[0].properties.formatted)
        setAdress(response.data.features[0].properties.formatted)
        setViewport({
          latitude:response.data.features[0].geometry.coordinates[1],
          longitude:response.data.features[0].geometry.coordinates[0],
        })
       })
       .catch((err)=>{
        console.log(err)
       })
    }
  }

  let onMarkerDrag = (event) => {
    const {latitude, longitude} = event;
  
  }


  let geoCode = ()=>{
    if(search){
    let url = `https://api.geoapify.com/v1/geocode/search?text=${search}&apiKey=24d9c36345a346f1be7bc3c92cf1f26b`
        axios.get(url)
       .then((response)=>{
        console.log(response.data.features[0].geometry.coordinates)
        setViewport({
          latitude:response.data.features[0].geometry.coordinates[1],
          longitude:response.data.features[0].geometry.coordinates[0],
        })
       })
       .catch((err)=>{
        console.log(err)
       })
 
    }
  }

  let changeAdress = () =>{
    let url =   process.env.BACKEND_URL + '/update/'
    axios.post(url,{id:id,adress:adress})
    .then((response)=>{
      console.log(response.data)
      
      navigate('/')
      window.location.reload(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="map-cont">
      {viewport?(

      <ReactMapGL
        {...viewport}
        latitude={viewport.latitude }
        longitude={viewport.longitude }
        width= {"100vw"}
        height= {"1000vh"}
        zoom= {15}
        mapboxAccessToken="pk.eyJ1IjoiYWRpYmtoYW5kZXYiLCJhIjoiY2xnNWt4YW85MDRsaTNpcGQ5djFrdWhyYiJ9.T5M-84Av38RJSb1j1Bp6Iw"
        mapStyle="mapbox://styles/adibkhandev/clg6ih4pd009y01p0dup15qd7"
        onMove={(evt) => {

          setViewport({
            ...evt,
            latitude:viewport.latitude,
            longitude:viewport.longitude
          });
          console.log('hocche',evt)
        }}
       >
       <Marker 
       draggable 
        latitude={viewport.latitude || 23.7531959}
        longitude={viewport.longitude || 90.4374604 }
       onDragStart={onMarkerDragStart}
       onDragEnd={onDragEnd}
       onDrag={onMarkerDrag}
       >
     
       </Marker>

      </ReactMapGL>
      


      ):'hi'}
      
     <div className="nav-cont">
       
      <div className="nav">
        <div onClick={geoCode} className="search-btn">
          <img src="images/search-ash.png" alt=""/>
        </div>
        <input placeholder={!adress?"Search Location":''} value={adress || search} onChange={(e)=>setSearch(e.target.value)} className="location-search" type="text"/>
        <div onClick={changeAdress} className="target">
          <img src="images/target.png" alt=""/>
        </div>
      </div>
    </div>
     </div>
  );
}

export default GeoMap;