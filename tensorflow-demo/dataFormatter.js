
const fs = require("fs");
var rawData = fs.readFileSync("BTS Airline Fuel Data.csv", "utf-8").split('\n');
rawData.shift();

//Run this script to convert the BTS Airline Fuel Data file into 3 json files which can be substituted for the dataset used in index.js.
var rawFuelConsumptionData = [];
var rawDates = [];
var rawDataCombined = [];

rawData.forEach((pairStr) => {     
    var pair = pairStr.split(',');
    if(pair.length > 1) {
        console.log(pair);
        var rawFuel = pair[1].replace('\r','');
        var rawDate = pair[0].replace('/', '-');
    
        rawFuelConsumptionData.push(parseFloat(rawFuel));
        rawDates.push(rawDate);
        rawDataCombined.push({ timestamp: rawDate, price: rawFuel });
    }
});

fs.writeFileSync("./rawFuelData.json", JSON.stringify(rawFuelConsumptionData));
fs.writeFileSync("./rawDates.json", JSON.stringify(rawDates));
fs.writeFileSync("./rawDataCombined.json", JSON.stringify(rawDataCombined));

console.log(rawFuelConsumptionData);
console.log(rawDates);
console.log(rawDataCombined);