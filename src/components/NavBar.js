import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom';
import logo from "../assets/ei-miko-cooking.png";
import styles from '../styles/NavBar.module.css'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';

const NavBar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch(err) {

        }
    }

    const createRecipeIcon = (
        <NavLink
            to="/recipes/create"
            className={styles.NavLink}
            activeClassName={styles.Active}
        >
            <i className="fa-regular fa-book"></i>
            Create Recipe
        </NavLink>
    )

    const loggedInIcons = (
        <>
            <NavLink
                to="/following"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-address-book"></i>
                Following
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
                to="/"
                className={styles.NavLink}
                onClick={handleSignOut}
            >
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
            </NavLink>
            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                className={styles.NavLink}
            >
                <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
                Profile
            </NavLink>
        </>
    )

    const loggedOutIcons = (
        <>
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
        </>
    )

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
                {currentUser && createRecipeIcon}
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

                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar