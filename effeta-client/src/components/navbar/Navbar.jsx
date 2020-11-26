import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useUserStore } from '../../context/UserContext';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import headerImage from '../../images/logo.png';

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

const Navbar = observer((props) => {
  const classes = useStyles();
  const history = useHistory();
  const store = useUserStore();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    store.logoutUser();
  }

  useEffect(() => {
    const token = window.localStorage.getItem('effeta.token');
    if (!token) {
      history.push('/Login');
    } else {
      store.setUser({token});
    }
  }, [history, store]);

  return (
    <AppBar position="static" color='inherit'>
      <Toolbar style={{paddingTop: '5px', paddingBottom: '5px'}}>
        <IconButton onClick={handleClick} aria-controls="simple-menu" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        { store.user && store.user.isAdmin &&
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link style={{textDecoration: 'none'}} to="/Aportantes">Aportantes</Link>
            </MenuItem>
            <MenuItem  onClick={handleClose}>
              <Link style={{textDecoration: 'none'}} to="/Aportes">Aportes</Link>
            </MenuItem>
          </Menu>
        }
          <div className={classes.title}>
            <img alt="logo" src={headerImage} style={{alignSelf: 'flex-start'}} />
          </div>
        {store.user && !store.user.token && <Link to="/Login" color="inherit">Login</Link>}
        {store.user && store.user.token && <Link onClick={logout} to="/Login" color="inherit">Logout</Link>}
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
