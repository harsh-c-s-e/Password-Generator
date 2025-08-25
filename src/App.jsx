import { useEffect, useState , useCallback,useRef } from 'react'
import './App.css'

function App() {

  let [password, setPassword] = useState("");
  let [length, setLength] = useState(12);
  let [includeNumbers, setIncludeNumbers] = useState(false);
  let [includeSymbols, setIncludeSymbols] = useState(false);
  let passwordRef =useRef(null);

  let generatePassword=useCallback(()=>{
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num="0123456789";
    let symbols="!@#$%^&*()_+";
    if(includeNumbers){
      str+=num;
    }
    if(includeSymbols){
      str+=symbols;
    }
    let pass="";
    for(let i=0;i<length;i++){
      let ind=Math.floor(Math.random()*str.length);
      pass+=str[ind];
    }
    setPassword(pass);
  },[length,includeNumbers,includeSymbols,setPassword])

  useEffect(()=>{
    generatePassword();
  },[length,includeNumbers,includeSymbols])

  let copyPassword=()=>{
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className='flex justify-center w-full h-screen '>
      <div className='w-1/2 h-32 bg-gray-600 text-xl flex flex-col justify-center items-center p-8 mt-20 rounded-lg'>
        <div className='flex justify-center items-center mb-4 '>
            <input value={password} ref={passwordRef} readOnly className='bg-yellow-50 text-black w-104 px-3 py-1 rounded-l-full focus:outline-none'></input> 
            <button onClick={copyPassword} className='bg-blue-600 hover:bg-sky-500 px-3 py-1 rounded-r-full '>copy</button>
        </div>
        <div>
            <input type="range" min="8" max="30" value={length} onChange={(e)=>{setLength(e.target.value)}} className=""></input>
            <label>{length}Length</label>
            &nbsp;&nbsp;
            <input type="checkbox" id="num" onChange={()=> {setIncludeNumbers((prev)=>!prev)}} />
            <label htmlFor='num'>Numbers</label>
            &nbsp;&nbsp;
            <input type="checkbox" id="char" onChange={()=> {setIncludeSymbols((prev)=>!prev)}} />
            <label htmlFor='char' >Symbols</label>
        </div>
      </div>
    </div>
  )
}

export default App
