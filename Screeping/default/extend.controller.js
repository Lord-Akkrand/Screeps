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
var JobFactory = require('job')

var controllerVersionNumber = 4

StructureController.prototype.initialise = function () {
    var fs = this.pos.getFreeSpacesForMemory()

    Memory.controllers[this.id] = {
        FreeSpaces: fs,
        Jobs: [],
        controllerVersionNumber: controllerVersionNumber
    }
    console.log("Added memory for StructureController " + this.id + " in Room " + this.room.id)
    var fsMem =  Memory.controllers[this.id].FreeSpaces
    for (var i in fsMem) {
        console.log(' fs ' + i + ' ' + fsMem[i])
    }
}

StructureController.prototype.update = function () {
    console.log('Source name ' + this.id)
}

StructureController.prototype.getMemory = function () {
    return Memory.controllers[this.id];
}


StructureController.prototype.updateJobs = function (jobManager) {
    console.log('StructureController name ' + this.id + ' Update Jobs.')
    var memory = this.getMemory();
    var freeSpaces = memory.FreeSpaces;
    var jobs = memory.Jobs;
    var majorPriority = 0;
    var controllerPriority = 0;

    for (var i in freeSpaces) {
        var minorPriority = i * 2;
        console.log(' controller freespaces ' + i + ' makes minorPriority of ' + minorPriority)
        var fs = freeSpaces[i];
        // There should be an ongoing job to upgrade this controller from this location.
        var position = new RoomPosition(fs.X, fs.Y, fs.RoomName);
        var controllerId = this.id
        var existingJob = jobs.find(function (job) {
            return job.JobType == 'UpgradeController'
                && job.OwnerId == controllerId
                && job.Position.X == fs.X
                && job.Position.Y == fs.Y
                && job.Position.Z == fs.Z
                && job.Position.RoomName == fs.RoomName;
        })
        if (existingJob == undefined) {
            var newJob = JobFactory.CreateJob('UpgradeController', controllerId, undefined);
            JobFactory.AddPosition(newJob, position);
            JobFactory.SetBodyRequirements(newJob, [WORK, CARRY, MOVE]);
            JobFactory.SetPriority(newJob, [majorPriority, controllerPriority, minorPriority]);
            jobs.push(newJob);
            jobManager.AddJob(newJob);
        }
    }

    if (!memory.roomVersionNumber || memory.roomVersionNumber != Memory.roomVersionNumber) {
        memory.roomVersionNumber = Memory.roomVersionNumber
        for (var i in jobs) {
            jobManager.AddJob(jobs[i]);
        }
    }
}

if (!Memory.controllerVersionNumber || Memory.controllerVersionNumber != controllerVersionNumber) {
    console.log('Initialising Source Memory ' + Memory.controllerVersionNumber + ' -> ' + controllerVersionNumber)
    // Initialization not done: do it
    Memory.controllers = undefined;
    // Set the initialization flag
    Memory.controllerVersionNumber = controllerVersionNumber;
}

if (Memory.controllers == undefined) {
    Memory.controllers = {}
}

for (var i in Game.rooms) {
    var room = Game.rooms[i];
    var controller = room.controller
    if (controller && controller.my) {
        var controllerMem =  Memory.controllers[controller.id]
        if (controllerMem == undefined || controllerMem.controllerVersionNumber != controllerVersionNumber) {
            controller.initialise()
        }
    } 
}