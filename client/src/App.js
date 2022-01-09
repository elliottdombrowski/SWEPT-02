import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../src/components/Navbar/Navbar';
import Sweeper from '../src/pages/Sweeper/Sweeper';
import FindZipForm from './components/FindZipForm/FindZipForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  return (
    <div className="App">
        <Router>
          <Route exact path='/'>
            <Navbar />
            <Sweeper />
          </Route>
          
          <Route exact path='/login'>
            <Navbar />
            <LoginForm />
          </Route>
        </Router>
    </div>
  );
}

export default App;
