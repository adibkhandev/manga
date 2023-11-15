import {useState} from 'react'
import Reg from './Reg'
import Log from './Log'

const LogReg = () => {
	let [logreg,setLogreg]=useState(0)
    let [notifyLog,setNotifyLog] = useState(null)
	let [notifyReg,setNotifyReg] = useState(null)
	let func = ()=>{
		setLogreg(1)
	}
	let funcback = ()=>{
		setLogreg(0)
	}
	console.log(notifyLog)
	return (
	       <div className="viewer">
	        <div onAnimationEnd={()=>{
                 setNotifyReg(null)
                 setNotifyLog(null)
	         }} 
	         className={(notifyLog || notifyReg)?"notifier on":"notifier "}>
	       	   <div  className='notify-sec' >
	       	   	     <h1>
	       	   	      {notifyReg || notifyLog}
	       	   	     </h1>
	       	   	     	
	       	   </div>
	       	   
	        </div>
			<div id="logregpage" className={logreg===0?"login-reg-cont":"login-reg-cont-active"} >
			 <Reg setNotifyReg={setNotifyReg} binary={logreg} func={func} />
			 <Log setNotifyLog={setNotifyLog} binary={logreg} func={funcback} />
			 <img src="images/luffy.png" alt="" className={logreg===0?"luffy-1":"luffy-1-active"}/>
			 <img src="images/luffy.png" alt="" className={logreg===1?"luffy-2":"luffy-2-active"}/>
		    </div>
	       	
	       </div>


		
	)
}


  



export default LogReg