import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useUserStore } from '../../context/UserContext';
import UserService from '../../services/User';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    border: 'solid 1px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inputClass: {
    width: '300px'
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('administrativo1@effeta.com');
  const [password, setPassword] = useState('123456');
  const [remember, setRemember] = useState(false);
  const store = useUserStore();
  const history = useHistory();

  const submit = () => {
    UserService.login(email, password)
    .then(res => {
      store.setUser({ token: res.data.token });
      window.localStorage.setItem('effeta.token', res.data.token);
      props.history.push('/Menu');
    })
    .catch(err => {
      alert(err);
    });
    /*if (email === 'user@test.com' && password === 'user123') {
      store.setUser({ email, password });
      props.history.push('/Menu');
    } else {
      alert('Usuario y password invalidos!');
    }*/
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleCheckboxChange = (event) => {
    setRemember(event.target.checked );
  }

  useEffect(() => {
    if (store.user && store.user.token) {
      history.push('/Contributors');
    }
  }, [history, store]);

  return (
    <>
      <form onSubmit={submit} className={classes.root} autoComplete="off">
        <TextField id="email" label="Email" value={email} onChange={onEmailChange} variant="outlined" className={classes.inputClass} type="email" />
        <TextField id="password" label="Password" value={password} onChange={onPasswordChange} variant="outlined" type="password" className={classes.inputClass} />
        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={handleCheckboxChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Recordarme"
        />
        <Button variant="contained" color="primary" onClick={submit} size="large">
          Login
        </Button>
      </form>
    </>
  );
}

export default Login;
