import { Avatar } from '@material-ui/core'
import StopRoundedIcon  from '@material-ui/icons/StopRounded'
import React from 'react'
import { useDispatch as UseDispatch } from 'react-redux'
import { useNavigate as UseNavigate } from 'react-router-dom'
import ReactTimeago from 'react-timeago'
import { selectImage } from '../../features/appSlice'
import { db } from '../../firebase'
import { doc, updateDoc } from '@firebase/firestore'
import './Chat.css'
function Chat({id, username, timestamp, read, imageUrl, profilePic}) {
    const dispatch = UseDispatch();
    const navigate = UseNavigate()
    // console.log(ReactTimeago(new timestamp.toDate()))
    // const open = () => {
    //     if(!read) {
    //         dispatch(selectImage(imageUrl));
    //         db.collection('posts').doc(id).set({
    //             read:true,
    //         },
    //         {
    //             merge:true
    //         }
    //         );

    //         navigate('/chats/view');
    //     }
    // }

    const open =()=>{
        if(!read) {
            dispatch(selectImage(imageUrl))
            updateDoc(doc(db,'posts',id),{
                read: true
            })
            navigate('/chats/view')
        }
    }

  return (
    <div onClick={open} className='chat'>
            <Avatar className='chat__avatar' src={profilePic} />
            <div class="chat__info">
                <h4>{username}</h4>
                <p>{!read && 'Tap to view -'}{" "}
                {/* {timestamp} */}
                {/* <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> */}
                </p>
            </div>
            {!read && <StopRoundedIcon className='chat__readIcon' />}
        </div>
  )
}

export default Chat