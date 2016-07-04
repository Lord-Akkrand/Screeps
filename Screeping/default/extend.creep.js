// extend.creep.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

require('extend.pos')

var Role = require('role')

Creep.prototype.initialise = function (version) {
    this.memory.CreepVersionNumber = version;
}

Creep.prototype.update = function ()
{
    var roleId = this.memory.Role;
    var role = Role.GetRole(roleId);
    role.update(this);
}

Creep.prototype.place = function ()
{

}

var CreepVersionNumber = 1

if (!Memory.CreepVersionNumber || Memory.CreepVersionNumber != CreepVersionNumber) {
    console.log('Initialising Memory ' + Memory.CreepVersionNumber + ' -> ' + CreepVersionNumber)
    // Initialization not done: do it
    for (var name in Game.creeps) {
        console.log('Initialising Creep ' + name)
        var creep = Game.creeps[name];
        creep.initialise(CreepVersionNumber)
    }
    // Set the initialization flag
    Memory.CreepVersionNumber = CreepVersionNumber;
}