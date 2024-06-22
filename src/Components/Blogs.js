import React from 'react'
import { useNavigate } from 'react-router-dom';
import img from'../Images/diggity-marketing-SB0WARG16HI-unsplash.jpg'
export const Blogs = (props) => {
  const navigate=useNavigate();
  const {name,description,title,picture,_id}=props.element;
  const handleclick=()=>{
    console.log(props)
    if(props.name===name){
      navigate(`/updatepost/${_id}`);
    }
  }
  
  return (
    <div className='main-blog-box' onClick={handleclick} key={name}>
      <img src={picture==''?img:picture} alt="load" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{name}</p>
    </div>
  )
}
