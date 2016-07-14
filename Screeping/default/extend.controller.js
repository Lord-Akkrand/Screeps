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

StructureController.prototype.initialise = function () {
    var fs = this.pos.getFreeSpacesForMemory()

    Memory.controllers[this.id] = {
        FreeSpaces: fs,
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
    for (var i in fMem) {
        // There should be an ongoing job to upgrade this controller from this location.
        var position = new RoomPosition(fs.X, fs.Y, fs.RoomName);
        var existingJob = jobs.find(function (job) {
            return job.JobType == 'UpgradeController'
                && job.TargetId == this.id
                && JobFactory.GetPosition(job).isEqualTo(position);
        })
        if (existingJob == undefined) {
            var newJob = JobFactory.CreateJob('UpgradeController', this.id, fs.ContainerId);
            JobFactory.AddPosition(newJob, position);
            JobFactory.SetBodyRequirements(newJob, [WORK, CARRY, MOVE]);
            jobs.push(newJob);
            jobManager.AddJob(newJob);
        }
    }
}

var controllerVersionNumber = 1

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