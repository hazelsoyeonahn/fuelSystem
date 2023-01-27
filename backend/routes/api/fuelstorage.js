const express = require('express');
const router = express.Router();
const FuelStorage = require('../../models/FuelStorage');


//Endpoint for when the root webpage receives a get request
router.get('/', (req, res) => {
    FuelStorage.find()
        .then((shipResults) => res.json(shipResults))
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    FuelStorage.create(req.body) //Add the storage unit to the database
        .then((result) => console.log(result))
        .catch((err) => {
            console.log(err);
            res.end("Error adding static fuel storage to database.");
        });
});

module.exports = router;