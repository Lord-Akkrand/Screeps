// main.js

// Initialize the game
require('main.init');

// Process the creeps
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');
var roleSniper = require('role.sniper');

//for (var name in Game.towers) {

for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    //console.log(name + ' role ' + creep.memory)
    
    switch (creep.memory.role) {
        
        case 'upgrader':
            roleUpgrader.run(creep);
            break;
        case 'harvester':
            roleHarvester.run(creep);
            break;
        case 'builder':
            roleBuilder.run(creep);
            break;
        case 'guard':
            roleGuard.run(creep);
            break;
        case 'sniper':
            roleSniper.run(creep);
            break
        default:
            // idle
            break;
    }
}

// Cleanup dead objects
require('main.garbagecollector');

// Process the spawns
var population = require('main.population');
for(var name in Game.spawns) {
    population(Game.spawns[name]);
}

