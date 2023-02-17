import {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history,setHistory] = useState([initial]);

  const transition =(newMode,replace = false)=>{
    //adds to history 
    if(mode !== initial || history.length !== 1 ){
      setHistory([...history,mode]);
    }
    setMode(newMode);
    // replaces history 
    if(replace){
      setHistory(history.slice(0, -1)); 
    }
    
  }

  const back =()=>{
  // goes back in history
    if(history.length >= 1  ){
      const temp = history.slice(-1)[0]
      setMode(temp)
      setHistory(history.slice(0, -1))
    }
    else{
      setHistory(initial)
      setMode(initial)
    }
      
  }

  return { mode,transition,back }
}

