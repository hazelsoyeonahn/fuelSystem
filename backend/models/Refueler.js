//Set up the underlying model for the refueler database
const mongoose = require('mongoose');

const RefuelerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    throughput: {
        type: Number
    }
});

const Refueler = mongoose.model(
    "Refueler",
    RefuelerSchema
);

module.exports = Refueler;