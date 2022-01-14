const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');
const bodyParser = require('body-parser');
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

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

server.applyMiddleware({ app });

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/stripe', async (req, res) => {
  const userPrice = parseInt(req.body.price)*100;
  const intent = await stripe.paymentIntents.create({
    amount: userPrice,
    currency: 'usd'
  });
  res.json({client_secret: intent.client_secret, intent_id:intent.id});
});

app.post('/confirm-payment', async (req, res) => {
  const paymentType = String(req.body.payment_type);

  if (paymentType == 'stripe') {
    const clientid = String(req.body.payment_id);
    stripe.paymentIntents.retrieve(
      clientid,
      function(err, paymentIntent) {
        if (err) {
          console.log(err);
        }
        if (paymentIntent.status === 'succeeded') {
          console.log('confirmed stripe payment:' + clientid);
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      }
    );
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
    console.log(`GQL playground running at http://localhost:${PORT}${server.graphqlPath}`);
  });
});