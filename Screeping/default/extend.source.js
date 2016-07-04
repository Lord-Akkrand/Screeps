// extend.source.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

Source.prototype.initialise = function () {
    var fs = this.getFreeSpaces()

    Memory.sources[this.id] = {
        FreeSpaces: fs,
    }
    console.log("Added memory for Source " + this.id + " in Room " + this.room.id)
    var fsMem =  Memory.sources[this.id].FreeSpaces
    for (var i in fsMem) {
        console.log(' fs ' + i + ' ' + fsMem[i])
    }
}

Source.prototype.update = function() {
    console.log('Source name ' + this.id)
}

Source.prototype.getSurroundings = function () {
    var top = this.pos.x - 1
    var bottom = this.pos.x + 1
    var left = this.pos.y - 1
    var right = this.pos.y + 1
    var surroundingsArray = this.room.lookAtArea(top, left, bottom, right, true)
    return surroundingsArray
}

Source.prototype.getFreeSpaces = function() {
    var surroundingsArray = this.getSurroundings()
    var freeSpaces = []
    for (var i in surroundingsArray) {
        var obj = surroundingsArray[i]
        if (obj.type == 'terrain' && obj.terrain == 'wall') {
            continue;
        }
        if (obj.type == 'structure' && obj.structure.structureType != STRUCTURE_ROAD && obj.structureType != STRUCTURE_RAMPART) {
            continue;
        }
        freeSpaces.push(new RoomPosition(obj.x, obj.y, this.room.name));
    }
    return freeSpaces;
}



var sourceVersionNumber = 2

if (!Memory.sourceVersionNumber || Memory.sourceVersionNumber != sourceVersionNumber) {
    console.log('Initialising Source Memory ' + Memory.sourceVersionNumber + ' -> ' + sourceVersionNumber)
    // Initialization not done: do it
    if (Memory.sources == undefined) {
        Memory.sources = {}
    }
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        var controller = room.controller
        if (controller && controller.my) {
            var sources = room.find(FIND_SOURCES);
            for (var j in sources) {
                var source = sources[j]
                source.initialise()
            }
        }
    }
    // Set the initialization flag
    Memory.sourceVersionNumber = sourceVersionNumber;
}