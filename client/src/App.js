import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../src/components/Navbar/Navbar';
import Sweeper from '../src/pages/Sweeper/Sweeper';
import Snow from '../src/pages/Snow/Snow';
import FindZipForm from './components/FindZipForm/FindZipForm';
import LoginForm from './components/LoginForm/LoginForm';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
          <Router>
            <Navbar />

            <Route exact path='/'>
              <Sweeper />
            </Route>
            
            <Route exact path='/snow'>
              <Snow />
            </Route>

            <Route exact path='/login'>
              <LoginForm />
            </Route>
          </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
