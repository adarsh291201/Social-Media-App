import React, { useState } from 'react'
import './Sidebaroptions.css'
import { Avatar,Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from './Header.jsx'
const Sidebaroptions = ({ src, Icon, title }) => {
  const navigate= useNavigate();
  const [open, SetOpen]=useState(false);

  const  handleonClose =()=>{
    SetOpen(false);
  }
  const handleOpen = ()=>{
    navigate("/ProfilePage");
  }

  return (
    <>
    <Modal open={open} onClose={handleonClose}>
      <div className='ProfileEdit'>
        
      </div>
    </Modal>
    <div className='sidebarrow'>
      {src && <Avatar onClick={handleOpen} src={localStorage.getItem('photo')} />}
      {Icon && <Icon />}
      <p>{title}</p>
    </div>
    </>
  )
}

export default Sidebaroptions
