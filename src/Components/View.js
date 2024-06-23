import React, { useEffect, useRef, useState } from 'react'
import '../Css/Blog.css'
import { useDropzone } from "react-dropzone"
import { useNavigate, useParams } from 'react-router-dom'

export const View = () => {
    const[details,setDetails]=useState({picture:"",title:"",description:""
    })
    const navigation=useNavigate();
    const [url,setUrl]=useState();
    const [pic,setPic]=useState("");
    const param=useParams()
    // const [pic,setPic]=useState();
    const inputRef=useRef(null);
    const history=useNavigate();
  
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigation('/')
  }
  getpost();
    },[])
    
    const getpost=async()=>{
        const response=await fetch(`http://localhost:5000/api/post/getpost/${param.id}`,{
            method:"GET",
            headers:{
              'auth-token': localStorage.getItem('token')
            }
      
          })
          const json=await response.json();
          const {title,description,picture}=json.data;
          setDetails({
        title,description,picture
    });
        console.log(json)
    }
    const handlechange=(e)=>{
        setDetails({
          ...details,
          [e.target.name]:e.target.value
        })
    }
  return (
    <div className='main-blog-cont'>
        <form className='blog-form'  onChange={(e)=>{e.preventDefault()}}>
          {/* <img src={details.picture} alt="" />*/}
          
          <div className="drag-area" >
            <img src={details.picture} className='viewblog-img' alt="" />
          </div>
         <h1 className="title-div">{details.title}</h1>
         <div className="desc-div">{details.description}</div>
          
        </form>
      </div>
  )
}
