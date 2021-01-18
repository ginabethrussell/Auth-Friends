import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import AddFriend from './components/AddFriend';
import UpdateFriend from './components/UpdateFriend';

import { userContext as UserContext } from './contexts/userContext';

import { Nav, NavItem, NavLink} from 'reactstrap';
import Container from 'react-bootstrap/Container';
import './App.css';


function App() {
  // set up state and a reducer to handle updates
  const [user, setUser ] = useState('');
  const [friends, setFriends] = useState([]);

  const setCurrentUser = (user) => {
    setUser(user);
  }

  const setUserFriends = (friends) => {
    setFriends(friends);
  }

  const userObject = {
    currentUser: user, 
    setCurrentUser: setCurrentUser,
    currentUserFriends: friends, 
    setUserFriends: setUserFriends
  }

  return (
    <div className="App">  
      <Container >
      <Nav>
          <NavItem>
            <NavLink tag={Link} to='/'>Home</NavLink>  
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/login'>Login</NavLink>  
          </NavItem>
          <NavItem>
            <NavLink data-testid='friendslink' tag={Link} to='/friendslist'>Friends</NavLink>  
          </NavItem>
      </Nav> 
      </Container>
      <Switch>
      <UserContext.Provider value={userObject}>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/friendslist' component={FriendsList} />
          <PrivateRoute path='/addfriend' component={AddFriend} />
          <PrivateRoute path='/updatefriend:id' component={UpdateFriend} />
          </UserContext.Provider> 
      </Switch> 
     
    </div>
  );
}

export default App;
