// extend.room.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

var Role = require('role')

Room.prototype.initialise = function () {
    var mem = {
        Sources: [],
    }
    var sources = this.find(FIND_SOURCES);
    for (var id in sources) {
        mem.Sources.push(id);
    }
    Memory.rooms[this.name] = mem
    console.log("Added memory for Room " + room.name)
}

Room.prototype.update = function () {
    console.log('Room name ' + this.name)
    this.updateCreepsInRoom()
}

Room.prototype.getMemory = function () {
    return Memory.rooms[this.name];
}

Room.prototype.calculateCreepRequirements = function () {
    console.log('Room name ' + this.name + 'calculateCreepRequirements')
    var mem = this.getMemory();
    var sources = this.getSources();
    mem.RequiredCreeps = {};
    var roles = Role.GetRoles()
    for (var i in roles) {
        mem.RequiredCreeps[roles[i]] = 0;
    }
    // Always at least one worker
    mem.RequiredCreeps['Worker'] = 1;
    for (var i in sources) {
        var source = Game.getObjectById(sources[i]);
        mem.RequiredCreeps['Harveseter'] += Math.max(0, source.getRequiredHarvesters() - source.getAssigned('Harvester'));
    }
}

Room.prototype.getCreepRequirements = function () {
    console.log('Room name ' + this.name + ' getCreepRequirements')
    var mem = this.getMemory()
    if (mem.RequiredCreeps == undefined) {
        this.calculateCreepRequirements()
    }
    return mem.RequiredCreeps
}

Room.prototype.updateCreepsInRoom = function () {
    var mem = this.getMemory()
    var creeps = this.find(FIND_CREEPS);
    var allCreeps = []
    var myCreeps = []
    var hostileCreeps = []
    for (var i in creeps) {
        var creep = creeps[i]
        var creepName = creep.name
        //console.log(' found ' + creepName);
        allCreeps.push(creepName);
        if (creep.my) {
            myCreeps.push(creepName);
        }
        else {
            hostileCreeps.push(creepName);
        }
    }
    mem.CreepsInRoom = {
        [FIND_CREEPS]: allCreeps,
        [FIND_MY_CREEPS]: myCreeps,
        [FIND_HOSTILE_CREEPS]: hostileCreeps,
    }
}

Room.prototype.getCreepsInRoom = function () {
    var mem = this.getMemory()
    return mem.CreepsInRoom
}

Room.prototype.getSources = function () {
    var mem = this.getMemory()
    return mem.Sources
}

var roomVersionNumber = 3

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