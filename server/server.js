const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/payment', cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Developer donation",
      payment_method: id,
      confirm: true
    });
    console.log('payment- ', payment)
    res.json({
      message: "Payment successful",
      success: true
    });
  } catch (error) {
    console.log("error ", error)
    res.json({
      message: "Payment not successful",
      success: false
    })
  }
});

//FOR STRIPE PAYMENT


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