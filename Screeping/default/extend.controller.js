// extend.controller.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

require('extend.pos')

RoomController.prototype.initialise = function () {
    var fs = this.pos.getFreeSpaces()

    Memory.controllers[this.id] = {
        FreeSpaces: fs,
    }
    console.log("Added memory for RoomController " + this.id + " in Room " + this.room.id)
    var fsMem =  Memory.controllers[this.id].FreeSpaces
    for (var i in fsMem) {
        console.log(' fs ' + i + ' ' + fsMem[i])
    }
}

RoomController.prototype.update = function () {
    console.log('Source name ' + this.id)
}

var controllerVersionNumber = 2

if (!Memory.controllerVersionNumber || Memory.controllerVersionNumber != controllerVersionNumber) {
    console.log('Initialising Source Memory ' + Memory.controllerVersionNumber + ' -> ' + controllerVersionNumber)
    // Initialization not done: do it
    if (Memory.controllers == undefined) {
        Memory.controllers = {}
    }
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        var controller = room.controller
        if (controller && controller.my) {
            controller.initialise()
        }
    }
    // Set the initialization flag
    Memory.controllerVersionNumber = controllerVersionNumber;
}