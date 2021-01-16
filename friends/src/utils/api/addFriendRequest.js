import { axiosWithAuth } from './axiosWithAuth';

export const addFriendRequest = (newFriend) => {
    return axiosWithAuth().post('/friends', newFriend);
};