import { color } from "framer-motion";
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AuthNavbar = () => {

    const mystyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color:"white"
      };

    return (
        <React.Fragment>
            <Navbar bg="" expand="lg" className="fixed-top" style={mystyle}>
                <Container style={{maxWidth:'1900px'}}>
                    <Navbar.Brand style={mystyle}></Navbar.Brand>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default AuthNavbar;