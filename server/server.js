const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const uuid = require('uuid/v4');
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.post('/checkout', async (req, res) => {
  console.log('request- ', req.body);

  let error;
  let status;

  try {
    const { donation, token } = req.body;
    const customer = await
    stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: donation.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Thank you for your ${donation.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge- ", { charge });
    status = 'success';
  } catch (error) {
    console.error('Error- ', error);
    status = 'failure';
  }

  res.json({ error, status});
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
    console.log(`GQL playground running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});