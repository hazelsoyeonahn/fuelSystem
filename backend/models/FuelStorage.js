//Set up the underlying model for the static fuel storage database
const mongoose = require('mongoose');

const FuelStorageSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    fuelCapacity : {
        type: Number,
        required: true
    }
});

const FuelStorage = mongoose.model(
    "FuelStorage",
    FuelStorageSchema 
);

module.exports = FuelStorage;