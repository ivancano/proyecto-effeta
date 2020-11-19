import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useUserStore } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = observer(() => {
  const classes = useStyles();
  const store = useUserStore();

  const logout = () => {
    store.logoutUser();
  }

  return (
    <AppBar position="static" color='inherit'>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Fundación EFFETA
        </Typography>
        {!store.user.email && <Link to="/Login" color="inherit">Login</Link>}
        {store.user.email && <Link onClick={logout} to="/Login" color="inherit">Logout</Link>}
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
