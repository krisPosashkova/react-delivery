import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import AuthContextProvider from './authContextProvider';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';

import Basket from './pages/basket';
import Products from './pages/products';
import Product from './pages/product';
import Main from './pages/main';


function App() {

  return (
    <BrowserRouter >
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={<PublicRoute><Main /></PublicRoute>}
          />
          <Route
            path="/products"
            element={<PrivateRoute><Products /></PrivateRoute>}
          />
          <Route
            path="/basket"
            element={<PrivateRoute><Basket /></PrivateRoute>}
          />
          <Route
            path="/products/:id"
            element={<PrivateRoute><Product /></PrivateRoute>}
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )

};

export default App;