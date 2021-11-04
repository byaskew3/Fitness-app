import React from 'react';

import { AuthUserContext, withAuthentication } from '../components/Session';
import { withRouter } from 'react-router-dom';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import clsx from 'clsx';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import useStyles from '../config/theme.dashboard'

import Sidebar from '../components/Sidebar'

import Copyright from '../components/Copyright'

function Dashboard(props) {
  let match = useRouteMatch();

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const signOut = () => {
      props.firebase.auth.signOut()
      props.history.push('/');
  }

  return (
      <AuthUserContext.Consumer>
      {
        authUser => authUser ? (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
                    </Typography>
                    <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <Typography component="p" style={{paddingRight: "15px"}}>
                        username
                        </Typography>
                        <NotificationsIcon />
                    </Badge>
                    </IconButton>
                </Toolbar>
                </AppBar>
        
                <Sidebar 
                    signOut={signOut} 
                    open={open} 
                    handleDrawerClose={handleDrawerClose} 
                />
        
                <main className={classes.content, !open ? classes.contentClosed : classes.appBarShift }>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    Calendar
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
                </main>
                
            </div>
            ) : (
           <p>You must sign in to view this page.</p>
        )
      }
      </AuthUserContext.Consumer>      
  );
};

export default withRouter(withAuthentication(Dashboard));