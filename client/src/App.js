import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer';
import Homepage from '../src/pages/Homepage/Homepage';
import Sweeper from '../src/pages/Sweeper/Sweeper';
import Snow from '../src/pages/Snow/Snow';
import Profile from './pages/Profile/Profile';
import LoginSignup from './pages/LoginSignup/LoginSignup';
import PaymentComponent from '../src/components/PaymentComponent/PaymentComponent';

import './App.css';

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

          <Route exact path='/payments'>
            <div>
              <PaymentComponent
                keys={{
                  stripe: "pk_test_51KHYhgClOt2kJmiDPmidphPbalsnQh3IER3uhYKamBl1tZmeBwGC8lfGDsfAg1Pw0easHAUVHZ3l2AUeKyaiG7hr009TLK7LxE"
                }}
              />
            </div>
          </Route>
          <Footer />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;