import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

function Update() {
  const [book, setBook] = useState({
    title:"",
    descri:"",
    price:null,
    cover:"",
  })

  const navigate = useNavigate()

  const location = useLocation()

  console.log(location.pathname.split("/")[2])

  const id = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:3333/update/" + id, book)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(book);

  return (
    <div className='form'>
      <h1>Update The Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="desc" onChange={handleChange} name="descri" />
      <input type="number" placeholder="price" onChange={handleChange} name="price" />
      <input type="text" placeholder="cover" onChange={handleChange} name="cover" />

      <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
