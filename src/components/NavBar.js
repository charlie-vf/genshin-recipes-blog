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
import useBurgerToggle from '../hooks/useBurgerToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useBurgerToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch(err) {
            // console.log(err)
        }
    }

    const createRecipeIcon = (
        <NavLink
            to="/recipes/create"
            className={styles.NavLink}
            activeClassName={styles.Active}
        >
            <i className="fa-solid fa-feather-pointed"></i>
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
                to="/made"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fa-solid fa-bowl-rice"></i>
                Made
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
            expanded={expanded}
            expand="md"
            fixed="top"
        >
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" className='pr-3' />
                        Genshin Recipes Blog
                    </Navbar.Brand>
                </NavLink>
                {currentUser && createRecipeIcon}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar