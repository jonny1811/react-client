import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
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
  btnSucess: { backgroundColor: 'green', color: '#fff', '&:hover': { backgroundColor: '#12b912' } },
  btnReturn: { marginBottom: 10, marginRight: 5 },
  btnCreate: { marginBottom: 10 }
}));

export default function ProductsEdit() {
  const classes = useStyles();

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ quantity, setQuantity ] = useState(0);
  const [ price, setPrice ] = useState(0);

  const { idProduct } = useParams();

  useEffect(() => {
    async function getProducts() {
      var res = await api.get("/api/products/" + idProduct);
      
      setName(res.data.name);
      setDescription(res.data.description);
      setQuantity(res.data.quantity);
      setPrice(res.data.price);
    }

    getProducts();
  }, [idProduct]);

  async function handleSubmit() {
    const data = { name, description, quantity, price };
  
    if (name !== '' && description !== '' && quantity !== '' && price !== '') {
      const response = await api.put(`/api/products/update/${idProduct}`, data);
  
      if (response.status === 200) {
        window.location.href = '/admin/products'
      } else {
        alert('Error al actualizar el producto');
      }
    } else {
      alert('Se requiere que llene todos los campos');
    }

  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'PRODUCTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button className={classes.btnReturn} variant='contained' href={`/admin/products`}>
                <ArrowBackIcon />
                Volver</Button>
              <Button className={classes.btnCreate} variant='contained' color="primary" href={`/admin/products/register`}>
                <AddIcon />
                Crear
              </Button>
              <Paper className={classes.paper}>
                <h2>Actualización de Producto</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nombre"
                      name="nombre"
                      label="Nombre del Producto"
                      fullWidth
                      autoComplete="nombre"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="description"
                      name="description"
                      label="Descripción"
                      fullWidth
                      autoComplete="descripción"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      required
                      id="quantity"
                      name="quantity"
                      label="Cantidad"
                      fullWidth
                      autoComplete="cantidad"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      required
                      id="price"
                      name="price"
                      label="Precio"
                      fullWidth
                      autoComplete="precio"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
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