let result = []

//load dummy data
const fs = require("fs")
const path = require("path")
//var data_raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../static-data/btsAirlineData.json"), "utf8"))
// const data_raw = require("../static-data/australianPetroleumRefinery.json")
//load tensorflow model library
const model = require("./model.js")

//Default training hyperparameters
const DEFAULT_EPOCHS = 15
const DEFAULT_WINDOWSIZE = 20
const DEFAULT_BATCHSIZE = 16
const DEFAULT_LEARNINGRATE = 0.01
const DEFAULT_NUMPREDICTIONS = 20

let window_vec = []
let window_size = DEFAULT_WINDOWSIZE
let trainingsize = 75

function main() {
	dataProcessWindows()
	beginTrainModel().then(() => {
		validate()
		predict(20)
	})
}

function createNoiseDataset() {
	//Replace the dataset with a sine wave with an upward trend and random noise to observe how well the algorithm
	//learns seasonality and overall trends, and how isolated it is from noise
	let base = 1000
	let trendGradient = 9
	let sineFreq = 0.75
	let sineAmp = 250
	let randomAmp = 300

	data_raw.forEach((e, i) => {
		e["consumption"] = base + i * trendGradient + Math.sin(i * sineFreq) * sineAmp + (Math.random() - 0.5) * randomAmp
	})
}

// createNoiseDataset()

function dataProcessWindows(data_raw, size) {
	window_size = size
	window_vec = ProcessWindows(data_raw, window_size) //Window the data

	let sma = window_vec.map(function (val) {
		return val["label"]
	}) //Extract the labels from the windowed dataset
	let consumptions = data_raw.map(function (val) {
		return val["consumption"] 
	}) //Extract the consumptions from the raw consumption data

	let timestamps_a = data_raw.map(function (val) {
		return val["timestamp"]
	}) //Extract the timestamps for the original data
	let timestamps_b = data_raw
		.map(function (val) {
			return val["timestamp"]
		})
		.splice(window_size, data_raw.length) //Extract the timestamps for the labels

	return [
		[timestamps_a, consumptions],
		[timestamps_b, sma],
	]
}

async function beginTrainModel(n_epochs, learningrate, batchSize) {
	let epoch_loss = [] //Set up an array to show the loss for each epoch

	let inputs = window_vec.map(function (inp_f) {
		return inp_f["set"].map(function (val) {
			return parseFloat(val["consumption"])
		})
	}) //Extract the set of fuel consumption values from the windowed dataset to feed into the training model
	let outputs = window_vec.map(function (outp_f) {
		return outp_f["label"]
	}) //Extract the calculated moving averages, to act as labels for the model to assign the fuel consumption values to as part of its training process

	inputs = inputs.slice(0, Math.floor((trainingsize / 100) * inputs.length)) //Extract out only the proportion of data that we will be using for training, leaving the rest for validation
	outputs = outputs.slice(0, Math.floor((trainingsize / 100) * outputs.length))

	//Display the training progress. Update the page with loss information and a loss graph with each training epoch
	let callback = function (epoch, log) {
		epoch_loss.push(log.loss)
	}

	//Commence model training
	result = await model.trainModel(inputs, outputs, window_size, n_epochs, learningrate, batchSize, callback)
}

