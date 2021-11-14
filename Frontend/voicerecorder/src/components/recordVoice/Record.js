import React, { useState, useEffect } from 'react'
import './Record.css';
import Pie from "../pieChart/Pie.js"

function Record({TotalTime}) {

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

var counter = 0;
var i=0;
let Listitems = []

const [display,setdisplay] = useState(null)
const [percentage,setPercentage] = useState(0)
const [show,setShow] = useState(true)

var endtime=(parseInt(TotalTime)+1);
var transcript = " "

useEffect(() => {
  handlenote();
  handleListen(true);
},[])

const handlenote = () =>
{
  var interval= setInterval((e) => {
             counter+=1;
             if(counter==endtime){  
               clearInterval(interval);
               setShow(false)
               calculatePercentage(Listitems)
             }else if(counter%10==0){
               handleSubmit();
            }
  },1000);
} 

const handleListen = (isListening) => {
    if (isListening) {
      try{
        mic.start()
        mic.onend = () => {
          console.log('continue..')
          mic.start()
      }
    }catch(e){
        console.log(e)
    }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Transcript is Reseted')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }
    mic.onresult = event => {
         transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('') 
        console.log(transcript)
        setdisplay(transcript)
        mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

const resetListening = () => {
  handleListen(true)
}

const handleSubmit = () =>{
    const url="http://localhost:8000/scoreJson";
    const bodyData=JSON.stringify([transcript])
    handleListen(false)
    const reqOpt ={method:"POST",headers:{"Content-type":"application/json"},body:bodyData};
    fetch(url,reqOpt)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      Listitems[i] = json;
      i++;
    }
    )
  setTimeout(resetListening,2000)
}

const calculatePercentage = (List)=>{
  var arr=List;
  var count ={};
  console.log(List)
  for(var i=0;i<arr.length;i++){
    var num = arr[i]
    count[num] = count[num] ? count[num] + 1:1;
   }
   var Result = count['Not Distracted']
   var final = TotalTime/10;
   setTimeout(setPercentage((parseInt(Result)/final)*100),2000) 
}

return(
     <div className="container">
            {
              show?<p class="speech">{display}</p> : null
            }
            {percentage && <Pie n={percentage} d={100-parseInt(percentage)}/>}
     </div> 
 )    
}

export default Record