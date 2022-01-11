// routing
const express = require('express');
const router = express.Router();
require('dotenv').config({ path: '../../.env' });
// const Sweeper = require('./sweeper');

app.get('/sweeper', (req, res) => {
    const sweeperData = {
        method: 'GET',
        url: 'https://data.cityofchicago.org/resource/wvjp-8m67.json',
        data: {
            '$limit': 5000,
            '$$app_token': process.env.REACT_APP_SWEEPER
        }
    }
})

module.exports = router;