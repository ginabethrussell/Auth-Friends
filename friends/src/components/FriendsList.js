import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Card, CardImg, CardText, CardTitle, Button, ButtonGroup } from 'reactstrap';
import Person from '../person.png';
import { userContext } from '../contexts/userContext';
import { getFriendsRequest } from '../utils/api/getFriendsRequest';
import { deleteFriendRequest } from '../utils/api/deleteFriendRequest';

function FriendsList() {
    const {currentUser, currentUserFriends, setUserFriends } = useContext(userContext);
    const history = useHistory();

    useEffect(() => {
        getFriendsRequest()
        .then(res => {
            setUserFriends(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        deleteFriendRequest(id)
            .then(res => {
                setUserFriends(res.data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='friends-wrapper'>
            <h2> Welcome Back, {currentUser}</h2>
            <Button size='lg' color='primary' onClick={()=> history.push('/addfriend')}>Add a Friend</Button>
            <div className='friends-cards'>
          
           { currentUserFriends.length > 0? (
            currentUserFriends.map(friend => (
                <Card style={{borderRadius:'5px', border: '1px solid #a9a9a9'}}className='friend-card' key={friend.id}>
                    <CardTitle>Name: {friend.name}</CardTitle>
                    <CardImg style={{width:'50%', margin: '1.6rem auto'}} src={Person}/>
                    <CardText>Age: {friend.age}</CardText>
                    <CardText>Email: {friend.email}</CardText>
                    <ButtonGroup>
                        <Button color='success' size='lg' onClick={() => handleDelete(friend.id)}>Delete</Button>
                        <Button color='primary' size='lg'onClick={() => history.push(`/updatefriend${friend.id}`)}>Update</Button>
                    </ButtonGroup>
                </Card>
            ))
           ): (
            
            <div>
                <Spinner size='md'color="primary" />
                <span>Loading ...</span>
                <Spinner size='md' color="primary" />
            </div>
           )}
        </div>
    </div>
    )
}

export default FriendsList;
