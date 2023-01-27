let input_dataset = [];
let result = [];
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

//Raw fuel data pasted in from rawDataCombined.json
let data_raw = [{ "timestamp": "1-01/2000", "consumption": "4196.5" }, { "timestamp": "1-02/2000", "consumption": "4044.3" }, { "timestamp": "1-03/2000", "consumption": "4445.2" }, { "timestamp": "1-04/2000", "consumption": "4335.4" }, { "timestamp": "1-05/2000", "consumption": "4444.8" }, { "timestamp": "1-06/2000", "consumption": "4481.2" }, { "timestamp": "1-07/2000", "consumption": "4633" }, { "timestamp": "1-08/2000", "consumption": "4652.3" }, { "timestamp": "1-09/2000", "consumption": "4160.2" }, { "timestamp": "1-10/2000", "consumption": "4525.8" }, { "timestamp": "1-11/2000", "consumption": "4360.4" }, { "timestamp": "1-12/2000", "consumption": "4352.8" }, { "timestamp": "1-01/2001", "consumption": "4366.1" }, { "timestamp": "1-02/2001", "consumption": "4038.3" }, { "timestamp": "1-03/2001", "consumption": "4473.2" }, { "timestamp": "1-04/2001", "consumption": "4256.3" }, { "timestamp": "1-05/2001", "consumption": "4449.4" }, { "timestamp": "1-06/2001", "consumption": "4483.4" }, { "timestamp": "1-07/2001", "consumption": "4594.4" }, { "timestamp": "1-08/2001", "consumption": "4715.9" }, { "timestamp": "1-09/2001", "consumption": "3363.3" }, { "timestamp": "1-10/2001", "consumption": "3678.3" }, { "timestamp": "1-11/2001", "consumption": "3540.5" }, { "timestamp": "1-12/2001", "consumption": "3675.3" }, { "timestamp": "1-01/2002", "consumption": "3690" }, { "timestamp": "1-02/2002", "consumption": "3433.7" }, { "timestamp": "1-03/2002", "consumption": "3946.7" }, { "timestamp": "1-04/2002", "consumption": "3813" }, { "timestamp": "1-05/2002", "consumption": "3942.5" }, { "timestamp": "1-06/2002", "consumption": "4022.8" }, { "timestamp": "1-07/2002", "consumption": "4197.6" }, { "timestamp": "1-08/2002", "consumption": "4187" }, { "timestamp": "1-09/2002", "consumption": "3708.6" }, { "timestamp": "1-10/2002", "consumption": "3989.1" }, { "timestamp": "1-11/2002", "consumption": "3743.8" }, { "timestamp": "1-12/2002", "consumption": "3837.3" }, { "timestamp": "1-01/2003", "consumption": "3889.9" }, { "timestamp": "1-02/2003", "consumption": "3516.3" }, { "timestamp": "1-03/2003", "consumption": "4016.7" }, { "timestamp": "1-04/2003", "consumption": "3771" }, { "timestamp": "1-05/2003", "consumption": "3869.1" }, { "timestamp": "1-06/2003", "consumption": "3941" }, { "timestamp": "1-07/2003", "consumption": "4184" }, { "timestamp": "1-08/2003", "consumption": "4176.1" }, { "timestamp": "1-09/2003", "consumption": "3761.2" }, { "timestamp": "1-10/2003", "consumption": "3993.6" }, { "timestamp": "1-11/2003", "consumption": "3813.8" }, { "timestamp": "1-12/2003", "consumption": "4070.8" }, { "timestamp": "1-01/2004", "consumption": "4032.2" }, { "timestamp": "1-02/2004", "consumption": "3908.1" }, { "timestamp": "1-03/2004", "consumption": "4317.3" }, { "timestamp": "1-04/2004", "consumption": "4142.8" }, { "timestamp": "1-05/2004", "consumption": "4241.2" }, { "timestamp": "1-06/2004", "consumption": "4301.4" }, { "timestamp": "1-07/2004", "consumption": "4472.8" }, { "timestamp": "1-08/2004", "consumption": "4487.2" }, { "timestamp": "1-09/2004", "consumption": "4005.7" }, { "timestamp": "1-10/2004", "consumption": "4307.4" }, { "timestamp": "1-11/2004", "consumption": "4106.4" }, { "timestamp": "1-12/2004", "consumption": "4326" }, { "timestamp": "1-01/2005", "consumption": "4106" }, { "timestamp": "1-02/2005", "consumption": "3849.8" }, { "timestamp": "1-03/2005", "consumption": "4402.1" }, { "timestamp": "1-04/2005", "consumption": "4159" }, { "timestamp": "1-05/2005", "consumption": "4253.3" }, { "timestamp": "1-06/2005", "consumption": "4349.1" }, { "timestamp": "1-07/2005", "consumption": "4518.6" }, { "timestamp": "1-08/2005", "consumption": "4487.2" }, { "timestamp": "1-09/2005", "consumption": "3991.3" }, { "timestamp": "1-10/2005", "consumption": "4020.1" }, { "timestamp": "1-11/2005", "consumption": "3994" }, { "timestamp": "1-12/2005", "consumption": "4155.6" }, { "timestamp": "1-01/2006", "consumption": "3967.1" }, { "timestamp": "1-02/2006", "consumption": "3661.3" }, { "timestamp": "1-03/2006", "consumption": "4232.1" }, { "timestamp": "1-04/2006", "consumption": "4053.4" }, { "timestamp": "1-05/2006", "consumption": "4106.8" }, { "timestamp": "1-06/2006", "consumption": "4229.4" }, { "timestamp": "1-07/2006", "consumption": "4322.6" }, { "timestamp": "1-08/2006", "consumption": "4393" }, { "timestamp": "1-09/2006", "consumption": "3982.3" }, { "timestamp": "1-10/2006", "consumption": "4146.5" }, { "timestamp": "1-11/2006", "consumption": "4018.6" }, { "timestamp": "1-12/2006", "consumption": "4170.4" }, { "timestamp": "1-01/2007", "consumption": "4020.9" }, { "timestamp": "1-02/2007", "consumption": "3672.2" }, { "timestamp": "1-03/2007", "consumption": "4213.9" }, { "timestamp": "1-04/2007", "consumption": "4072.7" }, { "timestamp": "1-05/2007", "consumption": "4170.8" }, { "timestamp": "1-06/2007", "consumption": "4218.8" }, { "timestamp": "1-07/2007", "consumption": "4327.5" }, { "timestamp": "1-08/2007", "consumption": "4380.5" }, { "timestamp": "1-09/2007", "consumption": "3930.8" }, { "timestamp": "1-10/2007", "consumption": "4133.7" }, { "timestamp": "1-11/2007", "consumption": "3965.2" }, { "timestamp": "1-12/2007", "consumption": "4099.6" }, { "timestamp": "1-01/2008", "consumption": "4056.4" }, { "timestamp": "1-02/2008", "consumption": "3882.7" }, { "timestamp": "1-03/2008", "consumption": "4231.7" }, { "timestamp": "1-04/2008", "consumption": "4011" }, { "timestamp": "1-05/2008", "consumption": "4117.4" }, { "timestamp": "1-06/2008", "consumption": "4144.3" }, { "timestamp": "1-07/2008", "consumption": "4288.9" }, { "timestamp": "1-08/2008", "consumption": "4169.6" }, { "timestamp": "1-09/2008", "consumption": "3502.6" }, { "timestamp": "1-10/2008", "consumption": "3665.4" }, { "timestamp": "1-11/2008", "consumption": "3441.3" }, { "timestamp": "1-12/2008", "consumption": "3690.8" }, { "timestamp": "1-01/2009", "consumption": "3490.5" }, { "timestamp": "1-02/2009", "consumption": "3216.1" }, { "timestamp": "1-03/2009", "consumption": "3657.8" }, { "timestamp": "1-04/2009", "consumption": "3542" }, { "timestamp": "1-05/2009", "consumption": "3593.5" }, { "timestamp": "1-06/2009", "consumption": "3683.6" }, { "timestamp": "1-07/2009", "consumption": "3885" }, { "timestamp": "1-08/2009", "consumption": "3670" }, { "timestamp": "1-09/2009", "consumption": "3296.3" }, { "timestamp": "1-10/2009", "consumption": "3457.6" }, { "timestamp": "1-11/2009", "consumption": "3198.7" }, { "timestamp": "1-12/2009", "consumption": "3507.2" }, { "timestamp": "1-01/2010", "consumption": "3303.5" }, { "timestamp": "1-02/2010", "consumption": "2978.7" }, { "timestamp": "1-03/2010", "consumption": "3513.6" }, { "timestamp": "1-04/2010", "consumption": "3410.3" }, { "timestamp": "1-05/2010", "consumption": "3558.3" }, { "timestamp": "1-06/2010", "consumption": "3633.2" }, { "timestamp": "1-07/2010", "consumption": "3826.3" }, { "timestamp": "1-08/2010", "consumption": "3764.2" }, { "timestamp": "1-09/2010", "consumption": "3463.3" }, { "timestamp": "1-10/2010", "consumption": "3501.5" }, { "timestamp": "1-11/2010", "consumption": "3375.5" }, { "timestamp": "1-12/2010", "consumption": "3526.1" }, { "timestamp": "1-01/2011", "consumption": "3261.5" }, { "timestamp": "1-02/2011", "consumption": "3006.4" }, { "timestamp": "1-03/2011", "consumption": "3573.4" }, { "timestamp": "1-04/2011", "consumption": "3443.6" }, { "timestamp": "1-05/2011", "consumption": "3489.8" }, { "timestamp": "1-06/2011", "consumption": "3610.1" }, { "timestamp": "1-07/2011", "consumption": "3705.2" }, { "timestamp": "1-08/2011", "consumption": "3607.1" }, { "timestamp": "1-09/2011", "consumption": "3280.8" }, { "timestamp": "1-10/2011", "consumption": "3387.9" }, { "timestamp": "1-11/2011", "consumption": "3255.1" }, { "timestamp": "1-12/2011", "consumption": "3367.9" }, { "timestamp": "1-01/2012", "consumption": "3060.5" }, { "timestamp": "1-02/2012", "consumption": "2984" }, { "timestamp": "1-03/2012", "consumption": "3373.9" }, { "timestamp": "1-04/2012", "consumption": "3198.3" }, { "timestamp": "1-05/2012", "consumption": "3350.1" }, { "timestamp": "1-06/2012", "consumption": "3428.4" }, { "timestamp": "1-07/2012", "consumption": "3477.7" }, { "timestamp": "1-08/2012", "consumption": "3425" }, { "timestamp": "1-09/2012", "consumption": "3089.3" }, { "timestamp": "1-10/2012", "consumption": "3133.6" }, { "timestamp": "1-11/2012", "consumption": "3011.3" }, { "timestamp": "1-12/2012", "consumption": "3223.3" }, { "timestamp": "1-01/2013", "consumption": "3066.2" }, { "timestamp": "1-02/2013", "consumption": "2791.7" }, { "timestamp": "1-03/2013", "consumption": "3296.3" }, { "timestamp": "1-04/2013", "consumption": "3177.5" }, { "timestamp": "1-05/2013", "consumption": "3285" }, { "timestamp": "1-06/2013", "consumption": "3367.5" }, { "timestamp": "1-07/2013", "consumption": "3505.7" }, { "timestamp": "1-08/2013", "consumption": "3397" }, { "timestamp": "1-09/2013", "consumption": "3023.8" }, { "timestamp": "1-10/2013", "consumption": "3179" }, { "timestamp": "1-11/2013", "consumption": "3035.5" }, { "timestamp": "1-12/2013", "consumption": "3320.6" }, { "timestamp": "1-01/2014", "consumption": "3004.5" }, { "timestamp": "1-02/2014", "consumption": "2792.9" }, { "timestamp": "1-03/2014", "consumption": "3341" }, { "timestamp": "1-04/2014", "consumption": "3221.8" }, { "timestamp": "1-05/2014", "consumption": "3308.5" }, { "timestamp": "1-06/2014", "consumption": "3411.4" }, { "timestamp": "1-07/2014", "consumption": "3513.2" }, { "timestamp": "1-08/2014", "consumption": "3408.4" }, { "timestamp": "1-09/2014", "consumption": "3113.5" }, { "timestamp": "1-10/2014", "consumption": "3302.8" }, { "timestamp": "1-11/2014", "consumption": "3141.9" }, { "timestamp": "1-12/2014", "consumption": "3402.7" }, { "timestamp": "1-01/2015", "consumption": "3129.8" }, { "timestamp": "1-02/2015", "consumption": "2858" }, { "timestamp": "1-03/2015", "consumption": "3430" }, { "timestamp": "1-04/2015", "consumption": "3346.7" }, { "timestamp": "1-05/2015", "consumption": "3444" }, { "timestamp": "1-06/2015", "consumption": "3554.5" }, { "timestamp": "1-07/2015", "consumption": "3735.1" }, { "timestamp": "1-08/2015", "consumption": "3623.4" }, { "timestamp": "1-09/2015", "consumption": "3244.5" }, { "timestamp": "1-10/2015", "consumption": "3412.9" }, { "timestamp": "1-11/2015", "consumption": "3300.5" }, { "timestamp": "1-12/2015", "consumption": "3581.4" }, { "timestamp": "1-01/2016", "consumption": "3239.2" }, { "timestamp": "1-02/2016", "consumption": "3121.8" }, { "timestamp": "1-03/2016", "consumption": "3573.1" }, { "timestamp": "1-04/2016", "consumption": "3419.7" }, { "timestamp": "1-05/2016", "consumption": "3598" }, { "timestamp": "1-06/2016", "consumption": "3755.9" }, { "timestamp": "1-07/2016", "consumption": "3889.9" }, { "timestamp": "1-08/2016", "consumption": "3810.8" }, { "timestamp": "1-09/2016", "consumption": "3396.7" }, { "timestamp": "1-10/2016", "consumption": "3481.4" }, { "timestamp": "1-11/2016", "consumption": "3353.9" }, { "timestamp": "1-12/2016", "consumption": "3632.5" }, { "timestamp": "1-01/2017", "consumption": "3340.2" }, { "timestamp": "1-02/2017", "consumption": "3043.5" }, { "timestamp": "1-03/2017", "consumption": "3652.9" }, { "timestamp": "1-04/2017", "consumption": "3479.6" }, { "timestamp": "1-05/2017", "consumption": "3648.8" }, { "timestamp": "1-06/2017", "consumption": "3818.3" }, { "timestamp": "1-07/2017", "consumption": "3927.4" }, { "timestamp": "1-08/2017", "consumption": "3899.7" }, { "timestamp": "1-09/2017", "consumption": "3328.9" }, { "timestamp": "1-10/2017", "consumption": "3609" }, { "timestamp": "1-11/2017", "consumption": "3489" }, { "timestamp": "1-12/2017", "consumption": "3690.8" }, { "timestamp": "1-01/2018", "consumption": "3447.4" }, { "timestamp": "1-02/2018", "consumption": "3221" }, { "timestamp": "1-03/2018", "consumption": "3748.7" }, { "timestamp": "1-04/2018", "consumption": "3654.4" }, { "timestamp": "1-05/2018", "consumption": "3830.1" }, { "timestamp": "1-06/2018", "consumption": "3931.5" }, { "timestamp": "1-07/2018", "consumption": "4082.2" }, { "timestamp": "1-08/2018", "consumption": "4054.6" }, { "timestamp": "1-09/2018", "consumption": "3596.5" }, { "timestamp": "1-10/2018", "consumption": "3799.8" }, { "timestamp": "1-11/2018", "consumption": "3674.1" }, { "timestamp": "1-12/2018", "consumption": "3810.8" }, { "timestamp": "1-01/2019", "consumption": "3587.4" }, { "timestamp": "1-02/2019", "consumption": "3311.1" }, { "timestamp": "1-03/2019", "consumption": "3906.2" }, { "timestamp": "1-04/2019", "consumption": "3756.3" }, { "timestamp": "1-05/2019", "consumption": "3963.7" }, { "timestamp": "1-06/2019", "consumption": "4012.9" }, { "timestamp": "1-07/2019", "consumption": "4162.8" }, { "timestamp": "1-08/2019", "consumption": "4124.2" }, { "timestamp": "1-09/2019", "consumption": "3643.8" }, { "timestamp": "1-10/2019", "consumption": "3910.3" }, { "timestamp": "1-11/2019", "consumption": "3734.3" }, { "timestamp": "1-12/2019", "consumption": "4008.8" }, { "timestamp": "1-01/2020", "consumption": "3718.4" }, { "timestamp": "1-02/2020", "consumption": "3508.7" }, { "timestamp": "1-03/2020", "consumption": "3210.8" }, { "timestamp": "1-04/2020", "consumption": "1184.8" }, { "timestamp": "1-05/2020", "consumption": "1124.3" }, { "timestamp": "1-06/2020", "consumption": "1489.6" }, { "timestamp": "1-07/2020", "consumption": "2141.4" }, { "timestamp": "1-08/2020", "consumption": "2230" }, { "timestamp": "1-09/2020", "consumption": "1924.9" }, { "timestamp": "1-10/2020", "consumption": "2153.5" }, { "timestamp": "1-11/2020", "consumption": "2244.7" }, { "timestamp": "1-12/2020", "consumption": "2448" }, { "timestamp": "1-01/2021", "consumption": "2191.8" }, { "timestamp": "1-02/2021", "consumption": "1990.4" }, { "timestamp": "1-03/2021", "consumption": "2701.3" }, { "timestamp": "1-04/2021", "consumption": "2800.4" }, { "timestamp": "1-05/2021", "consumption": "3101.8" }, { "timestamp": "1-06/2021", "consumption": "3398.2" }, { "timestamp": "1-07/2021", "consumption": "3761.6" }, { "timestamp": "1-08/2021", "consumption": "3653.7" }, { "timestamp": "1-09/2021", "consumption": "3347.4" }, { "timestamp": "1-10/2021", "consumption": "3512.1" }, { "timestamp": "1-11/2021", "consumption": "3464" }, { "timestamp": "1-12/2021", "consumption": "3696.5" }, { "timestamp": "1-01/2022", "consumption": "3212.7" }, { "timestamp": "1-02/2022", "consumption": "3104" }, { "timestamp": "1-03/2022", "consumption": "3712.7" }];
let sma_vec = [];
let window_size = 50;
let trainingsize = 70;
let data_temporal_resolutions = 'Weekly';

