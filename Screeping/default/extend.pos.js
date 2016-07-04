// extend.pos.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

RoomPosition.prototype.getSurroundings = function () {
    var top = this.x - 1
    var bottom = this.x + 1
    var left = this.y - 1
    var right = this.y + 1
    var room = Game.rooms[this.roomName]
    var surroundingsArray = room.lookAtArea(top, left, bottom, right, true)
    return surroundingsArray
}

RoomPosition.prototype.getFreeSpaces = function () {
    var surroundingsArray = this.getSurroundings()
    var freeSpaces = []
    var room = Game.rooms[this.roomName]
    for (var i in surroundingsArray) {
        var obj = surroundingsArray[i]
        if (obj.type == 'terrain' && obj.terrain == 'wall') {
            continue;
        }
        if (obj.type == 'structure'
            && obj.structure.structureType != STRUCTURE_ROAD
            && obj.structureType != STRUCTURE_RAMPART
            && obj.structureType != STRUCTURE_CONTAINER) {
            continue;
        }
        freeSpaces.push(new RoomPosition(obj.x, obj.y, room.name));
    }
    return freeSpaces;
}
