import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import { auth, googleAuthProvider } from "../../firebase";
// import { useStateValue } from "../StateProvider";
import "./Signup.css";
import GoogleButton from "react-google-button";
import { useStateValue } from "../StateProvider";
import { db, storage, } from "../../firebase.js"
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  // const [{user},dispatch] =useStateValue();

  const [{ user }, dispatch] = useStateValue();

  const handleSignInWithGoogle = async () => {
    try {
      signInWithPopup(auth, googleAuthProvider).then((result) => {
        console.log(result.user);
        const photoURL = result.user.photoURL;
        const name = result.user.displayName
        localStorage.setItem("displayName", name)
        localStorage.setItem("photo", photoURL)
        localStorage.setItem("uid", result.user.uid)
        // dispatch({
        //   type: "SET_USER",
        //   user: {
        //     displayName: result.user.displayName,
        //     photoURL: result.user.photoURL
        //   }

        // });
        const docRef = setDoc(doc(db, "users", result.user.uid), {
          timestamp: serverTimestamp(),
          message: "message",
          username: localStorage.getItem('displayName'),
          photoURL: localStorage.getItem('photo'),
          likes: [],
          comments: [],
          image: ""
          
        });
        console.log(docRef)
        navigate('/landingpage');
      })
      // var credential =result.UserCredentialImpl;
      // const photoURL= `${result.user.photoURL}?acces_token=${credentail.accessToken}`
      // console.log(photoURL);
      // console.log(result.user.displayName)
    } catch (err) {
      console.error(err);
    }
    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     timestamp: serverTimestamp(),
    //     message: "message",
    //     username: localStorage.getItem('displayName'),
    //     photoURL: localStorage.getItem('photo'),
    //     likes: [],
    //     comments: [],
    //     image:""
    //   });
    //   console.log("Document written with Id:", docRef.id);
    // } catch (error) {
    //   console.error(error)
    // }

  }
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/landingpage");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="container">
      <div className="innerBox">
        <h1 className="heading">Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className="footer">
          <b className="error">{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>

            </span>
          </p>
          <div className="pop" style={{ display: "flex", justifyContent: 'center' }}><GoogleButton onClick={handleSignInWithGoogle} /></div>

        </div>
      </div>
    </div>
  );
}

export default Signup;