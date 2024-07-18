import React, { useState } from 'react'
import { Avatar, IconButton, Modal } from '@mui/material'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './Messagesender.css';
import CloseIcon from '@mui/icons-material/Close';
import { lightGreen } from '@mui/material/colors';
import { addDoc, collection, documentId, serverTimestamp } from 'firebase/firestore';
import { DoorBack } from '@mui/icons-material';
import { useStateValue } from '../StateProvider';
import { db, storage } from "../../firebase";
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
const Messagesender = () => {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);


  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const handleonClose = () => {
    setOpen(false);
  }
  const handleonOpen = () => {
    setOpen(true);
  }

  const uploadFilewithClick = () => {
    document.getElementById("imageFile").click();
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    console.log(image);

  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (image === "") {
      // db.collection("posts").add({
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   message: message,
      //   username: user.displayName,
      //   photoURL: user.photoURL
      // })
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          timestamp: serverTimestamp(),
          message: message,
          username: localStorage.getItem('displayName'),
          photoURL: localStorage.getItem('photo'),
          likes: [],
          comments: [],
          image: ""
        });
        console.log("Document written with Id:", docRef.id);
      } catch (error) {
        console.error(error)
      }
    }
    else {
      const uploadTask = uploadBytes(ref(storage, `images/${image.name}`), image);
      const url = await getDownloadURL(ref(storage, `images/${image.name}`))
      // console.log(url);
      const user = await addDoc(collection(db, 'posts'), {
        timestamp: serverTimestamp(),
        message: message,
        image: url,
        likes: [],
        comments: [],
        user : {
          id : localStorage.getItem('uid'),
          username: localStorage.getItem('displayName'),
          photoURL: localStorage.getItem('photo'),
        }
      });
      // console.log(user);

    }
    handleonClose();
    setMessage("");
    setImage("");
    setProgress(0);

  }
  // const [image, setImage]=useState("");
  // const handleChange= (e)=>{
  //    if(e.target.files[0]){
  //     setImage(e.target.files[0]);
  //    }
  // }

  // const [message,setMessage]= useState('hi ')
  // const handleUpload= (e)=>{
  //    e.preventDefault();
  //    if(image===""){

  //    }
  // }

  return (
    <>
      <Modal open={open} onClose={handleonClose}>
        <div className='modal_pop'>
          <form>
            <div className='modalHeading'>
              <h3>Create Post</h3>
              <IconButton onClick={handleonClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='modalHeader_top'>
              <Avatar src={localStorage.getItem('photo')} />
              {/* console.log(user.photoURL)
            console.log(user.displayName) */}
              <h5>{localStorage.getItem("displayName")}</h5>
            </div>
            <div className='modalBody'>
              <textarea rows="5" placeholder=" It's  Free  to think and write?" onChange={e => setMessage(e.target.value)}>{message}</textarea>
            </div>
            <div className='ModalFooter'>
              <div className='ModalFooterLeft'>
                <h4>Add to your post</h4>
              </div>
              <div className='ModalFooterRight'>
                <IconButton onClick={uploadFilewithClick}>
                  <PhotoLibraryIcon fontSize='large' style={{ color: "lightGreen" }} />
                </IconButton>
                <input type='file' id='imageFile' onChange={handleChange} style={{ display: "none" }} />
                <IconButton>
                  <VideoCallIcon fontSize='large' style={{ color: "red" }} />
                </IconButton>
                <IconButton>
                  <EmojiEmotionsIcon fontSize='large' style={{ color: "#fbb100" }} />
                </IconButton>
              </div>
            </div>
            {image !== "" && <h2 style={{
              "fontSize": "15px",
              "marginBottom": "20px",
              "color": "green"
            }}>Image is added and will be displayed after clicking on post button</h2>}

            {
              progress != "" && <progress value={progress} max="100" style={{ "width": "100%", "marginBottom": "20px" }} />
            }
            <input type='submit' onClick={handleUpload} className='post_submit' value="Post" />
          </form>
        </div>
      </Modal>
      <div className='messagesender'>
        <div className='messagesender_top'>
          <Avatar src={localStorage.getItem('photo')} />

          <form>
            <input type='text' placeholder="What's on your mind " onClick={handleonOpen}></input>

          </form>

        </div>
        <div className='messagesender_buttom'>
          <div className='messangerOptions'>
            <VideoCallIcon style={{ color: "red" }} fontSize='large' />
            <p>Live Video</p>

          </div>
          <div className='messangerOptions'>
            <PhotoLibraryIcon style={{ color: "lightgreen" }} fontSize='large' />
            <p>Photo/Video</p>

          </div>
          <div className='messangerOptions'>
            <EmojiEmotionsIcon style={{ color: "#fbb100" }} fontSize='large' />
            <p>Feeling/Activity</p>

          </div>
        </div>

      </div>
    </>
  )
}

export default Messagesender
