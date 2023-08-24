import React from 'react'
import { useNavigate } from 'react-router-dom';
import img from'../Images/diggity-marketing-SB0WARG16HI-unsplash.jpg'
export const Blogs = (props) => {
  const navigate=useNavigate();
  const {name,description,title,picture}=props.element;
  const handleclick=()=>{
    navigate('/createblog')
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
