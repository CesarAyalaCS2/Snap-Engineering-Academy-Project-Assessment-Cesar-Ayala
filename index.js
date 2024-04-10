// Assuming data.json contains your JSON data
const jsonData = require('./matches.json');
// const matches = JSON.parse(jsonData)
// console.log(typeof jsonData);

let id = 0;

const matchMap = new Map()

for (data in jsonData) {
    matchMap.set(id, data)
    id++
}

console.log(matchMap)