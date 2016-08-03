// extend.room.js

var logThis = false
var DebugLog = function(str) {
    if (logThis) {
        console.log(str)
    }
}

// Each creep in the room is assigned a protocol (that shold be compatible with their caste and role)
var Protocols = [
    ['UpgradeController', 'FillSpawn'],
    ['BuildContainers', 'BuildExtensions'],
    ['BuildRoads', 'RepairRoads'],
    ['BuildWalls', 'BuildRamparts', 'RepairWalls']
];

var Role = require('role')
var JobManager = require('jobmanager')

Room.prototype.initialise = function () {
    var mem = {
        Sources: [],
    };
    var sources = this.find(FIND_SOURCES);
    for (var i in sources) {
        var source = sources[i];
        var id = source.id;
        mem.Sources.push(id);
    }
    Memory.rooms[this.name] = mem;
    console.log("Added memory for Room " + room.name);
}

Room.prototype.update = function () {
    console.log('Room name ' + this.name);
    this.updateJobsInRoom();
    this.updateCreepsInRoom();
    this.jobManager.OnUpdate();
}

Room.prototype.updateJobsInRoom = function() {
    var controller = room.controller;
    if (controller.my) {
        controller.updateJobs(this.jobManager);

        var sources = this.getSources();
        for (var i in sources) {
            var source = Game.getObjectById(sources[i]);
            source.updateJobs(this.jobManager, i)
        }
    }
}

Room.prototype.getMemory = function () {
    return Memory.rooms[this.name];
}

Room.prototype.getAssigned = function (protocol) {
    var mem = this.getMemory();
    var count = 0;
    for (var creep in mem.Assigned) {
        if (mem.Assigned[creep] == protocol) {
            count++;
        }
    }
    return count;
}

Room.prototype.assign = function (creep, protocol) {
    var mem = this.getMemory();
    mem.Assigned[creep.name] = protocol;
}

Room.prototype.unassign = function (creep) {
    this.assign(creep, undefined);
}

Room.prototype.calculateCreepRequirements = function () {
    console.log('Room name ' + this.name + ' calculateCreepRequirements')
    var mem = this.getMemory();
    var sources = this.getSources();
    mem.RequiredCreeps = {};
    var roles = Role.GetRoles()
    for (var i in roles) {
        mem.RequiredCreeps[roles[i]] = 0;
    }
    // Always at least two workers (one for the controller, one for the spawn)
    mem.RequiredCreeps['Worker'] = 5;
    for (var i in sources) {
        console.log(i + ' ' + sources[i])
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
            if (creep.getJob() == undefined) {
                console.log(creepName + ' has no job.  Requesting one.');
                this.jobManager.RequestJob(creep);
            }
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

Room.prototype.initialiseJobManager = function () {
    this.jobManager = new JobManager();
    this.jobManager.OnInit(this);
}

var roomVersionNumber = 4

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

// Every tick, create the job manager for each room 
// (not too expensive as there's nowhere near as many rooms as creeps) 
for (var i in Game.rooms) {
    var room = Game.rooms[i];
    var controller = room.controller
    if (controller && controller.my) {
        room.initialiseJobManager();
    }
}