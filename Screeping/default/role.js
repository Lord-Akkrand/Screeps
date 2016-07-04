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
var Roles = {
    Worker: require('role.worker'),
}
var RoleNames = []
for (var role in Roles) {
    RoleNames.push(role);
}

var Role = {
    GetRole: function (role) {
        if (Roles[role]) {
            return Roles[role];
        }
    },
    GetRoles: function() {
        return RoleNames;
    }
}
var 

module.exports = Role
