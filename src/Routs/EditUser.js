import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { url } from '../App'
import { Button, TextField } from '@mui/material'
import { PacmanLoader } from 'react-spinners';
import { toast } from 'react-toastify'

function EditUser() {
    let {id} = useParams()
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [role, setRole] = useState(null)
    const [phoneNo, setPhoneNo] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    let [data, setData] = useState([])
  
    const handleSubmit = async (e) =>{
      e.preventDefault()
      setLoading(true)
      try {
        let payload = {name, email, role, phoneNo}
        await axios.patch(`${url}/update/${id}`, payload)
        toast.success(`${name} Detail Edited Successfully!!!`)
        navigate('/') 
      } catch (error) {
        console.log(error)
        toast.error("Employee Detail Edited Failed!!!")
      }
      setLoading(false)
    }

    useEffect(()=>{
        const fetchData = async() =>{
          setLoading(true)  
          try {
                let res = await axios.get(`${url}/get/${id}`)
                setData(res.data.data)
                setName(res.data.data[0].name)
                setRole(res.data.data[0].role)
                setEmail(res.data.data[0].email)
                setPhoneNo(res.data.data[0].phoneNo)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetchData()
    },[])
  return (
    <div>
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
        <div>
          {data.length !=0 ?(
            <form className='form' onSubmit={handleSubmit}>    
        <h1>Edit Detail {data[0].name}</h1>
      <TextField
      required
      focused
      value={name}
      onChange={(e)=>setName(e.target.value)}
      id="filled-basic" label="Name" variant="outlined" />
      <TextField
      required
      focused
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      id="filled-basic" label="Email" variant="outlined" />
      <TextField
      required
      focused
      value={role}
      onChange={(e)=>setRole(e.target.value)}
      id="filled-basic" label="Role" variant="outlined" />
      <TextField
      required
      focused
      value={phoneNo}
      onChange={(e)=>setPhoneNo(e.target.value)}
      type='number'
      id="filled-basic" label="Phone Number" variant="outlined" />
      <div className='button'>
      <Button variant='contained' 
      onClick={()=>navigate('/')}
      color='error'>Go Back</Button>
      <Button variant='contained' type='submit' color='success'>Update Detail</Button>
      </div>
      </form>
       ):(
        <h3>User Not Found!!!</h3>
      )}
</div>
)}
    </div>
  )
}

export default EditUser