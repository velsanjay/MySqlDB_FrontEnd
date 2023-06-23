import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function Card() {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) 

  useEffect(()=>{
    const fetchData = async() =>{
      setLoading(true)
      try {
        let res = await axios.get(url)
        console.log(res)
        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  },[])

  const deleteUser = async(id) =>{
    setLoading(true)
    try {
      let res = await axios.delete(`${url}/delete/${id}`)
      toast.success("Employee Delect Successfully!!!")
    let deleteData = data.filter((e)=>e.id != id)
    setData(deleteData)
    } catch (error) {
      console.log(error)
      toast.error("Employee Removed Failed!!!")
    }
    setLoading(false)
  }

  return (
    <div >
      {loading ? (
        <div className='load'>
         <PacmanLoader
         color="white"
         loading={loading}
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader"
       />
       </div>
      ):(
    <div className='cardtop'>
      <NavBar/>
    {data.length !==0 ? (
        data.map((data,index)=>(
          <div
          className='card'
          key ={index}
          >
            <h2><b>Name : </b>{data.name}</h2>
            <p><b>Email : </b>{data.email}</p>
            <p><b>Role : </b>{data.role}</p>
            <p><b>Phone Number : </b>{data.phoneNo}</p>
          <div className='button'>
            <Button
            startIcon={<EditIcon />}
            variant="contained"
            color='primary'
            onClick={()=>navigate(`/edit/${data.id}`)}
            >Edit</Button>  
            <Button 
            onClick={()=>deleteUser(data.id)} 
            startIcon={<DeleteIcon />}
            variant="contained" color="error">Delete</Button>  
          </div>
          </div>
        ))
      
    ) : (
      <p>No Data Found !!!</p>
    )}  
    </div>
    )}
    </div>
  )
}

export default Card