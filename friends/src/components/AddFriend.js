import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addFriendRequest } from '../utils/api/addFriendRequest';
import { userContext } from '../contexts/userContext';

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
    const { setUsersFriends } = useContext(userContext);

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const addFriend = e => {
        e.preventDefault();
        console.log(formValues);
        const newFriend = {
                id: Date.now(),
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
                setUsersFriends(res.data);
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
                <div>{error}</div>
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

