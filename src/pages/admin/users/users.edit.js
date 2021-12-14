import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer.admin';

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function UsersEdit() {
  const classes = useStyles();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setconfirmPassword ] = useState('');

  const { idUser } = useParams();

  useEffect(() => {
    async function getUsers() {
      var res = await api.get("/api/users/" + idUser);
      
      setName(res.data.name);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setconfirmPassword(res.data.password);
    }

    getUsers();
  }, [idUser]);

  async function handleSubmit() {
    const data = { name, email, password, confirmPassword };
  
    if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
      const response = await api.put(`/api/users/update/${idUser}`, data);
  
      if (response.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Error al actualizar el usuario');
      }
    } else {
      alert('Se requiere que llene todos los campos');
    }

  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUARIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Actualización de Usuario</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nombre"
                      name="nombre"
                      label="Nombre y Apellido"
                      fullWidth
                      autoComplete="nombre"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="password"
                      name="password"
                      label="Contraseña"
                      fullWidth
                      autoComplete="contrasena"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Repetir Contraseña"
                      fullWidth
                      autoComplete="confirmPassword"
                      value={confirmPassword}
                      onChange={e => setconfirmPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}