import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { url } from '../App'
import { useNavigate } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners';
import { toast } from 'react-toastify'

function NewUser() {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [role, setRole] = useState(null)
  const [phoneNo, setPhoneNo] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      let payload = {name, email, role, phoneNo}
      await axios.post(`${url}/new`, payload)
      toast.success("Employee Created Successfully!!!")
      navigate('/') 
    } catch (error) {
      toast.error("Employee Created Failed!!!")
      console.log(error)
    }
    setLoading(false)
  }

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
      <form className='form' onSubmit={handleSubmit}>
        <h1>Add New Employee</h1>
      <TextField
      required
      onChange={(e)=>setName(e.target.value)}
      id="filled-basic" label="Name" variant="filled" />
      <TextField
      required
      onChange={(e)=>setEmail(e.target.value)}
      id="filled-basic" label="Email" variant="filled" />
      <TextField
      required
      onChange={(e)=>setRole(e.target.value)}
      id="filled-basic" label="Role" variant="filled" />
      <TextField
      required
      onChange={(e)=>setPhoneNo(e.target.value)}
      type='number'
      id="filled-basic" label="Phone Number" variant="filled" />
      <div className='button'>
      <Button variant='contained' 
      onClick={()=>navigate('/')}
      color='error'>Go Back</Button>
      <Button variant='contained' type='submit' color='success'>Add New Employee</Button>
      </div>
      </form>
      )}
    </div>
  )
}

export default NewUser