// import './App.css';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';
import RecipePage from './pages/recipes/RecipePage';
import AllRecipes from './pages/recipes/AllRecipes';
import { useCurrentUser } from './contexts/CurrentUserContext';
import RecipeEditForm from './pages/recipes/RecipeEditForm';

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route
                exact
                path='/'
                render={() => <AllRecipes message='Nothing here. Adjust your search.'/>}
              />
              <Route
                exact
                path='/favourites'
                render={() => (
                  <AllRecipes
                    message='Nothing here. Adjust your search or like a recipe.'
                    filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                  />
                )}
              />
              <Route
                exact
                path='/made'
                render={() => (
                  <AllRecipes
                    message='Nothing here. Adjust your search or mark a recipe as made.'
                    filter={`made__owner__profile=${profile_id}&ordering=-made__created_at&`}
                  />
                )}
              />
              <Route
                exact
                path='/following'
                render={() => (
                  <AllRecipes
                    message='Nothing here. Adjust your search or follow a creator.'
                    filter={`owner__followed__owner__profile=${profile_id}&`}
                  />
                )}
              />
              <Route
                exact
                path='/signin'
                render={() => <SignInForm />}
              />
              <Route
                exact
                path='/signup'
                render={() => <SignUpForm />}
              />
              
              <Route
                exact
                path='/recipes/create'
                render={() => <RecipeCreateForm />}
              />
              <Route
                exact
                path='/recipes/:id'
                render={() => <RecipePage />}
              />
              <Route
                exact path="/recipes/:id/edit"
                render={() => <RecipeEditForm />}
              />
              <Route
                render={() => <p>Page not found!</p>}
              />
            </Switch>
          </Container>
        </div>
  );
}

export default App;