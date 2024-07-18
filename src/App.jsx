import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";

import { auth } from "./firebase.js";

import "./App.css";
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import { useStateValue } from "./Components/StateProvider.jsx";
import ProfilePage from './Components/LandingPage/ProfilePage.jsx'
function App() {
  
  const [userName, setUserName] = useState("");
  const [state, dispatch] = useStateValue();

  console.log(state);
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (state.user) {
        setUserName(state.user.displayName);
       } 
      //  else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={< Signup/>} />
          <Route path="/landingpage" element={< LandingPage/>} />
          <Route path="/ProfilePage" element={< ProfilePage/>} />
          
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/" element={<Home name={userName} />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;