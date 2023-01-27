const tf = require("@tensorflow/tfjs")
require("@tensorflow/tfjs-node")

var modelInfo = {}

async function trainModel(X, Y, window_size, n_epochs, learning_rate, batch_size, callback) {
	console.log(`Epochs: ${n_epochs}\nWindow Size: ${window_size}\nBatch Size: ${batch_size}\nLearning Rate: ${learning_rate}`)
	// input dense layer
	const input_layer_shape = window_size
	const input_layer_neurons = 10
	// LSTM
	const rnn_input_layer_features = 16
	const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features
	const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps] // the shape have to match input layer's shape
	const rnn_output_neurons = 16 // number of neurons per LSTM's cell

	// output dense layer
	const output_layer_shape = rnn_output_neurons // dense layer input size is same as LSTM cell
	const output_layer_neurons = 1 // return 1 value

	// ## old method
	// const xs = tf.tensor2d(X, [X.length, X[0].length])//.div(tf.scalar(10));
	// const ys = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1])//.div(tf.scalar(10));

	// ## new: load data into tensor and normalize data
	const inputTensor = tf.tensor2d(X, [X.length, X[0].length])
	const labelTensor = tf.tensor(Y)

	const [xs, inputMax, inputMin] = normalizeTensorFit(inputTensor)
	const [ys, labelMax, labelMin] = normalizeTensorFit(labelTensor)

	// ## define model

	const model = tf.sequential()
	model.add(tf.layers.dense({units: input_layer_neurons, inputShape: [input_layer_shape]}));
    model.add(tf.layers.dense({units: input_layer_neurons}));
    model.add(tf.layers.dense({units: output_layer_neurons}));



	/*
	model.add(
		tf.layers.dense({
			units: input_layer_neurons,
			inputShape: [input_layer_shape],
		})
	)
	model.add(tf.layers.reshape({ targetShape: rnn_input_shape }))

	let lstm_cells = []
	for (let index = 0; index < n_layers; index++) {
		lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }))
	}

	model.add(
		tf.layers.rnn({
			cell: lstm_cells,
			inputShape: rnn_input_shape,
			returnSequences: false,
		})
	)

	model.add(
		tf.layers.dense({
			units: output_layer_neurons,
			inputShape: [output_layer_shape],
		})
	)
	*/

	model.compile({
		optimizer: tf.train.adam(learning_rate),
		loss: "meanSquaredError",
	})

	// ## fit model

	const hist = await model.fit(xs, ys, {
		batchSize: batch_size,
		epochs: n_epochs,
		callbacks: {
			onEpochEnd: async (epoch, log) => {
				callback(epoch, log)
			},
		},
	})

	//Store the model so that it can be exported
	modelInfo = {
		model: model,
		stats: hist,
		normalize: {
			inputMax: inputMax,
			inputMin: inputMin,
			labelMax: labelMax,
			labelMin: labelMin,
		},
	}

	// return { model: model, stats: hist };
	return modelInfo
}

function makePredictions(X, model, dict_normalize, a) {
	// const predictedResults = model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))).mul(10); // old method

	X = tf.tensor(X, [X.length, X[0].length])
	const normalizedInput = normalizeTensor(X, dict_normalize["inputMax"], dict_normalize["inputMin"])
	const model_out = model.predict(normalizedInput, {batchSize : 16})
	const predictedResults = unNormalizeTensor(model_out, dict_normalize["labelMax"], dict_normalize["labelMin"])
	return Array.from(predictedResults.dataSync())
}

function normalizeTensorFit(tensor) {
	const maxval = tensor.max()
	const minval = tensor.min()
	const normalizedTensor = normalizeTensor(tensor, maxval, minval)
	return [normalizedTensor, maxval, minval]
}

function normalizeTensor(tensor, maxval, minval) {
	const normalizedTensor = tensor.sub(minval).div(maxval.sub(minval))
	return normalizedTensor
}

function unNormalizeTensor(tensor, maxval, minval) {
	const unNormTensor = tensor.mul(maxval.sub(minval)).add(minval)
	return unNormTensor
}

module.exports = {
	trainModel,
	makePredictions,
	normalizeTensorFit,
	normalizeTensor,
	unNormalizeTensor,
	modelInfo,
}
