import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import Login from "./components/login/Login";
import Contributors from "./components/contributors/Contributors";
import MenuAportante from "./components/contributor-panel/Contributor";
import Navbar from './components/navbar/Navbar';
import Contributions from "./components/contributions/Contributions";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
        <Router>
          <Navbar />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/Contributors" component={Contributors}/>
              <Route exact path="/Contributions" component={Contributions}/>
              <Route exact path="/MenuAportante" component={MenuAportante}/>
              <Route exact path="/Login" component={Login}/>
              <Route path="/" component={Login}/>
            </Switch>
          </Container>
        </Router>
    </>
  );
}

export default App;
