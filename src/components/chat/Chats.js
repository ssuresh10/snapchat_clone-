import { Avatar } from '@material-ui/core'
import { signOut } from '@firebase/auth'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import SearchIcon from '@material-ui/icons/Search'
import React, { useEffect as UseEffect, useState as UseState} from 'react'
import Chat from '../../components/chat/Chat'
import './Chats.css'
import {auth, db} from '../../firebase'
import { useDispatch as UseDispatch, useSelector  as UseSelector} from 'react-redux'
import { selectUser } from '../../features/appSlice'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { useNavigate as UseNavigate } from 'react-router-dom'
import { resetCameraImage } from '../../features/cameraSlice'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
function Chats() {
    const [posts, setPosts] = UseState([])
    const user = UseSelector(selectUser)
    const dispatch = UseDispatch()
    const navigate  = UseNavigate()

    UseEffect(()=>{
        onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot => setPosts(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data(),
                })))
            )
        )
    },[])

    // UseEffect(()=>{
    //     db.collection('posts').orderBy('timestamp', 'desc')
    //     .onSnapShot(snapshot =>setPosts(
    //         snapshot.doc.map(doc=>({
    //             id:doc.id,
    //             data:doc.data()
    //     }))), [])
    // })
    const takeSnap = () =>{
        dispatch(resetCameraImage())
         navigate("/")
    }
  return (
    <div className='chats'>
        <div className="chats__header">
            <Avatar className='chats__avatar' src={user.profilePic} onClick={()=> signOut(auth)}/>
            <div className='chats__search'>
            <SearchIcon className='chats__searchIcon'/>
            <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
    </div>
    <div className='chats__posts'>
        {posts.map(
            ({id, data:{profilePic, username, timestamp, imageUrl, read},
        }) =>(
            <Chat 
            key={id}
            id = {id}
            username={username}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
            profilePic={profilePic}/>
        ))}
    </div>    
    <RadioButtonCheckedIcon className="chats__takePicIcon" onClick={takeSnap} fontSize='large' />
    </div>
  )
}

export default Chats