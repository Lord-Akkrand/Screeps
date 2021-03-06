// extend.source.js

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

var sourceVersionNumber = 1

Source.prototype.initialise = function () {
    var fs = this.pos.getFreeSpacesForMemory()
    
    Memory.sources[this.id] = {
        FreeSpaces: fs,
        Assigned: {},
        Jobs: [],
        sourceVersionNumber: sourceVersionNumber
    }
    this.calculateRequiredHarvesters();
    console.log("Added memory for Source " + this.id + " in Room " + this.room.id)
    var fsMem =  Memory.sources[this.id].FreeSpaces
    for (var i in fsMem) {
        console.log(' fs ' + i + ' ' + fsMem[i])
    }
}

Source.prototype.updateJobs = function(jobManager, sourceIndex) {
    console.log('Source name ' + this.id + ' Update Jobs.')
    var memory = this.getMemory();
    var freeSpaces = memory.FreeSpaces;
    var jobs = memory.Jobs;

    var majorPriority = 0
    var sourcePriority = sourceIndex * 2
    for (var i in freeSpaces) {
        var minorPriority = (i * 2) + 1;
        console.log(' source ' + sourceIndex + ' has sourcePriority of ' + sourcePriority + ', freespaces ' + i + ' makes minorPriority of ' + minorPriority)

        var fs = freeSpaces[i]
        if (fs.ContainerId) {
            var container = Game.getObjectById(fs.ContainerId);
            // There should be an ongoing job to harvest into this container.
            var existingJob = jobs.find(function (job) {
                return job.JobType == 'Harvest'
                    && job.TargetId == fs.ContainerId;
            })
            if (existingJob == undefined) {
                var newJob = JobFactory.CreateJob('Harvest', this.id, fs.ContainerId);
                JobFactory.SetBodyRequirements(newJob, [WORK, MOVE]);
                JobFactory.SetPriority(newJob, [majorPriority, sourcePriority, minorPriority]);
                jobs.push(newJob);
                jobManager.AddJob(newJob);
            }
        }
        else
        {
            var minorPriority = (i * 2) + 1;
            console.log(' source ' + sourceIndex + ' has sourcePriority of ' + sourcePriority + ', freespaces ' + i + ' makes minorPriority of ' + minorPriority)

            var position = new RoomPosition(fs.X, fs.Y, fs.RoomName);
            // There should be a job to create & build this container.
            var existingJob = jobs.find(function (job) {
                return job.JobType == 'BuildStructure'
                    && job.TargetId == STRUCTURE_CONTAINER
                    && job.Position.X == fs.X
                    && job.Position.Y == fs.Y
                    && job.Position.Z == fs.Z
                    && job.Position.RoomName == fs.RoomName;
            });

            if (existingJob == undefined) {
                var newJob = JobFactory.CreateJob('BuildStructure', this.id, STRUCTURE_CONTAINER);
                JobFactory.AddPosition(newJob, position);
                JobFactory.SetBodyRequirements(newJob, [WORK, CARRY, MOVE]);
                JobFactory.SetPriority(newJob, [majorPriority, sourcePriority, minorPriority]);
                jobs.push(newJob);
                jobManager.AddJob(newJob);
            }
        }
    }
}

/*
Source.prototype.update = function() {
    console.log('Source name ' + this.id)
}
*/

Source.prototype.getMemory = function () {
    return Memory.sources[this.id];
}

Source.prototype.calculateRequiredHarvesters = function () {
    console.log('Source name ' + this.id + ' calculateRequiredHarvesters')
    var mem = this.getMemory();
    mem.RequiredHarvesters = mem.FreeSpaces.length
}

Source.prototype.getRequiredHarvesters = function () {
    console.log('Source name ' + this.id + ' getRequiredHarvesters')
    var mem = this.getMemory()
    if (mem.RequiredHarvesters == undefined) {
        this.calculateRequiredHarvesters()
    }
    return mem.RequiredHarvesters
}

Source.prototype.getAssigned = function (role) {
    var mem = this.getMemory();
    var count = 0;
    for (var creep in mem.Assigned) {
        if (mem.Assigned[creep] == role) {
            count++;
        }
    }
    return count;
}

Source.prototype.assign = function (creep, role) {
    var mem = this.getMemory();
    mem.Assigned[creep.name] = role;
}

Source.prototype.garbagecollector = function () {
    var mem = this.getMemory();
    for (var creep  in mem.Assigned) {
        if (!Game.creeps[creep]) {
            delete mem.Assigned[creep];
        }
    }

    var freeSpaces = mem.FreeSpaces;
    for (var i in fsMem) {
        if (fs.ContainerId) {
            var container = Game.getObjectById(fs.ContainerId);
            if (container == undefined) {
                fs.Container = undefined;
            }
        }
    }
}

if (!Memory.sourceVersionNumber || Memory.sourceVersionNumber != sourceVersionNumber) {
    console.log('Initialising Source Memory ' + Memory.sourceVersionNumber + ' -> ' + sourceVersionNumber)
    // Initialization not done: do it
    Memory.sources = undefined;
    // Set the initialization flag
    Memory.sourceVersionNumber = sourceVersionNumber;
}

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
            var sourceMem = Memory.sources[source.id];
            if (sourceMem == undefined || sourceMem.sourceVersionNumber != sourceVersionNumber) {
                source.initialise()
            }
        }
    }
}
