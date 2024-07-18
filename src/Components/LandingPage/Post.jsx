import React, { useEffect, useState } from 'react'
import './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db, } from "../../firebase";
import { reload } from 'firebase/auth';
const Post = ({ photoURL, image, username, timestamp, message,postid }) => {
  const [like, SetLike] = useState(false);
  const [alreadyLiked, SetAlreadyLiked] = useState(false);
  const[NumberOfLikes,SetNumberOfLikes]=useState(0);

  const checker = async () => {
    getDoc(doc(db, "posts",postid)).then((resp)=>{
      let updated=resp.data().likes;
      updated.forEach(element => {
        if(element.id===localStorage.getItem('uid')){
          SetAlreadyLiked(true);
        }
      });
      SetNumberOfLikes(resp.data().likes.length)
    });
  }  
    // const update=querySnapshot.likes;
    // update.forEach(element => {
    //   if(element.id===localStorage.getItem('id')){
    //     SetAlreadyLiked(false);
    //   }
    // });



    
    
    // querySnapshot.forEach((doc) => {
    //   console.log(typeof( doc.data().message));
    // })
    const relaoder =async () =>{
      getDoc(doc(db, "posts",postid)).then((resp)=>{
        SetNumberOfLikes(resp.data().likes.length)
      });
    }
    const handleLike = async () =>{
      if(alreadyLiked){
        SetAlreadyLiked(false);
        getDoc(doc(db, "posts",postid)).then((resp)=>{
          let updated=resp.data().likes;
          const nup = updated.filter((ele) =>{
            if(ele.id!==localStorage.getItem('uid')){
              return ele;
            }
          })
          setDoc(doc(db,'posts',postid),{
            ...resp.data(), likes : nup
          })
          relaoder();
        });
      }
      else{
        SetAlreadyLiked(true);
        getDoc(doc(db, "posts",postid)).then((resp)=>{
          let updated=resp.data().likes;
          // console.log((updated.length))
          updated.push({
            id : localStorage.getItem('uid'),
            name : localStorage.getItem('displayName')
          })
          setDoc(doc(db,'posts',postid),{
            ...resp.data(), likes : updated
          })
          relaoder();
          // console.log(NumberOfLikes)
        });
        
      }
      // window.location.reload(false);
    }
  useEffect(()=>{
   checker();
  },[])

  const handleChat= async()=>{
    getDoc(doc(db,"posts",postid)).then((res)=>{
      let updated= res.data().comments
      console.log(updated)
    })
  }

  return (
    <div className='post'>
      <div className='post_top'>
        <div className='post_topLeft'>
          <Avatar src={photoURL} />
          <div className='postInfo'>
            <h4>{username}</h4>
            <p>{timestamp} <PublicIcon /></p>
          </div>
        </div>
        <MoreHorizIcon />
      </div>

      <div className='post_middle'>
        <p>
          {message}
        </p>
        {image && <img src={image} />}
      </div>

      <div className='post_bottom'>
        <div className='post_bottomOptions'>
          {
            !alreadyLiked && (<><FavoriteBorderIcon onClick={handleLike} /> <p>{NumberOfLikes}</p> </> )
          }
          {
            alreadyLiked && (<><FavoriteBorderIcon sx={{color : 'red'}} onClick={handleLike} /> <p>{NumberOfLikes}</p> </> )
          }
        </div>
        <div className='post_bottomOptions'>
          <ChatBubbleOutlineIcon onClick={handleChat} /> <p>Comment</p>
        </div>
        <div className='post_bottomOptions'>
          <ShareIcon /> <p>Share</p>
        </div>

      </div>
    </div>



  )
}

export default Post
