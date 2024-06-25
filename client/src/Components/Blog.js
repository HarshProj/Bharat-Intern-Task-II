import React, { useEffect, useRef, useState } from 'react'
import '../Css/Blog.css'
import { useDropzone } from "react-dropzone"
import { useNavigate } from 'react-router-dom'

export const Blog = () => {
  const[details,setDetails]=useState({picture:"",title:"",description:""
  })
  const navigation=useNavigate();
  const [url,setUrl]=useState();
  const [pic,setPic]=useState("");
  // const [pic,setPic]=useState();
  const inputRef=useRef(null);
  const history=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigation('/createblog');
}
  else{
    navigation('/')
  }
  },[])
  

  const handlesubmit=async(e)=>{
    e.preventDefault();
    // // setPic(files[0]);
    console.log(pic);
    const data = await new FormData()
    await data.append("file" , pic)
    data.append("upload_preset" , "e-comm")
    data.append("cloud_name" , "dnjtwhe9o")
    const val=await fetch("https://api.cloudinary.com/v1_1/dnjtwhe9o/image/upload",{
      method: "post",
      body: data
    })
    if(!val){
      console.log("err")
    }
    else{
      setUrl(val.url)
      console.log(val.url)
    }
    // .then(res => (res.json()))
    // .then(data => )
    // .catch(err => )

    let {picture,title,description}=details;
    picture=url;
    console.log(picture,title,description);
    try {
      const response= await fetch("/api/post/createpost",{
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
      [e.target.name]:e.target.value
    })

    // console.log(details);
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
      setPic(acceptedFiles[0]);
    },
  })
  const images = files.map((file) => (
    
    <div key={file.name}  className='drag-area'>
      
        <img src={file.preview} className='drag-area-img' />
      
    </div>
  ))
  const loadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  const handledelete=(e)=>{
    console.log(files[0].path)
    files.pop();
    history('/createblog')
  }
  const handlefile=(e)=>{
    console.log(e.target.value,inputRef)
    setUrl(e.target.files[0])
    console.log(url);
  }
  return (
    <div className='main-blog-cont'>
      <form className='blog-form' onSubmit={handlesubmit} onChange={(e)=>{e.preventDefault()}}>
        {/* <img src={details.picture} alt="" />*/}
        
        {images!=""? images:<div className="drag-area" {...getRootProps()} >
          <div className="icon">drag here</div>
          <input type="file" name="" id="" hidden ref={inputRef} {...getInputProps()} />
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
