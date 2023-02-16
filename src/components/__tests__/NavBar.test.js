import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom'
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test('renders NavBar', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
    // screen.debug();

    // Test Sign In link in NavBar
    const signInLink = screen.getByRole('link', { name: 'Sign In' });
    expect(signInLink).toBeInTheDocument();
});

test('renders link to user profile for logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileAvatar = await screen.findByText('Profile');
    expect(profileAvatar).toBeInTheDocument();

});

test('renders Sign In & Sign Up buttons on logout', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('link', {name: 'Sign Out'});
    fireEvent.click(signOutLink);

    const signInLink = await screen.findByRole('link', {name: 'Sign In'});
    const signUpLink = await screen.findByRole('link', {name: 'Sign Up'});

    expect(signInLink).toBeInTheDocument();
    expect(signOutLink).toBeInTheDocument();

});