import logo from './logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './utils/PrivateRoute';
import { Nav, NavItem, NavLink} from 'reactstrap';
import Container from 'react-bootstrap/Container';

import Friends from './friends.png'

import './App.css';

function App() {
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
            <NavLink tag={Link} to='/friendslist'>Friends</NavLink>  
          </NavItem>
      </Nav>
      </Container>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/friendslist' component={FriendsList} />
      </Switch>
    </div>
  );
}

export default App;