function validate(data_raw) {
	//Get the fuel consumption values from the windowed set (the set we are training on)
	let inputs = window_vec.map(function (inp_f) {
		return inp_f["set"].map(function (val) {
			return parseFloat(val["consumption"])
		})
	})

	//Slice out the training set
	let val_train_x = inputs.slice(0, Math.floor((trainingsize / 100) * inputs.length))
	//Make predictions on what the corresponding moving average is for the received data. This should be very close to the actual SMA because this is done on the training data
	let val_train_y = model.makePredictions(val_train_x, result["model"], result["normalize"])

	//Slice out the validation set
	let val_unseen_x = inputs.slice(Math.floor((trainingsize / 100) * inputs.length), inputs.length)
	//Make predictions on what the corresponding moving average is for the unseen data. This will be the algorithm's real prediction as it has not seen the validation set before
	let val_unseen_y = model.makePredictions(val_unseen_x, result["model"], result["normalize"])

	//Get the corresponding x-axis values (timestamps)
	let timestamps_a = data_raw.map(function (val) {
		return val["timestamp"]
	}) //Get the timestamps for the actual data

	let consumptions = data_raw.map(function (val) {
		return parseFloat(val["consumption"])
	}) //Get the real fuel consumption data

	let validationStartPoint = window_size //How far into the original timestamps dataset the validation set begins
	let unseenStartPoint = window_size + Math.floor((trainingsize / 100) * inputs.length) //How far into the original timestamps dataset the unseen set begins
	val_train_y.push(val_unseen_y[0]) //Add the first unseen prediction to the end of the validation set to keep the graph continuous
	return timestamps_a.map((e, i) => {
		return {
			timestamp: e,
			consumption: consumptions[i],
			validation: val_train_y[i - validationStartPoint], //Offset into the training arrays to ensure the timestamps are aligned with the full historical dataset
			unseen: val_unseen_y[i - unseenStartPoint]
		}
	})
}

function predict(numPredictions, data_raw) {
	//Get the fuel consumption values from the SMA set
	let inputs = window_vec.map(function (inp_f) {
		return inp_f["set"].map(function (val) {
			return parseFloat(val["consumption"])
		})
	})


	const pred_y = []
	let pred_X = inputs[inputs.length - 1]
	for (let i = numPredictions; i > 0; i--) {
		let predictedNext = model.makePredictions([pred_X], result["model"], result["normalize"])
		pred_X.shift()
		pred_X.push(predictedNext)
		pred_y.push(predictedNext)
	}

	//Generate predicted fuel consumption values
	const timestamp_last = data_raw[data_raw.length - 1]["timestamp"]

	//Generate the timestamps associated with the next time frames to show the predicted data points on the graph
	const timestamps_e = []

	const parseDMY = (s) => {
		let [d, m, y] = s.split(/\D/)
		return new Date(y, m - 1, d)
	}

	//Format for dd/mm/yyyy
	let last_date = parseDMY(timestamp_last)
	for (let i = 0; i < numPredictions; i++) {
		//Add one month to the prediction
		last_date.setMonth(last_date.getMonth() + 1)
		timestamps_e.push(formatDate(last_date))
	}
	//Plot the predicted value on the graph

	let timestamps_predictions = timestamps_e.map((e, i) => {
		return {
			timestamp: e,
			prediction: pred_y[i][0], //pred_y[i] is a 1-element array containing the predicted value, so flatten the array into a single number
		}
	})

	return timestamps_predictions
}

function ProcessWindows(data, window_size) {
	/*Groups the input data for processing using a sliding window of window_size. For each window, a training label is made using the first consumption value in the next window.*/
	let windowedData = []
	for (let i = 0; i < data.length - window_size; i++) {
		windowedData.push({ set: data.slice(i, i + window_size), label: parseFloat(data[i + window_size]["consumption"]) })
	}
	return windowedData
}

function formatDate(date) {
	let month = "" + (date.getMonth() + 1)
	let day = "" + date.getDate()
	let year = date.getFullYear()
	if (month.length < 2) month = "0" + month
	return day + "/" + month + "/" + year
}

const defaultTrainingParams = {
	"batchSize" : DEFAULT_BATCHSIZE,
	"epochs" : DEFAULT_EPOCHS,
	"learningRate" : DEFAULT_LEARNINGRATE,
	"numPredictions" : DEFAULT_NUMPREDICTIONS,
	"windowSize" : DEFAULT_WINDOWSIZE
}


module.exports = {
	dataProcessWindows,
	beginTrainModel,
	validate,
	predict,
	defaultTrainingParams
}
