// role.worker.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

var workerRoleVersion  = 2

var workerMemory = Memory.roles['Worker']

if (!workerMemory || workerMemory.workerRoleVersion != workerRoleVersion) {
    console.log('Initialising Worker Caste Memory ' + workerRoleVersion)
    // Initialization not done: do it
    workerMemory = {
        workerRoleVersion: workerRoleVersion,
        Caste: 'Worker',
    }

    Memory.roles['Worker'] = workerMemory
}

var WorkerRole = {
    update: function (creep) {

    },
    getMemory: function () {
        return Memory.roles['Worker']
    }
}

module.exports = WorkerRole
