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

Creep.prototype.update = function ()
{
    if (this.spawning) { return; }
    var mem = this.getMemory()
    var roleId = mem.Role;
    var role = Role.GetRole(roleId);
    role.update(this);
}

Creep.prototype.getMemory = function ()
{
    return Memory.creeps[this.name];
}

Creep.prototype.assignJob = function (job) {
    var mem = this.getMemory();
    mem.Job = job;
}

Creep.prototype.unassignJob = function () {
    var mem = this.getMemory();
    var job = mem.Job;
    mem.Job = undefined;
    return job;
}

Creep.prototype.getJob = function () {
    var mem = this.getMemory();
    return mem.Job;
}