import React from 'react'
import Sidebaroptions from './Sidebaroptions.jsx'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import MovieIcon from '@mui/icons-material/Movie';
import EventIcon from '@mui/icons-material/Event';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Sidebar.css'
import { useStateValue } from '../StateProvider.jsx';
import { Avatar } from '@mui/material';
const Sidebar = () => {
  const [{user},dispatch] = useStateValue();
  const handleProfile=()=>{
    console.log("I am profile")
    alert("I am profile")
  }
  return (
    <div className='sidebar'>
      {/* <Avatar style={{display:"flex", justifyContent:"center"}}/> */}
      <Sidebaroptions onClick={handleProfile}src='https://lh3.googleusercontent.com/a/ACg8ocKzhg0oDvoO5e59HMdUMx6shsh1BmqmaRj2FQkK2zjBWzCT2eg=s96-c' title={localStorage.getItem("displayName")}/>
      <Sidebaroptions Icon={Diversity3Icon} title="Friends"/>
      <Sidebaroptions Icon={GroupIcon} title="Group"/>
      <Sidebaroptions Icon={MovieIcon} title="Watch"/>
      <Sidebaroptions Icon={EventIcon } title="Events" />
      <Sidebaroptions Icon={ArrowDropDownIcon} title="See More"/>
      
      
    </div>
  )
}

export default Sidebar

