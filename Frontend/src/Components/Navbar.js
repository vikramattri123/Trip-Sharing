import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import distance from '../Images/Trip.png';

import Post from '../Images/more.png';
import { NavLink } from 'react-router-dom';


function TopBar() {
  const [show_formModel ,setFormModel] = useState(false);

  return (
    <Navbar expand="lg"bg="primary" variant="dark" fixed="top">
      <Container style={{display:'flex',width:'90em'}}>
        <Navbar.Brand href="#" style={{display:'flex',gap:'6px'}}>

          <Card.Img  variant="top" src={distance} width="40px" height="32px"/>
          <Card.Title style={{marginTop:'5px'}}>ᗰY TᖇIᑭ</Card.Title>
          </Navbar.Brand>
          
          <Nav className="me-auto" style={{gap:'10px',display:'flex',justifyContent:'flex-end' ,flexDirection:'row'}}>
            <NavLink to="/login" style={{color:'white'}}>Login</NavLink>
            <NavLink to="/create_post" style={{color:'white'}}><img src={Post} width="25px" height="25px" title='Add Post'/></NavLink>
            <NavLink to="/" style={{color:'white'}}>Logout</NavLink>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default TopBar;