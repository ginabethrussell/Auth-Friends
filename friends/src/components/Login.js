import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { loginRequest } from '../utils/api/loginRequest';
import { userContext } from '../contexts/userContext';

const initialUserCredentials = {
    username: '',
    password: '',
}

function Login() {
    const [userCredentials, setUserCredentials] = useState(initialUserCredentials);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const { setCurrentUser } = useContext(userContext);

    const handleChange = e => {
        setUserCredentials({
            ...userCredentials,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = e => {
        e.preventDefault();
        console.log(userCredentials);
        const testCredentials = { 
            username: 'Lambda School',
             password: 'i<3Lambd4'
        };

        setIsLoading(true);
        setError('');
        loginRequest(testCredentials)
            .then(res => {
                const token = res.data.payload;
                localStorage.setItem('token', token)
                setIsLoading(false);
                setCurrentUser(testCredentials.username);
                history.push('/friendslist');  
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                setError("User not found, please create an account");
            })
        setUserCredentials(initialUserCredentials);
    } 

    if (isLoading){
        return (
            <div>
                <Spinner color="primary" />
            </div>
        )
    }else if (error !== ''){
        return(
            <>
                <div>{error}</div>
                <button >Signup for an account</button>
                <Link to='/login' onClick={() => setError('')}> Return to Login</Link>
            </>
        )
    }else {
        return (
            <div className='login-wrapper'>
                <Form className='form' onSubmit={loginUser}>
                    <h3>Login to Your Account</h3>
                    <FormGroup>
                    <Label size='lg' htmlFor='username'>Username: </Label>
                    <Input size='lg' type='text'
                    id='username'
                    name='username'
                    value= {userCredentials.username}
                    onChange={handleChange}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label size='lg' htmlFor='password'>Password: </Label>
                    <Input size='lg' type='password'
                    id='password'
                    name='password'
                    value= {userCredentials.password}
                    onChange={handleChange}
                    />
                    </FormGroup>
                    <Button color='primary' size='lg' type='submit'>Login</Button>
                </Form>
            </div>
        )
    }
    
}

export default Login;
