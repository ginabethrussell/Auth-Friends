import React, {useState, useContext, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { updateFriendRequest } from '../utils/api/updateFriendRequest';
import { userContext } from '../contexts/userContext';

const initialFormValues = {
    name: '',
    age: '',
    email: '',
}

function UpdateFriend() {
    const [friend, setFriend] = useState(initialFormValues);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('')
    const history = useHistory();
    const { setUserFriends, currentUserFriends } = useContext(userContext);
    const {id} = useParams();

    useEffect(() => {
        console.log('id from url', id);
        console.log('friends', currentUserFriends);
        const selectedFriend = currentUserFriends.filter(friend => {
            // console.log(friend.id, id);
            return friend.id === Number(id);
        })[0];
        // console.log(selectedFriend)
    
        setFormValues({
            name: selectedFriend.name,
            age: selectedFriend.age,
            email: selectedFriend.email
        });
        
    }, []);

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const updateFriend = e => {
        e.preventDefault();
        console.log(formValues);

        const updatedFriend = formValues

        setIsUpdating(true);
        setError('');

        updateFriendRequest(id, updatedFriend)
            .then(res => {
                setIsUpdating(false);
                console.log(res.data);
                setUserFriends(res.data);
                history.push('/friendslist');  
            })
            .catch(err => {
                console.log(err);
                setIsUpdating(false);
                setError(err);
            })

        setFormValues(initialFormValues);
    }

    if (isUpdating){
        return (
            <div>
                <Spinner color="primary" />
                <p>Updating Friend</p>
                <Spinner color="primary" />
            </div>
        )
    }else if (error !== ''){
        return(
            <>
                <div>{error}</div>
            </>
        )
    }else {
        return (
            <div className='updateFriend-wrapper'>
                <Form className='form' onSubmit={updateFriend}>
                    <h3>Update Your Friend's Info</h3>
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
                    <Button color='primary' size='lg' type='submit'>Update Friend</Button>
                </Form>
            </div>
        )
    }
    
}

export default UpdateFriend;