async function trainModel(X, Y, window_size, n_epochs, learning_rate, n_layers, callback){

    const batch_size = 32;
  
    // input dense layer
    const input_layer_shape = window_size;
    const input_layer_neurons = 64;
  
    // LSTM
    const rnn_input_layer_features = 16;
    const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features;
    const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps]; // the shape have to match input layer's shape
    const rnn_output_neurons = 16; // number of neurons per LSTM's cell
  
    // output dense layer
    const output_layer_shape = rnn_output_neurons; // dense layer input size is same as LSTM cell
    const output_layer_neurons = 1; // return 1 value
  
    // ## old method
    // const xs = tf.tensor2d(X, [X.length, X[0].length])//.div(tf.scalar(10));
    // const ys = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1])//.div(tf.scalar(10));
  
    // ## new: load data into tensor and normalize data
  
    const inputTensor = tf.tensor2d(X, [X.length, X[0].length])
    const labelTensor = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1])
  
    const [xs, inputMax, inputMin] = normalizeTensorFit(inputTensor)
    const [ys, labelMax, labelMin] = normalizeTensorFit(labelTensor)
  
    // ## define model
  
    const model = tf.sequential();
  
    model.add(tf.layers.dense({units: input_layer_neurons, inputShape: [input_layer_shape]}));
    model.add(tf.layers.reshape({targetShape: rnn_input_shape}));
  
    let lstm_cells = [];
    for (let index = 0; index < n_layers; index++) {
         lstm_cells.push(tf.layers.lstmCell({units: rnn_output_neurons}));
    }
  
    model.add(tf.layers.rnn({
      cell: lstm_cells,
      inputShape: rnn_input_shape,
      returnSequences: false
    }));
  
    model.add(tf.layers.dense({units: output_layer_neurons, inputShape: [output_layer_shape]}));
  
    model.compile({
      optimizer: tf.train.adam(learning_rate),
      loss: 'meanSquaredError'
    });
  
    // ## fit model
  
    const hist = await model.fit(xs, ys,
      { batchSize: batch_size, epochs: n_epochs, callbacks: {
        onEpochEnd: async (epoch, log) => {
          callback(epoch, log);
        }
      }
    });
  
    // return { model: model, stats: hist };
    return { model: model, stats: hist, normalize: {inputMax:inputMax, inputMin:inputMin, labelMax:labelMax, labelMin:labelMin} };
  }
  
  function makePredictions(X, model, dict_normalize)
  {
      // const predictedResults = model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))).mul(10); // old method
      
      X = tf.tensor2d(X, [X.length, X[0].length]);
      const normalizedInput = normalizeTensor(X, dict_normalize["inputMax"], dict_normalize["inputMin"]);
      const model_out = model.predict(normalizedInput);
      const predictedResults = unNormalizeTensor(model_out, dict_normalize["labelMax"], dict_normalize["labelMin"]);
  
      return Array.from(predictedResults.dataSync());
  }
  
  function normalizeTensorFit(tensor) {
    const maxval = tensor.max();
    const minval = tensor.min();
    const normalizedTensor = normalizeTensor(tensor, maxval, minval);
    return [normalizedTensor, maxval, minval];
  }
  
  function normalizeTensor(tensor, maxval, minval) {
    const normalizedTensor = tensor.sub(minval).div(maxval.sub(minval));
    return normalizedTensor;
  }
  
  function unNormalizeTensor(tensor, maxval, minval) {
    const unNormTensor = tensor.mul(maxval.sub(minval)).add(minval);
    return unNormTensor;
  }
  

