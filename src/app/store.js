import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import CameraReducer from '../features/cameraSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    camera: CameraReducer
  },
});
