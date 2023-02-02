import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import logo from "../assets/ei-miko-cooking.png";
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return (
        <Navbar
            className={styles.NavBar}
            expand="md"
            fixed="top"
        >
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="55" />
                    Genshin Recipes Blog
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link>
                            <i className="fas fa-home"></i>
                            Home
                        </Nav.Link>
                        <Nav.Link>
                            <i class="fa-solid fa-star"></i>
                            Favourites
                        </Nav.Link>
                        <Nav.Link>
                            <i class="fa-solid fa-address-book"></i>
                            Following
                        </Nav.Link>
                        <Nav.Link>
                            <i className="fas fa-sign-in-alt"></i>
                            Sign In
                        </Nav.Link>
                        <Nav.Link>
                            <i className="fas fa-user-plus"></i>
                            Sign Up
                        </Nav.Link>
                        <Nav.Link>Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar