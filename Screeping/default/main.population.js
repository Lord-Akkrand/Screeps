// population.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('population'); // -> 'a thing'
 */
 
var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}
 
var casteFactory = require('caste');

module.exports = function(spawn) {
    // Ensure each creep role is above its minimum population level in an area around each spawn
    var roles = ['upgrader', 'harvester', 'guard', 'builder', 'sniper'];
    for(var i in roles) {
        var thisRole = roles[i];
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == thisRole);
        //var  = spawn.room.find(Game.CREEPS, spawn.memory.populationRange, { filter: function(creep){if(creep.memory && creep.memory.role) return creep.memory.role == thisRole; else return false;} });
        
        var minPop = spawn.memory.minPopulation[thisRole]
        if (thisRole == 'guard')
        {
            var targets = spawn.room.find(FIND_HOSTILE_CREEPS);
            minPop += targets.length;
        }
        if (creeps.length < minPop) {
            // Missing creeps, spawn them
            DebugLog(thisRole + ': ' + creeps.length + ' < ' + minPop)
            var creepSpecs = spawn.memory.creepSpecs[thisRole]
            var levelUpSpecs = spawn.memory.levelUpSpecs[thisRole];
            var casteSpecs = casteFactory(spawn, creepSpecs, levelUpSpecs)
            DebugLog('caste specs for ' + thisRole + ' ' + creepSpecs.length + '->' + casteSpecs.length)
            for (var i in casteSpecs)
            {
                DebugLog(casteSpecs[i])
            }
            DebugLog('create ' + thisRole)
            var newName = spawn.createCreep(casteSpecs, undefined, {role: thisRole});
            break;
        }
    }

    var sources = spawn.room.find(FIND_SOURCES);
    var sourceIndex = 0
    var sourceLength = sources.length
    
    var undefinedCount = 0
    var sourceCounts = new Array(sources.length)
    for (var i = 0; i < sourceLength; ++i)
    {
        sourceCounts[i] = 0;
    }
    
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.source != undefined) {
            sourceCounts[creep.memory.source]++;
        }
        else {
            undefinedCount++;
        }
    }
    var nextSources = []
    for(var count = 0; count < undefinedCount; count++) {
        var lowestCount = 9999999
        var lowestIndex = 0
        for (var si = 0; si < sources.length; ++si)
        {
            if (sourceCounts[si] < lowestCount)
            {
                lowestCount = sourceCounts[si]
                lowestIndex = si
            }
        }
        nextSources.push(lowestIndex);
        sourceCounts[lowestIndex]++;
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.source == undefined)
        {
            var sourceIndex = nextSources.shift()
            creep.memory.source = sourceIndex
            DebugLog(creep.name + ' assigned to source ' + sourceIndex)
        }
        
    }
}
