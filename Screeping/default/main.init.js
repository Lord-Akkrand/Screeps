// init.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('init'); // -> 'a thing'
 */

// Check for the initialization flag

var mainVersion = 1

if (!Memory.mainVersion || Memory.mainVersion != mainVersion) {
    console.log('Initialising Memory ' + Memory.mainVersion + ' -> ' + mainVersion)
    // Initialization not done: do it

    // Set the initialization flag
    Memory.mainVersion = mainVersion;
}
