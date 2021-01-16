import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Spinner } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Man from '../man.png'
import Woman from '../woman.png';
import Person from '../person.png';

function FriendsList() {
    const [friends, setFriends] = useState([]);
    console.log(friends);
    useEffect(() => {
        axiosWithAuth().get('http://localhost:5000/api/friends')
        .then(res => {
            console.log(res);
            setFriends(res.data);
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <div className='friends-wrapper'>
            <h2> Welcome Back User!</h2>
            <div className='friends-cards'>
          
           { friends.length > 0? (
            friends.map(friend => (
                <Card style={{borderRadius:'5px', border: '1px solid #a9a9a9'}}className='friend-card' key={friend.id}>
                    <CardTitle>Name: {friend.name}</CardTitle>
                    <CardImg style={{width:'50%', margin: '1.6rem auto'}} src={Person}/>
                    <CardText>Age: {friend.age}</CardText>
                    <CardText>Email: {friend.email}</CardText>
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
