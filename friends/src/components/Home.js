import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Container from 'react-bootstrap/Container';
import Friends from '../friends.png';

function Home() {
  const history = useHistory();
  return (
    < Container style={{ backgroundImage: `url(${Friends})`, backgroundSize: 'contain', width: '100%',
    minHeight: '700px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex',
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }} >
      <div className="home-wrapper">
        <h1>My Friends List</h1>
        
        <Button size='lg' color='primary' onClick={() => history.push("/login")}> Get Started</Button>
      </div>
    </ Container>
  );
}

export default Home;