function onClickChangeDataFreq(freq) {
    console.log(freq.value);
    data_temporal_resolutions = freq.value;
    // $("#input_datafreq").text(freq);
}

function main() {
    dataComputeSMA();
    beginTrainModel().then(() => {
        validate();
        predict();
    });
}

function dataComputeSMA() {
    window_size = 20;
    sma_vec = ComputeSMA(data_raw, window_size); //Compute the moving average (SMA)

    let sma = sma_vec.map(function (val) { return val['avg']; }); //Extract the averages from the computed SMA
    let consumptions = data_raw.map(function (val) { return val['consumption']; }); //Extract the consumptions from the raw consumption data

    let timestamps_a = data_raw.map(function (val) { return val['timestamp']; }); //Extract the timestamps for the original data
    let timestamps_b = data_raw.map(function (val) { return val['timestamp']; }).splice(window_size, data_raw.length); //Extract the timestamps for the SMA data

    return [[timestamps_a, consumptions], [timestamps_b, sma]];
}


async function beginTrainModel() {

    let epoch_loss = []; //Set up an array to show the loss for each epoch

    let inputs = sma_vec.map(function (inp_f) { return inp_f['set'].map( function (val) { return parseFloat(val['consumption']); }) }); //Extract the set of fuel consumption values from the SMA dataset to feed into the training model
    let outputs = sma_vec.map(function (outp_f) { return outp_f['avg']; }); //Extract the calculated moving averages, to act as labels for the model to assign the fuel consumption values to as part of its training process

    //Get the hyperparameters from the page
    trainingsize = 75;
    let n_epochs = 10;
    let learningrate = 0.01;
    let n_hiddenlayers = 4;

    inputs = inputs.slice(0, Math.floor(trainingsize / 100 * inputs.length)); //Extract out only the proportion of data that we will be using for training, leaving the rest for validation
    outputs = outputs.slice(0, Math.floor(trainingsize / 100 * outputs.length));

    //Display the training progress. Update the page with loss information and a loss graph with each training epoch
    let callback = function (epoch, log) {
        epoch_loss.push(log.loss);
    };

    //Commence model training
    result = await trainModel(inputs, outputs, window_size, n_epochs, learningrate, n_hiddenlayers, callback);
}

