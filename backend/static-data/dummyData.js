class Ship{
    constructor(tankCapacity, cargoCapacity, litterPerHour, name){
        this.tankCapacity = tankCapacity; //capacity of ship's tank
        this.cargoCapacity = cargoCapacity; //capacity of ship's cargo
        this.litterPerHour = litterPerHour;
        this.name = name;
    }
}

class Devonport{
    constructor(fuelAmount){
        this.fuelCapacity = 10000000; //currently fleet holds 10 milion litter of fuel
        this.fuelAmount = fuelAmount; //fuel in the storage
        this.continReserve = 550000; //contingency reserve of 550,000 litter of fuel must be held
        this.tankTruck = 33000; //200,000L per week can be delivered by Craig's estimation
    }
}

class Task{
    constructor(numDay, shipStatus, tankFuel, cargoFuel, movingAverage){
      this.numDay = numDay;
      this.shipStatus = shipStatus; //at sea, harbour
      this.tankFuel = tankFuel; //current fuel in tank
      this.cargoFuel = cargoFuel;
      this.movingAverage = movingAverage; //moving average of the price per liter in NZ dollars of fuel. (cents/litter)
      this.date = new Date();
    } 
}

let port = new Devonport(50000);

let ship1 = new Ship(1400000, 0, 1083, 'HMS Example 1');
let ship2 = new Ship(1700000, 200000, 1083, 'HMS Example 2');

//current task object
let task1 = new Task(10, 'harbour', 50000, 0, 99);
let task2 = new Task(5, 'harbour', 20000, 0, 99);

let map1 = new Map();
//if task arrive map 
map1.set(task1, ship1);
map1.set(task2, ship2);

//all tasks in the queue
let stack = [];
stack.push(map1);

//estimate current ship
let tempShip1 = map1.get(task1);
console.log('Fuel usage of '+tempShip1.name+':');
let estFuelCurrent = task1.numDay * tempShip1.litterPerHour * 24;

console.log('Fuel estimation: '+estFuelCurrent+'L');

//estimate one month assets
let tempStack = stack;
console.log('Fuel usage for all assets: ')

let tempMap = tempStack.shift();
const iterator = tempMap.keys();
let tempTask = iterator.next().value;
let totalFuel = 0;
while(tempTask != null){
    let estFuelMonth = tempTask.numDay * tempMap.get(tempTask).litterPerHour * 24;
    console.log('Fuel usage of '+tempMap.get(tempTask).name+': '+estFuelMonth+'L');
    tempTask = iterator.next().value;
    totalFuel += estFuelMonth;
}

console.log('Total: '+totalFuel);


