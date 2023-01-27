//Set up the underlying model for the ships database
const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    fuelCapacity : {
        type: Number,
        required: true
    },
    fuelConsumption : {
        type: Number
    },
    isTanker : {
        type: Boolean, 
        default: false
    },
    tankerCapacity: {
        type: Number,
        default: 0
    }
});

const Ship = mongoose.model(
    "Ship",
    ShipSchema
);

module.exports = Ship;