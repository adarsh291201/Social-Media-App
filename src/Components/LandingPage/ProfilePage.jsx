import React from 'react'
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
const ProfilePage = ()=> {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <form className='ProfileEdit'>
        <input type='text'
         username={localStorage.getItem('displayName')}
         label='Username'
         placeholder='username'
        
        ></input>
      </form>
    </div>
  )
}

export default ProfilePage
