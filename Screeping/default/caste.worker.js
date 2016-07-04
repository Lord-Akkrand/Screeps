// caste.worker.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

var workerVersion  = 1

var workerMemory = Memory.castes['Worker']

if (!workerMemory || workerMemory.workerVersion != workerVersion) {
    console.log('Initialising Worker Caste Memory ' + workerVersion)
    // Initialization not done: do it
    workerMemory = {
        workerVersion: workerVersion 
    }

    Memory.castes['Worker'] = workerMemory
}

var WorkerFactory = function (factory) {
    return new factory([WORK, CARRY, MOVE], [MOVE, CARRY, WORK], [MOVE, CARRY, WORK]);
}

module.exports = WorkerFactory
