import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useUserStore } from '../../context/UserContext';

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

  const [email, setEmail] = useState('user@test.com');
  const [password, setPassword] = useState('user123');
  const [remember, setRemember] = useState(false);
  const store = useUserStore();

  const submit = () => {
    if (email === 'user@test.com' && password === 'user123') {
      store.setUser({ email, password });
      props.history.push('/Menu');
    } else {
      alert('Usuario y password invalidos!');
    }
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
          label="Remember me"
        />
        <Button variant="contained" color="primary" onClick={submit} size="large">
          Login
        </Button>
      </form>
    </>
  );
}

export default Login;
