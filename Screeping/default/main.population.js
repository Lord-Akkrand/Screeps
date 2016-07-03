// population.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('population'); // -> 'a thing'
 */
 
var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}
 
require('caste.worker');

for (var casteName in Memory.castes) {
    console.log("Population " + casteName);
}
