import React, {
  useCallback as UseCallback,
  useRef as UseRef
} from 'react';
import WebCam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch as UseDispatch } from 'react-redux';
import { setCameraImage } from '../../features/cameraSlice';
import { useNavigate as UseNavigate } from 'react-router-dom'
import './WebCamCapture.css'
const videoConstraints = {
    width:250,
    height:400,
    facingMode: 'user'
}
function webCamCapture() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY)
    const webcamRef = UseRef(null);
    // const [image, setImage]  = UseState(null)
    const dispatch = UseDispatch();
    const history = UseNavigate();
    const capture = UseCallback(()=>{
    const imageSrc = webcamRef.current.getScreenshot();
    // setImage(imageSrc)
    dispatch(setCameraImage(imageSrc))
      history('/preview')
    }, {webcamRef})
      return (
        <div className='webCamCapture'> 
        <WebCam 
            audio={false}
            height= {videoConstraints.height} 
            ref={webcamRef} 
            screenshotFormat="image/jpeg" 
            width={videoConstraints.width} 
            videoConstraints={videoConstraints} />

        <RadioButtonUncheckedIcon className='webCamCapture__button'
         onClick={capture}  fontSize="large" /> 
        </div>   
      )
    } 
    export default webCamCapture