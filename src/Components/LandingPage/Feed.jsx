import React from 'react'
import './Feed.css';
import Messagesender from './Messagesender.jsx'
import Post from './Post.jsx'
import { useState, useEffect } from 'react';
import { db } from '../../firebase'
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    // getDocs(collection(db, "posts")).then(querySnapshot=>{
    //     setPosts(querySnapshot.map(doc=>({
    //       id:doc.id,
    // //               data:doc.data(),
    //     })))
    //   });
    // },[])
    //       db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot=>{
    //           setPosts(snapshot.docs.map(doc=>({
    //               id:doc.id,
    //               data:doc.data(),
    //           })))
    //       })
    //  
    //     const querySnapshot =   getDocs(collection(db, "users"));
    //    querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
    const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
      setPosts (snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
  }, []);
  // getDocs(collection(db, "posts")).then(querySnapshot=>{
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data().username}`);
  //   });
  // })
  console.log(posts);
  return (
    <div className='feed'>
      <Messagesender />
      {
        posts.map(post => {
          return <Post postid={post.id} photoURL={localStorage.getItem('photo')} image={post.data.image} username={post.data.username} timestamp="timestamp" message={post.data.message} />
        })
      }
      {/* <Post photoURL="" image="https://i.pinimg.com/originals/1d/17/93/1d17936a35e0d22d2131f4c17b0da4f9.jpg" username="User1" timestamp="11:11 Am" message="hi social verse" /> */}
      <Post />
    </div>
  )
}

export default Feed
