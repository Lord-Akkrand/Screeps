// caste.worker.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

var Caste = require('caste')


var workerVersion  = 1

var workerMemory = Memory.castes['Worker']

if (!workerMemory || workerMemory.workerVersion != workerVersion) {
    console.log('Initialising Worker Caste Memory ' + workerVersion)
    // Initialization not done: do it
    workerMemory = {
        workerVersion: workerVersion, factory: function () {
            return new Caste([WORK, CARRY, MOVE], [MOVE, CARRY, WORK], [MOVE, CARRY, WORK]);
        }
    }

    Memory.castes['Worker'] = workerMemory
}

module.exports = WorkerCaste;