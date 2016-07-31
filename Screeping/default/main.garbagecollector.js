// garbagecollector.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('garbagecollector'); // -> 'a thing'
 */

// Cleanup dead creeps
for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
        var creepMemory = Memory.creeps[name];
        if (creepMemory.Job) {
            creepMemory.Job.Assign = undefined;
        }
        delete Memory.creeps[name];
    }
}

// Cleanup dead spawns
for (var name in Memory.spawns) {
    if (!Game.spawns[name]) {
        delete Memory.spawns[name];
    }
}
