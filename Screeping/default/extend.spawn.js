// extend.spawn.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

require('extend.pos')
var CasteFactory = require('caste')
var Role = require('role')


var spawnVersionNumber = 1

StructureSpawn.prototype.initialise = function () {
    Memory.spawns[this.name] = {
        spawnVersionNumber: spawnVersionNumber       
    }
}

StructureSpawn.prototype.update = function ()
{
    if (this.spawning) { return; }

    var sources = this.room.getSources()
    var creepsInRoom = this.room.getCreepsInRoom()
    var myCreepsInRoom = creepsInRoom[FIND_MY_CREEPS]
    
    console.log('Spawn name ' + this.name + '.  Sources ' + sources.length + '.  My Creeps ' + myCreepsInRoom.length)

    var requiredCreeps = this.room.getCreepRequirements()
    var remainingRequired = {}
    for (var roleId in requiredCreeps) {
        var requiredCount = requiredCreeps[roleId];
        remainingRequired[roleId] = requiredCount;
        console.log(' Requires ' + requiredCount + ' ' + roleId + ' creeps.')
    }
    for (var i in myCreepsInRoom) {
        var name = myCreepsInRoom[i]
        var creep = Game.creeps[name];
        var creepMem = creep.getMemory()
        if (creepMem) {
            var role = creepMem.Role;
            console.log('  ' + name + ' is a ' + role);
            if (remainingRequired[role] != undefined) {
                remainingRequired[role]--;
            }
        }
    }
    for (var roleId in remainingRequired) {
        var requiredCount = remainingRequired[roleId];
        
        if (requiredCount > 0) {
            console.log(' Still Requires ' + requiredCount + ' ' + roleId + ' creeps.')
            var role = Role.GetRole(roleId);
            var roleMem = role.getMemory()
            var caste = roleMem.Caste;
            var body = CasteFactory({ caste: caste, spawn: this });
            
            var newName = this.createCreep(body, undefined, { Role: roleId });
            console.log(' Spawn returns' + newName);
        }
    }
}

StructureSpawn.prototype.place = function ()
{

}

if (!Memory.spawnVersionNumber || Memory.spawnVersionNumber != spawnVersionNumber) {
    console.log('Initialising Spawn Memory ' + Memory.spawnVersionNumber + ' -> ' + spawnVersionNumber)
    // Initialization not done: do it
    Memory.spawns = undefined;
    // Set the initialization flag
    Memory.spawnVersionNumber = spawnVersionNumber;
}
if (Memory.spawns == undefined) {
    Memory.spawns = {};
}

for (var name in Game.spawns) {
    var spawn = Game.spawns[name];
    var spawnMem = Memory.spawns[this.name];
    if (spawnMem == undefined || spawnMem.spawnVersionNumber != spawnVersionNumber) {
        console.log('Initialising Spawn ' + name)
        spawn.initialise()
    }
}