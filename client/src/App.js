import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../src/components/Navbar/Navbar';
import Sweeper from '../src/pages/Sweeper/Sweeper';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Sweeper />
      </Router>
    </div>
  );
}

export default App;
