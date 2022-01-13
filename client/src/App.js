import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import Homepage from '../src/pages/Homepage/Homepage';
import Sweeper from '../src/pages/Sweeper/Sweeper';
import Snow from '../src/pages/Snow/Snow';
import Profile from './pages/Profile/Profile';
import LoginSignup from './pages/LoginSignup/LoginSignup';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [showItem, setShowItem] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path='/'>
            <Homepage />
          </Route>

          <Route exact path='/sweeper'>
            <Sweeper />
          </Route>

          <Route exact path='/snow'>
            <Snow />
          </Route>

          <Route exact path='/me'>
            <Profile />
          </Route>

          <Route exact path='/login'>
            <LoginSignup />
          </Route>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;