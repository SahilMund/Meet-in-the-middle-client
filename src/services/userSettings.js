import axios from '../axios/instance.js';
import endPoints from './endpoints.js';
export const getUserData = () => axios.get(endPoints.UPLOAD_AVATAR);