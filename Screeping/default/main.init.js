// init.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('init'); // -> 'a thing'
 */

// Check for the initialization flag

var SpawnVersionNumber = 10

if (!Memory.spawnVersion || Memory.spawnVersion != SpawnVersionNumber) {
    console.log('Initialising Memory ' + Memory.spawnVersion + ' -> ' + SpawnVersionNumber)
    // Initialization not done: do it
    for (var name in Game.spawns) {
        console.log('Initialising Spawn ' + name)
        var spawn = Game.spawns[name];
        spawn.memory.populationRange = 20;
        spawn.memory.creepSpecs = {};
        spawn.memory.creepSpecs['harvester'] = [WORK,CARRY,MOVE];
        spawn.memory.creepSpecs['upgrader'] = [WORK,CARRY,MOVE];
        spawn.memory.creepSpecs['builder'] = [WORK,CARRY,MOVE];
        spawn.memory.creepSpecs['guard'] = [TOUGH,ATTACK,MOVE,MOVE];
        spawn.memory.creepSpecs['sniper'] = [RANGED_ATTACK,MOVE,MOVE];
        spawn.memory.creepSpecs['healer'] = [HEAL,MOVE];
        spawn.memory.levelUpSpecs = {}
        spawn.memory.levelUpSpecs['harvester'] = [MOVE];
        spawn.memory.levelUpSpecs['builder'] = [MOVE];
        
        spawn.memory.minPopulation = {['harvester']: 7, ['upgrader']: 2, ['builder']: 8, ['guard']: 2, ['sniper']: 1, ['healer']: 0};
    }
    // Set the initialization flag
    Memory.spawnVersion = SpawnVersionNumber;
}
