import { axiosWithAuth } from './axiosWithAuth';

export const deleteFriendRequest = (id) => {
    return axiosWithAuth().delete(`/friends/${id}`);
};