// extend.spawn.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

require('extend.pos')

StructureSpawn.prototype.initialise = function () {

}

StructureSpawn.prototype.update = function ()
{
    var sources = this.room.getSources()
    var creepsInRoom = this.room.getCreepsInRoom()
    var myCreepsInRoom = creepsInRoom[FIND_MY_CREEPS]
    console.log('Spawn name ' + this.name + '.  Sources ' + sources.length + '.  My Creeps ' + myCreepsInRoom.length)
    for (var name in myCreepsInRoom) {

    }
}

StructureSpawn.prototype.place = function ()
{

}

var SpawnVersionNumber = 1

if (!Memory.spawnVersion || Memory.spawnVersion != SpawnVersionNumber) {
    console.log('Initialising Memory ' + Memory.spawnVersion + ' -> ' + SpawnVersionNumber)
    // Initialization not done: do it
    for (var name in Game.spawns) {
        console.log('Initialising Spawn ' + name)
        var spawn = Game.spawns[name];
        spawn.initialise()
    }
    // Set the initialization flag
    Memory.spawnVersion = SpawnVersionNumber;
}