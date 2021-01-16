import axios from 'axios';
import { axiosWithAuth } from './axiosWithAuth';

export const getFriendsRequest = () => {
    return axiosWithAuth().get('/friends');
}