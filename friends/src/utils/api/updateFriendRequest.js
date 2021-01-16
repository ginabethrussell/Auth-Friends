import { axiosWithAuth } from './axiosWithAuth';

export const updateFriendRequest = (id, updatedFriend) => {
    return axiosWithAuth().put(`/friends/${id}`, updatedFriend);
};