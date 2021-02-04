import React from 'react'

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Form } from './components/Form'
import { Checkout } from './components/Checkout'
import Login from './components/Login'
import { Confirmation } from './components/Confirmation'
import { user } from 'reducers/user';
import { webshop } from 'reducers/webshop';
import { products } from 'reducers/products';

const reducer = combineReducers({ 
  webshop: webshop.reducer,
  products: products.reducer,
  user: user.reducer
});

const store = configureStore({ reducer });

export const App = () => {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <Form />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/checkout" exact>
            <Checkout />
          </Route>
          <Route path="/confirmation/:id" exact>
            <Confirmation />
          </Route>
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
