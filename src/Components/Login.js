import React,{useState} from 'react'
import img1 from '../Images/user.png'
import '../Css/Register.css'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
    const [auth,setAuth]=useState({
        email:"",password:""
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

            const {email,password}=auth;
            const response=await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            })
            const json=await response.json();
            
            if(json.success){
                localStorage.setItem('token',json.auth)
                alert("Logged IN Sucessfully")
                history('/home')
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
        history("/register")
    }
  return (
    <div className='register-box'>
        <div className="register-main">
            <img src={img1} className='register-img' alt="" />
            <form className='register-form' onSubmit={handlesubmit}>
                <label htmlFor="email">Email:</label>
                <input onChange={handlechange} type="email" name="email" id="email" required />
                <label htmlFor="password">Password:</label>
                <input onChange={handlechange} minLength={5} type="password" required name="password" id="password" />
                <button type='submit'>Login</button>
                <p>OR</p>
                <button onClick={login}>Create account</button>
            </form>
        </div>
    </div>
  )
}
