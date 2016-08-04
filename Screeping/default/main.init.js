// init.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('init'); // -> 'a thing'
 */

// Check for the initialization flag

var mainVersionNumber = 1

if (!Memory.mainVersionNumber || Memory.mainVersionNumber != mainVersionNumber) {
    console.log('Initialising Main Memory ' + Memory.mainVersionNumber + ' -> ' + mainVersionNumber)
    // Initialization not done: do it

    // Set the initialization flag
    Memory.mainVersionNumber = mainVersionNumber;
}
