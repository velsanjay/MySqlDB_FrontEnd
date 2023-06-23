import React from 'react';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';


function NavBar() {
    const navigate = useNavigate()
    return (
        <div className="nav">
            <h1
            className='cur'
            onClick={()=>navigate('/')}
            >Employee Detail</h1>
            <Button variant='text' 
            onClick={()=>navigate('/new')}
            color='primary'>New Employee</Button>
        </div>
  )
}

export default NavBar