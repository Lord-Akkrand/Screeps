// main.js

// Initialize the game
require('main.init');

require('extend.room')
for (var name in Memory.rooms) {
    var room = Game.rooms[name];
    room.update();
}

require('extend.source')
for (var i in Memory.sources) {
    var source = Game.getObjectById(i);
    source.update();
}

require ('extend.spawn')
for (var name in Game.spawns) {
    var spawn = Game.spawns[name];
    spawn.update();
}

require('main.population')

// Cleanup dead objects
require('main.garbagecollector');
