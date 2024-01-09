import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';

const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // useEffect(() => {
  //   getData()
  // }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:8000/register', {
      username,
      password,
    });

    console.log(result.data);
    navigate('/login');

    // Simple validation
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    // Perform authentication logic here (e.g., call an API)
    // For simplicity, we'll just log the credentials for now
    console.log('Username:', username);
    console.log('Password:', password);

    // Clear the form and error message
    // setUsername('');
    // setPassword('');
    // setError('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className={classes.form} onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
