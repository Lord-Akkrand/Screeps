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


class Role {
    constructor() {

    }

    update(creep) {

    }
};

module.exports = Role;