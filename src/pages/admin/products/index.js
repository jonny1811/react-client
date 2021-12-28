import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer.admin';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  btnCreate: { marginBottom: 10 }
}));

export default function ProductsList() {
  const classes = useStyles();

  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const res = await api.get('/api/products');
      setProducts(res.data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Desea realmente borrar este producto?')) {
      var result = await api.delete(`/api/products/delete/${id}`);
      if (result.status === 200) {
        window.location.href = '/admin/products';
      } else {
        alert('Ocurrio un error. Porfavor vuelve intentar');
      }
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuAdmin title={'PRODUCTOS'} />
    
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button className={classes.btnCreate} variant='contained' color="primary" href={`/admin/products/register`}>
                <AddIcon />
                Crear
              </Button>
              <Paper className={classes.paper}>
                <h2>Lista de Productos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading?(<LinearProgress style={{ width: '50%', margin: '60px auto' }} />):(
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nombre</TableCell>
                              <TableCell align="center">Descripción</TableCell>
                              <TableCell align="center">Cantidad</TableCell>
                              <TableCell align="center">Precio</TableCell>
                              <TableCell align="center">Fecha de Registro</TableCell>
                              <TableCell align="right">Opciones</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {products.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                                <TableCell align="right">
                                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button variant='contained' color="primary" href={`/admin/products/edit/${row.id}`}>
                                      <EditIcon />
                                      Actualizar
                                    </Button>
                                    <Button variant='contained' color="secondary" onClick={() => handleDelete(row.id)}>
                                      <DeleteIcon />
                                      Borrar
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
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