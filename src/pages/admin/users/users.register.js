import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';


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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%'
  },
  btnReturn: { marginBottom: 10 },
  btnSucess: { backgroundColor: 'green', color: '#fff', '&:hover': { backgroundColor: '#12b912' } },
}));

export default function UsersRegister() {
  const classes = useStyles();

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ type, setType ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setconfirmPassword ] = useState('');

  async function handleSubmit() {
    const data = { name, email, type, password, confirmPassword };
  
    if (name !== '' && email !== '' && type !== '' && password !== '' && confirmPassword !== '') {
      const response = await api.post('/api/register', data);
  
      if (response.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Error al registrar el usuario');
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
              <Button className={classes.btnReturn} variant='contained' href={`/admin/users`}>
                <ArrowBackIcon />
                Volver
              </Button>
              <Paper className={classes.paper}>
                <h2>Registro de Usuario</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelType">Tipo</InputLabel>
                      <Select
                        labelId="labelType"
                        id="type"
                        value={type}
                        onChange={e => setType(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Gerente</MenuItem>
                        <MenuItem value={3}>Funcionario</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                    <Button variant="contained" onClick={handleSubmit} className={classes.btnSucess}>
                      <SaveIcon />
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