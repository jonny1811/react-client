import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Products from './pages/admin/products';
import ProductsEdit from './pages/admin/products/products.edit';
import ProductsRegister from './pages/admin/products/products.register';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersRegister from './pages/admin/users/users.register';

// IMPORTS CLIENT
import Home from './pages/client/home';
import ProductDetails from './pages/client/products/products.details';
import Login from './pages/admin/login';

import PrivateRoute from './services/wAuth';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Router Client */}
                <Route path="/" exact component={Home} />
                <Route path="/products/:idProduct" exact component={ProductDetails} />

                {/* Router Admin */}
                <PrivateRoute path="/admin" exact component={Dashboard} />
                <Route path="/admin/login" exact component={Login} />

                <PrivateRoute path="/admin/products" exact component={Products} />
                <PrivateRoute path="/admin/products/register" exact component={ProductsRegister} />
                <PrivateRoute path="/admin/products/edit/:idProduct" exact component={ProductsEdit} />

                <PrivateRoute path="/admin/users" exact component={Users} />
                <PrivateRoute path="/admin/users/register" exact component={UsersRegister} />
                <PrivateRoute path="/admin/users/edit/:idUser" exact component={UsersEdit} />
            </Switch>
        </BrowserRouter>
    )
}