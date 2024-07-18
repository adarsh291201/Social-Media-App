import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupIcon from '@mui/icons-material/Group';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css';
import firebase from 'firebase/compat/app';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    console.log("user trying to log out")
    localStorage.clear()
    auth.signOut().then(()=>{
      alert("signed out")
      navigate("/");
    })
  }
  const handleHome=()=>{
    navigate("/landingpage")
  }
  return (
    <div className='header'>
      <div className='header_left'>
        <div className='header_search'>
          <SearchIcon />
          <input type='text'
            placeholder='Search something'></input>
        </div>
      </div>
      <div className='header_middle'>
        <h1>Social Verse</h1>

      </div>
      <div className='header_right'>
        <div className='header_options'>
          <HomeIcon onClick={handleHome}fontSize='large' />
        </div>
        <div className='header_options'>
          <OndemandVideoIcon fontSize='large' />
        </div>
        <div className='header_options'>
          <GroupIcon fontSize='large' />
        </div>
        <div className='header_options'>
          <LogoutIcon fontSize='large' onClick={handleLogOut} />
        </div>
      </div>


    </div>
  )
}

export default Header
