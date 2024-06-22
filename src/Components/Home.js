import React, { useEffect, useState,useContext } from 'react'
import img1 from '../Images/pexels-simon-berger-1323550.jpg'
import '../Css/Home.css'
import { Blogs } from './Blogs'
// import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/Namehandle'
export const Home = () => {
  // const { setModalOpen } = useContext(LoginContext)
  const navigation=useNavigate();
  const [notes,setNotes]=useState([])
  const [name,setName]=useState()
  const getnotes=async ()=>{
    const response=await fetch("http://localhost:5000/api/post/getpost",{
      method:"GET",
      headers:{
        'auth-token': localStorage.getItem('token')
      }

    })
    const json=await response.json();
    setNotes(json);
  }
  const getuser=async ()=>{
    const response=await fetch("http://localhost:5000/api/auth/getuser",{
      method:"GET",
      headers:{
        'auth-token': localStorage.getItem('token')
      }

    })
    const json=await response.json();
    
    setName(json);
  }
  console.log(notes);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      
      getnotes();
      getuser();
}
  else{
    navigation('/')
  }
  },[])

  return (
    <div className='home-box'>
      <div className="createblog-box"><button onClick={()=>{navigation('/createblog')}} className='create-button'>create Blog</button></div>
      {localStorage.getItem('token')? <div className="logout"><button className="create-button logout" onClick={() => {
                            localStorage.removeItem('token') ;localStorage.removeItem('name')
                            navigation('/')
                        }}>Log Out</button></div>:""}
        <div className="home-img-box">
            <h2 className='bl'>Upload and Explore Blogs</h2>
            <img src={img1} alt="" />
        </div>
        <div className="home-blog">
            {notes.map((element)=>{
              return(<Blogs element={element} name={name}/>)
            })}
        </div>
    </div>
  )
}
