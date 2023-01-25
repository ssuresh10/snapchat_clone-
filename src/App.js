import React, { useEffect as UseEffect } from 'react';
import './App.css';
import WebCamCapture from './components/webcamCapture/webCamCapture';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Preview from './components/preview/Preview';
import Chats from './components/chat/Chats'
import ChatView from './components/chatview/ChatView'
import { 
  useDispatch as UseDispatch,
  useSelector as UseSelector 
} 
from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './components/login/Login';
import { auth } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';




function App() {
  const user = UseSelector(selectUser);
  const dispatch = UseDispatch();
  UseEffect(() => {
    onAuthStateChanged(auth,(authUser) =>{
        if(authUser) {
          dispatch(login({
            username:authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          }))
        }else {
              dispatch(logout())
        }
    })
  }, [])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />

        ) : (
            <>
            <img className='app__logo' 
            src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />
            <div className='app__body'>
             <div className='app__bodyBackground'>
             <Routes>
            <Route path='/chats/view' element={<ChatView />} />
            <Route path='/chats' element={<Chats />} />
              <Route path='/preview' element={<Preview />} />
              <Route exact  path='/' element={<WebCamCapture />} />
            </Routes>
              </div> 
            
        </div>
        </>
        )}
        </Router>
      </div>
      
        
  );
}

export default App;
