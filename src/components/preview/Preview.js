import React, { useEffect as UseEffect } from 'react'
import { useSelector as UseSelector } from 'react-redux';
import {resetCameraImage, selectCameraImage} from '../../features/cameraSlice'
import { useNavigate as UseNavigate } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'; 
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CreateIcon from '@material-ui/icons/Create'
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import {v4 as uuid} from 'uuid'
import { useDispatch as UseDispatch } from 'react-redux';
import "./Preview.css"
import { db, storage } from '../../firebase';
import { selectUser } from '../../features/appSlice';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from '@firebase/storage'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 


function Preview() {
  const cameraImage = UseSelector(selectCameraImage)
  const navigate = UseNavigate();
  const dispatch = UseDispatch();
  const user = UseSelector(selectUser)

  UseEffect(()=>{
    if(!cameraImage){
      navigate('/')
    }
  },[cameraImage, navigate])

  const closePreview = () =>{
    dispatch(resetCameraImage());
  }
  const sendPost =() =>{
    const id = uuid()
   const metadata = {
       contentType: 'image/jpeg'
   };
   const storageRef = ref(storage,`posts/${id}`)
   const uploadTask = uploadBytesResumable(storageRef, cameraImage,metadata);
   uploadTask.on('state_changed',null,(error)=>{
       console.log(error)
       },()=>{
           uploadString(storageRef, cameraImage, 'data_url')
           .then((snapshot) =>{
               getDownloadURL(storageRef).then((url) =>{
                   addDoc(collection(db,'posts') ,{
                       imageUrl: url,
                       username:user.username,
                       profilePic: user.profilePic,
                       read: false,
                       timestamp: serverTimestamp()
               })
               navigate('/chats', { replace: true })   
                   })
               }
           )
       }
   )
}
  return (
    <div className='preview'>
      <CloseIcon  onClick={closePreview} className="preview__close" />
      <div className='preview__toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt=''/>
      <div onClick={sendPost} className='preview__footer'>
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className="preview__sendIcon" />
      </div>
    </div>
  )
}

export default Preview