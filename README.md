# fuelSystem
Proof of Concept for a fuel management system

The Project
This project consists of a full-stack web application written in React and Node.js for the purpose of making future predictions on time-series data. The front-end component of this application is a web application into which a user is able to upload Excel-formatted data for submission to a back-end written in Node. A machine learning approach is used to generate these predictions using Tensorflow.js.

The Node back-end contains database functionality and basic data processing/a neural network in order to train on the time-related features of the uploaded data. After this training is complete, a prediction is sent back to the front-end and displayed on a graph for up to 24 months. The training parameters of the neural network can be tweaked by the user in the front-end, with the user able to immediately re-train and generate a new prediction.

The resulting predictions can then be exported back out to Excel for further processing or analysis. The current application of this project is to forecast the consumption of fuel based on historical values, but will currently work with any time-series data.

Built With
React
MongoDB
Tensorflow
Node
Getting Started
Prerequisites
Latest version of node.js https://nodejs.org/en/
Latest version of mongo https://www.mongodb.com/
Tested on both MacOS 10 and Windows 10
Installation and getting up and running
git clone https://github.com/ChalzZy/nzdf-fuel-management
Initialise Frontend

from root cd frontend/fuel-management-app
npm install
npm start
Initalise Backend

from root cd backend
npm install
create '.env' file inside the root of the backend folder.
Inside the .env file, add (Ensure you have mongo installed on your local machine): MONGODB_CONNECTION_STRING="mongodb://localhost:27017"
npm start
Usage of the application

Goto http://localhost:3000
In the root of this repository is a file called "upload_this.xlsx". Upload that on the home page of the application.
The application should now predict future fuel usage.
Codebase Structure
Frontend
The React front-end source code can be found in frontend/fuel-management-app/src.

App.js - the entry point for the program, which loads in the GUI using files in the components subfolder.
Components - contains all of the React components used in this project. Currently in use is Graph.js, which contains all functionality pertaining to:
Uploading a file to the server
Rendering the graph of historical and predicted consumption values
Rendering a table of historical and predicted consumption values
Receiving user input affecting the neural network training parameters
Sending this input to the server
Receiving user input about contingency and fuel reserves
Exporting an .xlsx file containing the predicted consumption values
The other files in the Components subfolder are no longer in use, but are kept for documentation and potential expansion purposes.
Front-end styling is done using react-bootstrap.
The graph is drawn using the recharts library for React.
Backend
Directory structure

*.env

This contains a MongoDB connection string to a running MongoDB database, and must be created for database connectivity to function. As this contains a username and password.
The current format of our MongoDB connection string is:
MONGODB_CONNECTION_STRING="mongodb+srv://[username:password]@[URL]/data?retryWrites=true&w=majority"
Additional documentation on MongoDB connection strings can be found here: https://www.mongodb.com/docs/manual/reference/connection-string/
Config

Contains Node.js code to connect to the database using the above connection string.
Models

Inside this folder are four Node.js files that define the tables in the database and their associated fields. Currently, these are:
FuelStorage.js - Defines a table for static fuel tankers
Refueler.js - Defines a table for refuelling lines
Ship.js - Defines a table for ships
StaticRefueler.js - Currently unused.
The associated fields for each of these tables can be found inside their respective files.
Routes/api

Defines API endpoints that allow the front-end to interact with serverside code using HTTP requests.

Algorithm.js - Provides HTTP endpoints for graph generation, training the neural network, performing validation, and generating predictions.

The generateGraph endpoint acts as a complete call to all other endpoints necessary to train, validate, and create predictions.
Fuelstorage.js, refueler.js, ship.js, and staticrefueler.js

Provide HTTP endpoints for database querying.
GET: retrieve all records from the respectively named database.
POST: add a new record to the respectively named database.
e.g., a GET query to the ‘ship’ endpoint will return all ships.
Index.js

Packages all of the above endpoints into one file, so that they can be imported with one statement: require(‘routes/api’).
Static-data

Contains any dummy data files or class structures we have created for testing.
There are currently two json files inside that have sample fuel consumption data for testing purposes, sourced in collaboration with a Babcock client.
Tensorflow

Contains all files related to data preprocessing and the neural network model.
Algorithm.js
Provides a wide set of functions for preprocessing data into windows, training and validating the dataset using the processed data, and generating predictions.
The default training parameters for the neural network are stored in this file, but can be overridden by the user in the routes/api/Algorithm.js API endpoint.
Model.js
Defines the neural network model using TensorFlow as a densely-connected neural network with one hidden layer consisting of five neurons.
Currently, the model is initialized when trainModel is called, which simultaneously trains the model on an input dataset generated using Algorithm.js.
An alternative LSTM model is provided, but is commented out for now.
Also includes functions to normalize the input dataset prior to training.
Test
Used to store unit tests for any of the above files or directories.
The testing framework used is the supertest NPM library.
The test.js file contains a sanity check to ensure that the testing library is working as expected.
Tensorflow Demo (Deprecated)
Included is a fork of a Tensorflow demo project that was originally used to predict stock prices: https://jinglescode.github.io/time-series-forecasting-tensorflowjs/

As the neural network and relevant datasets are now fully integrated into the back-end, there is no need to use this project.

However, as it runs locally without being dependent on any specific user input, dataset, or the server itself running, it can be useful to modify for testing new features or model adjustments.
