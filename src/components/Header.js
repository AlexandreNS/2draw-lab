import { Fragment } from 'react';
import { useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SvgIcon from "@material-ui/core/SvgIcon";

import { Link as RouterLink } from 'react-router-dom';
import { database } from '../services/firebase';

import { useStyles } from './../styles/global'
import { useAuth } from '../hooks/useAuth';
import { ReactComponent as Logo } from '../assets/icons8-google-logo.svg';

export function Header() {
  const classes = useStyles();
  const history = useHistory();
  const { user, signInWithGoogle, signOut } = useAuth();

  async function handleSignIn() {
    if (!user.id) {
      const { id: uid, name } = await signInWithGoogle()

      if (uid) {
        const usersRef = await database.ref(`users/${uid}`).get();
        if (!usersRef.exists()) {
          await database.ref(`users/${uid}`).set({
            firstName: name,
            lastName: '',
            nickName: ''
          })

          history.push('/person-config');
        }
      }

    }
  }

  async function handleSignOut() {
    await signOut()

    history.push('/');
  }

  return (
    <Fragment>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component={RouterLink} to="/" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            2draw App
          </Typography>
          <nav>
            {user.id ? (
              <Link variant="button" component={RouterLink} to="/person-config" color="textPrimary" href="#" className={classes.link}>
                Configurações
              </Link>) : ('')
            }
            <Link variant="button" component={RouterLink} to="/draw" color="textPrimary" href="#" className={classes.link}>
              Desenhar
            </Link>
          </nav>
          <Button color="primary" variant="outlined" className={classes.link} onClick={() => !user.id ? handleSignIn() : handleSignOut()}>
            {
              !user.id ? (
                <>
                  Login com
                  <SvgIcon className={classes.logo} viewBox="0 0 48 48">
                    <Logo />
                  </SvgIcon> </>
              ) : ('Deslogar')
            }
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}