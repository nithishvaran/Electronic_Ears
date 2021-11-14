import React, { useState} from 'react'
import './App.css'
import Navbar from "./components/navbar/Navbar.js"
import Record from './components/recordVoice/Record.js'
function App() {
 
  const [Time,setTime] = useState(0)
  const [Timer, setTimer] = useState(0)
  const [active1,setActive1]=useState(null)
  const [show,setShow]=useState(false)
  
  const handleTime = (event) =>{
      event.preventDefault()
      setTime(event.target.value)
  }

  function connect1(TotalTime){
    setShow(true)
    var counter = 0;
        var endtime = TotalTime;
        var interval= setInterval((e) => {
                   counter+=1;
                    if(counter == endtime)
                   {    
                        clearInterval(interval);
                        setShow(false)
                   }
                   setTimer(prev => prev-=1)    
          },1000);
  }

  function connect2() {
    setActive1("MicOn")
  }

return (

<div>

<Navbar/>
<div className="comright">
</div>
<div>

<div class="container maincontentcontent">

<div class="">
<div class="container">
<div class="row">
<div className="col-sm">
<h1 className="scorenumber">{Timer}
</h1>
</div>
<div className="col-sm">
  {
      show?<h5 className="themic">🎙️...</h5>:<h5 className="themic">⏹</h5>
  }
</div>
<div class="col-sm">
</div>
</div>
</div>
<div>

{/* DOOR */} 

<div className="row">
<div className="col-sm">
<div className="p-5">
<div className="wrapper">
<div className="container-fluid">
            <div className="comdown">
            <input type="text" className="theBox" value={Time} onChange={handleTime}/>
            </div>
            <input type="submit" className="button-6" onClick={() => {
              setTimer(Time)
              connect1(Time)
              connect2()
            }} value="submit"></input>
</div>
<div id="left-door" className="door">
      <div className="shape"></div>
      <div className="shape"></div>
      <div id="left-knob" className="knob"></div>
</div>
<div id="right-door" className="door">
  <div className="shape"></div>
  <div className="shape"></div>
  <div id="right-knob" className="knob"></div>
</div>
</div>
</div>
</div>
</div>

{/* DOOR END*/} 

{active1 === "MicOn" && <Record  TotalTime={Time}/>}

</div>
</div>
</div>
</div>
</div>
  )
}

export default App