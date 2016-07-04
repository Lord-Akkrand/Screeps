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

StructureSpawn.prototype.initialise = function () {
    this.memory.populationRange = 20;
    this.memory.creepSpecs = {};
    this.memory.creepSpecs['harvester'] = [WORK, CARRY, MOVE];
    this.memory.creepSpecs['upgrader'] = [WORK, CARRY, MOVE];
    this.memory.creepSpecs['builder'] = [WORK, CARRY, MOVE];
    this.memory.creepSpecs['guard'] = [TOUGH, ATTACK, MOVE, MOVE];
    this.memory.creepSpecs['sniper'] = [RANGED_ATTACK, MOVE, MOVE];
    this.memory.creepSpecs['healer'] = [HEAL, MOVE];
    this.memory.levelUpSpecs = {}
    this.memory.levelUpSpecs['harvester'] = [MOVE];
    this.memory.levelUpSpecs['builder'] = [MOVE];
        
    this.memory.minPopulation = { ['harvester']: 7, ['upgrader']: 2, ['builder']: 8, ['guard']: 2, ['sniper']: 1, ['healer']: 0 };
    console.log('Spawn ' + this.name + 'initialised.')
}
StructureSpawn.prototype.update = function ()
{
    console.log('Spawn name ' + this.name)
}

StructureSpawn.prototype.place = function ()
{

}

var SpawnVersionNumber = 1

if (!Memory.spawnVersion || Memory.spawnVersion != SpawnVersionNumber) {
    console.log('Initialising Memory ' + Memory.spawnVersion + ' -> ' + SpawnVersionNumber)
    // Initialization not done: do it
    for (var name in Game.spawns) {
        console.log('Initialising Spawn ' + name)
        var spawn = Game.spawns[name];
        spawn.initialise()
    }
    // Set the initialization flag
    Memory.spawnVersion = SpawnVersionNumber;
}