function validate() {

    //Get the fuel consumption values from the SMA set (the set we are training on)
    let inputs = sma_vec.map(function (inp_f) {
        return inp_f['set'].map(function (val) { return parseFloat(val['consumption']); });
    });

    //Slice out the training set
    let val_train_x = inputs.slice(0, Math.floor(trainingsize / 100 * inputs.length));
    //Make predictions on what the corresponding moving average is for the received data. This should be very close to the actual SMA because this is done on the training data
    let val_train_y = makePredictions(val_train_x, result['model'], result['normalize']);

    //Slice out the validation set
    let val_unseen_x = inputs.slice(Math.floor(trainingsize / 100 * inputs.length), inputs.length);
    //Make predictions on what the corresponding moving average is for the unseen data. This will be the algorithm's real prediction as it has not seen the validation set before
    let val_unseen_y = makePredictions(val_unseen_x, result['model'], result['normalize']);


    //Get the corresponding x-axis values (timestamps)
    let timestamps_a = data_raw.map(function (val) { return val['timestamp']; }); //Get the timestamps for the actual data

    let timestamps_SMA = data_raw.map(function (val) { return val['timestamp']; }).splice(window_size, data_raw.length); //Extract the timestamps for the SMA data

    let timestamps_b = data_raw.map(function (val) {
        return val['timestamp'];
    }).splice(window_size, (data_raw.length - Math.floor((100 - trainingsize) / 100 * data_raw.length))); //Get the timestamps for the predictions from the training dataset

    let timestamps_c = data_raw.map(function (val) { //Get the timestamps for the validation set
        return val['timestamp'];
    }).splice(window_size + Math.floor(trainingsize / 100 * inputs.length), inputs.length);

    let sma = sma_vec.map(function (val) { return val['avg']; }); //Get the simple moving average (training label)
    let consumptions = data_raw.map(function (val) { return parseFloat(val['consumption']); }); //Get the real fuel consumption data

    return [[timestamps_a, consumptions], [timestamps_SMA, sma], [timestamps_b, val_train_y], [timestamps_c, val_unseen_y]];
}

 function predict() {


    //Get the fuel consumption values from the SMA set
    let inputs = sma_vec.map(function (inp_f) {
        return inp_f['set'].map(function (val) { return parseFloat(val['consumption']); });
    });
    let pred_X = [inputs[inputs.length - 1]]; //Get the last window of data to generate a prediction
    let pred_y = makePredictions(pred_X, result['model'], result['normalize']); //Generate a predicted SMA value

    window_size = 20;

    let timestamps_d = data_raw.map(function (val) {
        return val['timestamp'];
    }).splice((data_raw.length - window_size), data_raw.length); //Get the timestamps for the historical data the prediction is based off of


    //Generate the timestamp associated with the next month to show the predicted data point on the graph
    let last_date = new Date(timestamps_d[timestamps_d.length - 1]);
    let add_days = 1;

    last_date.setDate(last_date.getDate() + add_days);
    let next_date = formatDate(last_date.toString());
    let timestamps_e = [next_date];

    //Plot the predicted value on the graph
    console.log(`Predicted fuel consumption at ${timestamps_e[timestamps_e.length - 1]}: ${pred_y}`);
}

function ComputeSMA(data, window_size) {
    /*Computes an array of moving averages
    Each entry in the returned array will be a dictionary with two keys, 'set', and 'average'. The 'set' key contains an array with size window_size of timestamps and fuel consumption values.
    The 'average' key contains a value representing the mean of the 'set' array
    e.g., {{'set' : }}
    */
    let r_avgs = [], avg_prev = 0;
    for (let i = 0; i <= data.length - window_size; i++) {
        let curr_avg = 0.00, t = i + window_size;
        for (let k = i; k < t && k <= data.length; k++) {
            curr_avg += data[k]['consumption'] / window_size;
        }
        r_avgs.push({ set: data.slice(i, i + window_size), avg: curr_avg });
        avg_prev = curr_avg;
    }
    return r_avgs;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + '-' + month + '/' + year;
}

main();