import React, { useState } from 'react'
import './index.css'
import { getDatabase, ref, set, push } from "firebase/database";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const App = () => {
 /* let URL = "https://jsonplaceholder.typicode.com/users";
  let [user , setUser] = useState([])

  useEffect(()=>{
      let data =async ()=>{
        let res = await axios.get(URL)
        setUser(res.data)
      }
      data()
  },[])
  <section id='api'>
  <div className='container'>
    <div className='content_wrapper'>
      {user &&
        user.map((item,index)=>(
            <div key={index} className='content'>
                <label>{item.email}</label>
                <h4>{item.id}</h4>
                <h3>{item.name}</h3>
                <h4>{item.username}</h4>
                <p>{item.website}</p>
            </div>
        ))
      }
    </div>
    <h1>hello</h1>
  </div>
</section>*/

let [ form , setForm] = useState({
  name: "",
  email: "",
  password : "",
  conpass : ""
})

let formhendle = (e)=>{
  let {name , value} = e.target;
  setForm({...form,[name]:value})
}

const db = getDatabase();
let [erres , seErres] = useState({})
let btn = document.querySelector(".btn")
let formbtn = (e)=>{
  e.preventDefault()
  seErres(validation(form))
  set(push(ref(db,"validatedata")),{
      data: form,
  })
}

function validation (form){
      erres = {}

        let emailPerttan = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

        let passwordPerttan = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

    if(form.name == ""){
      erres.name = "Name is Required!"
    }
    else{
      erres.name = " "
    }

    if(form.email == ""){
      erres.email = "Email is Required!"
    }
    else{
      if( emailPerttan.test(form.email)){
        erres.email = " "
      }
      else{
        erres.email = "Inter validate Email"
      }
    }

    if(form.password == ""){
      erres.password = "Password is Required!"
    }
    else{
      if(passwordPerttan.test(form.password)){
        erres.password = " "
      }
      else{
        erres.password = "Strong Password"
      }
    }
    if(form.conpass == ""){
      erres.conpass = "Confirm Password"
    }
    else{
      if( form.conpass == form.password){
        erres.conpass = " "
      }
      else{
        erres.conpass = "Don't match"
      }
    }

    return erres;
}

      //check type password
  let [cheakTypePass , setCheckTypePass] = useState(false)
  let [cheakTypeConPass , setCheckTypeConPass] = useState(false)

  return (
    <section id='form'>
      <div className='container'>
        <form className='form_box'>
          <h2 className='form_head'>login form</h2>
          <div className='input_box'>
            <input className='inputs' name ="name" type='text' placeholder='name' onChange={formhendle}/>
 
            {erres.name && <p className='err'>{erres.name}</p>}
          </div>
          <div className='input_box'>
            <input className='inputs' name ="email" type='email' placeholder='email' onChange={formhendle}/>
            {erres.email && <p className='err'>{erres.email}</p>}
          </div>
          <div className='input_box'>
            <input className='inputs' name ="password" type={cheakTypePass ?"password":"text"} placeholder='password' onChange={formhendle}/>
            {
              cheakTypePass
              ?
              <FaEyeSlash className='open_eye' onClick={()=> setCheckTypePass(!cheakTypePass)}/>
              :
              <FaEye className='open_eye' onClick={()=> setCheckTypePass(!cheakTypePass)}/>
            }
            {erres.password && <p className='err'>{erres.password}</p>}
          </div>
          <div className='input_box'>
            <input className='inputs' name ="conpass" type={cheakTypeConPass ? "password" :"text"} placeholder='confrim password' onChange={formhendle}/>
            {
              cheakTypeConPass
              ?
              <FaEyeSlash className='open_eye' onClick={()=> setCheckTypeConPass(!cheakTypeConPass)}/>
              :
              <FaEye className='open_eye' onClick={()=> setCheckTypeConPass(!cheakTypeConPass)}/>
            }
            {erres.conpass && <p className='err'>{erres.conpass}</p>}
          </div>
          <div className='form_btn'>
            <button className='btn' onClick={formbtn}>login</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default App