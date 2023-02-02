import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom';
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
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                        Genshin Recipes Blog
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink
                            exact
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            <i className="fas fa-home"></i>
                            Home
                        </NavLink>
                        <NavLink
                            to="/favourites"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            <i className="fa-solid fa-star"></i>
                            Favourites
                        </NavLink>
                        <NavLink
                            to="/following"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            <i className="fa-solid fa-address-book"></i>
                            Following
                        </NavLink>
                        <NavLink
                            to="/signin"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            <i className="fas fa-sign-in-alt"></i>
                            Sign In
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            <i className="fas fa-user-plus"></i>
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                        >
                            Profile
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar