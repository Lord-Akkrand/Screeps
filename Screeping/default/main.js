// main.js

// Initialize the game
require('main.init');

// Cleanup dead objects
require('main.garbagecollector');

// Extend various game classes to add my functionality
require('extend.room')
require('extend.controller')
require('extend.source')
require('extend.spawn')
require('extend.creep')

// Update each of the game objects I've now got

// Rooms (includes JobManager for each room)
for (var name in Memory.rooms) {
    var room = Game.rooms[name];
    room.update();
}

/*/ Sources don't really need to update, they themselves perform no actions.
for (var i in Memory.sources) {
    var source = Game.getObjectById(i);
    source.update();
}
*/

// Spawns (manages population, new spawns)
for (var name in Game.spawns) {
    var spawn = Game.spawns[name];
    spawn.update();
}

// Finally, Creeps, run their state machines and do all the work.
for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    creep.update();
}


