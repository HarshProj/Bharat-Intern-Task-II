import React, { useState } from 'react'
import img1 from '../Images/user.png'
import '../Css/Register.css'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const [auth,setAuth]=useState({
        name:"",email:"",password:""
    })
    const history=useNavigate();
    console.log(auth);
    const handlechange=(event)=>{
        setAuth({
                ...auth,
                [event.target.name]:event.target.value}
            

        )
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{

            const {name,email,password}=auth;
            const response=await fetch("http://localhost:5000/api/auth/createUser",{
                method:"POST",
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify({name,email,password})
            })
            const json=await response.json();
            console.log(json);
            if(json.success){
                localStorage.setItem('token',json.auth)
                alert("Account Created Sucessfully")
                history('/')
            }
            else{
                
                alert("Invalid Credentials")
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const login=()=>{
        history("/")
    }
  return (
    <div className='register-box'>
        <div className="register-main">
            <img src={img1} className='register-img' alt="" />
            <form className='register-form' onSubmit={handlesubmit}>
                <label htmlFor="name">Name:</label>
                <input  onChange={handlechange} minLength={3} type="text" name="name" required id="name" value={auth.name} />
                <label htmlFor="email">Email:</label>
                <input onChange={handlechange} type="email" name="email" id="email" required value={auth.email}/>
                <label htmlFor="password">Password:</label>
                <input onChange={handlechange} minLength={5} type="text" required name="password" id="password" value={auth.password}/>
                <button type='submit'>Create account</button>
                <p>OR</p>
                <button onClick={login}>Login</button>
            </form>
        </div>
    </div>
  )
}
