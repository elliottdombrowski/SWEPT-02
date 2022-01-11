// routing
const express = require('express');
const router = express.Router();
const Sweeper = require('./sweeper');

router.get('/sweeper', async (req, res) => {
    let sweeper = new Sweeper()
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify);
});

module.exports = router;