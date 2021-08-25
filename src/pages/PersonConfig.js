import { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import { useStyles } from './../styles/global'
import AvatarIcon from './../assets/icons8-usuario.png'

export function PersonConfig() {
  const classes = useStyles();
  const { user } = useAuth();
  const history = useHistory();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    nickName: ''
  });
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    if (!user.id) history.push('/');

    database.ref(`users/${user.id}`).on('value', (snapshot) => {
      const data = snapshot.val();
      setUserData(data)
    })

  }, [user]);

  const handleChange = event => {
    const field = event.target.name;
    setUserData({ ...userData, [field]: event.target.value });
  }

  const handleSubmit = async () => {
    if (!userData.firstName || !userData.lastName || !userData.nickName) {
      setAlertError(true)
      return;
    }
    setAlertError(false)

    await database.ref(`users/${user.id}`).set({
      firstName: userData.firstName,
      lastName: userData.lastName,
      nickName: userData.nickName
    })

    setAlertSuccess(true)
  }

  return (
    <Fragment>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography variant="h5" gutterBottom>
          <Avatar alt="Remy Sharp" src={user.avatar || AvatarIcon} className={classes.avatar} />
          <div className={classes.title}> Dados de Perfil </div>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="Primeiro Nome"
              value={userData.firstName}
              onChange={handleChange}
              fullWidth
              autoComplete="given-name"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Último Nome"
              value={userData.lastName}
              onChange={handleChange}
              fullWidth
              autoComplete="family-name"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="nickName"
              name="nickName"
              label="Apelido"
              value={userData.nickName}
              onChange={handleChange}
              fullWidth
              autoComplete="nick-name"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Salvar
            </Button>
          </Grid>
          <Grid item xs={12}>
            {
              alertError ? (
                <Alert severity="error" onClose={() => setAlertError(false)}>
                  Preencha todos os campos antes de salvar !!!
                </Alert>
              ) : ('')
            }
          </Grid>
          <Grid item xs={12}>
            {
              alertSuccess ? (
                <Alert severity="success" onClose={() => setAlertSuccess(false)}>
                  Dados salvos com sucesso !!!
                </Alert>
              ) : ('')
            }
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}