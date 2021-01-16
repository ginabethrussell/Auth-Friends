import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addFriendRequest } from '../utils/api/addFriendRequest';
import { userContext } from '../contexts/userContext';
import Error from '../error.png';

const initialFormValues = {
    name: '',
    age: '',
    email: '',
}

function AddFriend() {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState('')
    const history = useHistory();
    const { setUserFriends, currentUserFriends } = useContext(userContext);

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const addFriend = e => {
        e.preventDefault();
        console.log(formValues);
        // check to see if user already has entered a friend with the same name
        const duplicateFriend = currentUserFriends.filter(friend => friend.name === formValues.name);
        console.log(duplicateFriend);
        if (duplicateFriend.length > 0){
            setError('Whoops! You already have a friend with this name. Choose update instead to change their info.');
            return;
        }
        const newFriend = {
                name: formValues.name,
                age: formValues.age,
                email: formValues.email,
              }

        setIsAdding(true);
        setError('');

        addFriendRequest(newFriend)
            .then(res => {
                setIsAdding(false);
                console.log(res.data);
                setUserFriends(res.data);
                history.push('/friendslist');  
            })
            .catch(err => {
                console.log(err);
                setIsAdding(false);
                setError(err);
            })

        setFormValues(initialFormValues);
    }

    if (isAdding){
        return (
            <div>
                <Spinner color="primary" />
                <p>Adding Friend</p>
                <Spinner color="primary" />
            </div>
        )
    }else if (error !== ''){
        return(
            <>
                <img src={Error} height="100px" />
                <div className='error-message'>{error}</div>
            </>
        )
    }else {
        return (
            <div className='addFriend-wrapper'>
                <Form className='form' onSubmit={addFriend}>
                    <h3>Add a New Friend to Your Friend List</h3>
                    <FormGroup>
                    <Label size='lg' htmlFor='name'>Name: </Label>
                    <Input size='lg' type='text'
                    id='name'
                    name='name'
                    value= {formValues.name}
                    onChange={handleChange}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label size='lg' htmlFor='age'>Age: </Label>
                    <Input size='lg' type='age'
                    id='age'
                    name='age'
                    value= {formValues.age}
                    onChange={handleChange}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label size='lg' htmlFor='email'>Email: </Label>
                    <Input size='lg' type='email'
                    id='email'
                    name='email'
                    value= {formValues.email}
                    onChange={handleChange}
                    />
                    </FormGroup>
                    <Button color='primary' size='lg' type='submit'>Add Friend</Button>
                </Form>
            </div>
        )
    }
    
}

export default AddFriend;

