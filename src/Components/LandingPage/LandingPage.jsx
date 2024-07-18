import { useState } from 'react'
import { BrowserRouter as Router , Routes,Route, BrowserRouter } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import Feed from './Feed.jsx'
function App() {
 
  return (
    
   <>
   <div className='app'>
    <Header/>
   </div>
   <div className='app_body'>
    <Sidebar/>
    <Feed/>
   </div>
   </>
    
  );
}

export default App;
