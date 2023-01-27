const { resolveNaptr } = require("dns");
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const hostname = "127.0.0.1";
const port = 3001;

const app = express();
app.use(express.json());
//import routes
const dbEndpoints = require("./routes/api");

//Set up CORS headers for testing compatibility
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

//Apply the routes in routes/api/ to their /api/ endpoints
app.use("/api/ship", dbEndpoints.ship);
app.use("/api/fuelstorage", dbEndpoints.fuelstorage);
app.use("/api/refueler", dbEndpoints.refueler);
app.use("/api/staticrefueler", dbEndpoints.staticrefueler);
app.use("/api/algorithm", dbEndpoints.algorithm);

app.post('/', (req, res) => {
    console.log(`Received POST request: ${JSON.stringify(req.body)}`);
    res.json(req.body); //Send body back as a response
    res.end();
});

if (process.env.NODE_ENV !== 'test') {
    connectDB();
    app.listen(port, hostname, () => {
        console.log(`Express server running at http://${hostname}:${port}/`);
    });
}

module.exports = app
