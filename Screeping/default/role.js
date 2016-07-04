// role.js

var logThis = false
var DebugLog = function (str) {
    if (logThis) {
        console.log(str)
    }
}

var roleVersion = 1

if (!Memory.roleVersion || Memory.roleVersion != roleVersion) {
    console.log('Initialising Role Memory ' + Memory.roleVersion + ' -> ' + roleVersion)
    // Initialization not done: do it

    Memory.roles = {}

    // Set the initialization flag
    Memory.roleVersion = roleVersion;
}

var WorkerRole = require('role.worker')

var UpdateRole = function (creep) {
    switch (creep.memory.role) {
        case 'Worker':
            WorkerRole.update(creep);
            break;
        default:
            // NO ROLE!
            break;
    }
}

module.exports = UpdateRole