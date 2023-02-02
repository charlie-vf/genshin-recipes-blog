// import './App.css';
import styles from './App.module.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path='/'
            render={()=><h1>Test home</h1>}
          />
          <Route
            exact
            path='/favourites'
            render={()=><h1>Test favourites</h1>}
          />
          <Route
            exact
            path='/following'
            render={()=><h1>Test following</h1>}
          />
          <Route
            exact
            path='/signin'
            render={()=><h1>Test signin</h1>}
          />
          <Route
            exact
            path='/signup'
            render={()=><h1>Test signup</h1>}
          />
          <Route
            render={()=><p>Page not found!</p>}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;