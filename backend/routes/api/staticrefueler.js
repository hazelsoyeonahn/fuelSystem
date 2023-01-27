const express = require('express');
const router = express.Router();
const StaticRefueler = require('../../models/StaticRefueler');

//Endpoint for when the root webpage receives a get request
router.get('/', (req, res) => {
    StaticRefueler.find()
        .then((shipResults) => res.json(shipResults))
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    StaticRefueler.create(req.body) //Add the NFI to the database
        .then((result) => console.log(result))
        .catch((err) => {
            console.log(err);
            res.end("Error adding refueler to database.");
        });
});

module.exports = router;