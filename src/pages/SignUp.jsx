import React, { useState } from 'react';
import { withFirebase } from '../components/Firebase'
import { Link, withRouter } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';

import useStyles from '../config/theme.signinup'
import Copyright from '../components/Copyright';

function SignUp(props) {
  const classes = useStyles();

  const initialUser = {id: null, name: '', email: '', password: '', error: null, auth: null}

  const [user, setUser] = useState(initialUser);

  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = e => {
    props.firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(authUser => {
      // creates user in firebase
      return props.firebase
        .user(authUser.user.uid)
        .set({
          username: user.name,
          email: user.email,
          activities: 'not set'
        });
    })
    .then(authUser => {
      setUser(initialUser);
      props.history.push("/dashboard");
    })
    .catch(error => {
      setUser({...user, error: error.message})
    });
  }

  const isValid = user.name === '' || user.email === '' || user.password === '';

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form 
            className={classes.form} 
            noValidate
            onSubmit={e => e.preventDefault()}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <Typography className={classes.error}>
              {user.error ? user.error : ''}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={isValid}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(withFirebase(SignUp));