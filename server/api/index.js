// routing
const express = require('express');
const router = express.Router();
require('dotenv').config({ path: '../../.env' });
// const Sweeper = require('./sweeper');

router.get('/sweeper', (req, res) => {
    const sweeperData = {
        method: 'GET',
        url: 'https://data.cityofchicago.org/resource/wvjp-8m67.json',
        data: {
            '$limit': 5000,
            '$$app_token': process.env.REACT_APP_SWEEPER
        }
    }

    axios.request(sweeperData).then((response) => {
        res.json(response.data)
        console.log(response);
    }).catch((error) => {
        console.error(error)
    })
})

module.exports = router;