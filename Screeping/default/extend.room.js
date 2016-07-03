// extend.room.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

Room.prototype.initialise = function () {
    var fs = source.getFreeSpaces()

    Memory.rooms[this.name] = {
    }
    console.log("Added memory for Room " + room.name)
}

Room.prototype.update = function () {
    console.log('Room name ' + this.name)
}

var roomVersionNumber = 1

if (!Memory.roomVersionNumber || Memory.roomVersionNumber != roomVersionNumber) {
    console.log('Initialising Room Memory ' + Memory.roomVersionNumber + ' -> ' + roomVersionNumber)
    // Initialization not done: do it
    if (Memory.rooms == undefined) {
        Memory.rooms = {}
    }
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        var controller = room.controller
        if (controller && controller.my) {
            room.initialise();
        }
    }
    // Set the initialization flag
    Memory.roomVersionNumber = roomVersionNumber;
}