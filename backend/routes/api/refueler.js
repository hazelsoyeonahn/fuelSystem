const express = require('express');
const router = express.Router();
const Refueler = require('../../models/Refueler');

//Endpoint for when the root webpage receives a get request
router.get('/', (req, res) => {
    Refueler.find()
        .then((shipResults) => res.json(shipResults))
        .catch((err) => console.log(err));
});

router.post('/', (req, res) => {
    Refueler.create(req.body) //Add the NFI to the database
        .then((result) => console.log(result))
        .catch((err) => {
            console.log(err);
            res.end("Error adding refueler to database.");
        });
});

module.exports = router;