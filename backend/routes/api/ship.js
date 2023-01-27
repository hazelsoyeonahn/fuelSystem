const express = require('express');
const router = express.Router();
const Ship = require('../../models/Ship');


//Endpoint for when the root webpage receives a get request
router.get('/', (req, res) => {
    Ship.find()
        .then((shipResults) => res.json(shipResults))
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    Ship.create(req.body) //Add the ship number to the database
        .then((result) => console.log(result))
        .catch((err) => {
            console.log(err);
            res.end("Error adding ship to database.");
        });
});

module.exports = router;