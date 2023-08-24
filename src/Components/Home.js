import React, { useEffect, useState } from 'react'
import img1 from '../Images/pexels-simon-berger-1323550.jpg'
import '../Css/Home.css'
import { Blogs } from './Blogs'
import { useNavigate } from 'react-router-dom'
export const Home = () => {
  const navigation=useNavigate();
  const [notes,setNotes]=useState([])
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
  console.log(notes);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getnotes();
}
  else{
    navigation('/login')
  }
  },[])

  return (
    <div className='home-box'>
      <div className="createblog-box"><button onClick={()=>{navigation('/createblog')}} className='create-button'>create Blog</button></div>
        <div className="home-img-box">
            <img src={img1} alt="" />
        </div>
        <div className="home-blog">
            {notes.map((element)=>{
              return(<Blogs element={element}/>)
            })}
        </div>
    </div>
  )
}
