const express = require("express")
const router = express.Router()
const FuelAlgorithm = require("../../tensorflow/algorithm.js")
const numPredictions = 20

router.post("/generateGraph", (req, res) => {
	//Parse query parameters, or assign default values if none received
	console.log(req.query)
	const parsedQueryData = {}
	//Parse to float, or use defaults if  invalid data was received
	for(let key in req.query) {
		const asFloat = parseFloat(req.query[key])
		parsedQueryData[key] = !isNaN(asFloat) ? asFloat : FuelAlgorithm.defaultTrainingParams[key]
	}

	const data = req.body
	FuelAlgorithm.dataProcessWindows(data, parsedQueryData["windowSize"])
	FuelAlgorithm.beginTrainModel(parsedQueryData["epochs"], parsedQueryData["learningRate"], parsedQueryData["batchSize"])
		.then(() => {
			const validationData = FuelAlgorithm.validate(data)
			const predictionData = FuelAlgorithm.predict(parsedQueryData["numPredictions"], data)
		
			//Join the end of the historical data to the beginning of the prediction data to keep the graph continuous in the front-end
			validationData[validationData.length - 1]["prediction"] = validationData[validationData.length - 1]["unseen"]
			const extendedValidation =  [...validationData, ...predictionData]
			res.json(extendedValidation)
		})
		.catch((err) => {
			console.log(err)
			res.send("ERROR: Model training failed.")
		})	
})

//Endpoint for when the root webpage receives a get request
router.get("/train", (req, res) => {
    FuelAlgorithm.dataProcessWindows()
	FuelAlgorithm.beginTrainModel()
		.then((model) => {
			res.json(model)
		})
		.catch((err) => {
			console.log(err)
			res.send("ERROR: Model training failed.")
		})
})

router.get("/validate", (req, res) => {
	var validationData = FuelAlgorithm.validate()
	res.json(validationData)
})

router.get("/predict", (req, res) => {
	const validationData = FuelAlgorithm.validate()
	const predictionData = FuelAlgorithm.predict(numPredictions)

	//Join the end of the historical data to the beginning of the prediction data to keep the graph continuous in the front-end
	validationData[validationData.length - 1]["prediction"] = validationData[validationData.length - 1]["unseen"]
	const extendedValidation =  [...validationData, ...predictionData]
	res.json(extendedValidation)
})

module.exports = router
