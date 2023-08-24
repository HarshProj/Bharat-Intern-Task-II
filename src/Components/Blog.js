import React, { useEffect, useRef, useState } from 'react'
import '../Css/Blog.css'
import { useDropzone } from "react-dropzone"
import { useNavigate } from 'react-router-dom'
export const Blog = () => {
  const[details,setDetails]=useState({picture:"",title:"",description:""
  })
  const inputRef=useRef(null);
  const history=useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const {picture,title,description}=details;
    console.log(picture,title,description);
    try {
      const response= await fetch("http://localhost:5000/api/post/createpost",{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,picture})
      })
      const json=await response.json();
      console.log(json,localStorage.getItem('token'))
      if(json.success){
        alert('Post Created successfully')
        history('/home')
      }
      else{
        alert("Invalid Credentials")
      }

    } catch (error) {
      console.log(error)
    }
  }
  const handlechange=(e)=>{
    setDetails({
      ...details,
      [e.target.name]:e.target.value,
      picture:files[0].preview
    })
    console.log(details);
    // {files!='' && setDetails({
    //   picture:files[0].preview})}}

  }
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
  const images = files.map((file) => (
    
    <div key={file.name}  className='drag-area'>
      
        <img src={file.preview} className='drag-area-img' />
      
    </div>
  ))
 

  const handledelete=()=>{
    console.log(files[0].path)
    files.pop();
    history('/createblog')
  }
  const handlefile=(e)=>{
    console.log(e.target.value,inputRef)
  }
  return (
    <div className='main-blog-cont'>
      <form className='blog-form' onSubmit={handlesubmit} onChange={(e)=>{e.preventDefault()}}>
        {/* <img src={details.picture} alt="" />*/}
        
        {images!=""? images:<div className="drag-area" {...getRootProps()} >
          <div className="icon">drag here</div>
          <input type="file" name="" id="" hidden ref={inputRef} onChange={handlefile} {...getInputProps()} />
          <span className="dragger">Drag & Drop</span>
          <span className="dragger">or <span className='hover-button'>Brows</span> </span>
          <span className="supports">JPG,PNG,JPEG</span>
        </div>}
        {images!="" && <div className='button-delete'>
          <button className="blog-delete-button" onClick={handledelete}>Delete</button>
          </div>}
        <label htmlFor="title">Title</label>
        <input onChange={handlechange} type="text" name="title" id="title" />
        <label htmlFor="description">Description</label>
        <input onChange={handlechange} type="text" name="description" id="description" />
        <button className='blog-submit-button' >Submit</button>
        
      </form>
    </div>
  )
}
