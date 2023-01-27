//Set up the underlying model for the refueler database
const mongoose = require('mongoose');

const StaticRefuelerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    throughput: {
        type: Number
    }
});

const Refueler = mongoose.model(
    "StaticRefueler",
    StaticRefuelerSchema
);

module.exports = Refueler;