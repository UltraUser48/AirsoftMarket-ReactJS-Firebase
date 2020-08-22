import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import { Row, Col, Button, Container, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from "react-router-dom";
import styles from '../styles/index.css'

function Header() {

  const { user, firebase } = React.useContext(FirebaseContext)


  let history = useHistory();
 
  
    function handleClick() {
      firebase.logout();
      history.push("/login");
  }

  const routeChange = () =>{ 
    let path = `/create`; 
    history.push(path);
  }


  return (


    <Navbar bg="dark" expand="lg">
      <img src="/thumbnail.jpg" alt="thumbnail" height="45px" weight="40px"></img>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        
      <div>
      <LinkContainer to="/" className="header-link">
                  <NavItem >Home</NavItem>
                </LinkContainer>
                </div>
                <div class="p-2">
                <LinkContainer to="/top" className="header-link">
                  <NavItem >Top Offers</NavItem>
                </LinkContainer>
                </div>
                <div>
                <LinkContainer to="/search" className="header-link">
                  <NavItem >Search</NavItem>
                </LinkContainer>
                </div>
       

       
          {user && (

<div class="p-2">
<Button variant="outline-warning" onClick={routeChange}>Post Ad</Button>
</div>
          )}
   
        <Container>

        <div>
                <LinkContainer to="/Airsoftinfo" className="header-link">
                  <NavItem >What is Airsoft?</NavItem>
                </LinkContainer>
                </div>
  
          {user ? (
            <>
              <div>
              <LinkContainer to="/profile" className="header-link">
                  <NavItem >My Profile</NavItem>
                </LinkContainer>
                <Button variant="outline-warning" onClick={handleClick}
                >logout</Button>
              </div>
            </>
          ) : (
              <Nav.Link href="/login" className="header-link">
                Login
              </Nav.Link>
            )}

        </Container>


      </Navbar.Collapse>
    </Navbar>

  )
}

export default withRouter(Header);
