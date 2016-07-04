// main.js

// Initialize the game
require('main.init');

require('extend.room')
require('extend.source')
require('extend.spawn')
require('extend.creep')

for (var name in Memory.rooms) {
    var room = Game.rooms[name];
    room.update();
}

for (var i in Memory.sources) {
    var source = Game.getObjectById(i);
    source.update();
}

for (var name in Game.spawns) {
    var spawn = Game.spawns[name];
    spawn.update();
}

for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    creep.update();
}

require('main.population')

// Cleanup dead objects
require('main.garbagecollector');
