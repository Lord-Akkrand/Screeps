// builder.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder'); // -> 'a thing'
 */
 
 var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Check for remaining energy
        //DebugLog('Builder ' + creep.name + ' energy ' + creep.carry.energy + ' / ' + creep.carryCapacity)
        if (creep.carry.energy <= 0 || creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            var sourceIndex = creep.memory.source
            if (sourceIndex == undefined)
            {
                DebugLog(creep.name + ' source undefined')
                sourceIndex = 0
            }
            creep.memory.harvesting = creep.carry.energy < creep.carryCapacity
            //DebugLog('Builder ' + creep.name + ' harvesting mode ' + creep.memory.harvesting)
            if(creep.harvest(sources[sourceIndex]) == ERR_NOT_IN_RANGE) {
                //DebugLog(creep.name + '(' + creep.memory.role + ') moving to source ' + sourceIndex)
                creep.moveTo(sources[sourceIndex]);
            }
        } else {
            var getBestRepair = function (s)
            {
                var roadsToRepair = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object){
                        return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
                    } 
                });
                var sites = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (site) => {
                        var isStructureType = s == undefined || site.structureType == s;
                        var isDamaged = site.hits < site.hitsMax;
                        return isStructureType && isDamaged;
                    }
                });
                sites = sites.concat(roadsToRepair);
                sites.sort(function(a, b){
                    var rangeA = creep.pos.getRangeTo(a);
                    var rangeB = creep.pos.getRangeTo(b);
                    var hitsLeftA = a.hitsMax - a.hits;
                    var hitsLeftB = b.hitsMax - b.hits;
                    return (creep.pos.getRangeTo(a) + hitsLeftA) - (creep.pos.getRangeTo(b) + hitsLeftB)
                    
                });
                return sites[0]
            }
            
            var site = undefined;
            var order = ['tower', 'rampart', 'wall', undefined]
            for (var spec in order)
            {
                site = getBestRepair(order[spec]);
                if (site)
                {
                    break;
                }
            }

            if (site) {
                // Go work on the construction site
                if (creep.repair(site) == ERR_NOT_IN_RANGE) {
                    DebugLog(creep.name + ' moving to structure site ' + site + " distance " + creep.pos.getRangeTo(site))
                    creep.moveTo(site);
                }
            }
            else
            {
                // Energy available, search for a construction site that matches the builder's specialization
                var specialization = creep.memory.specialization;
                if (specialization == undefined)
                {
                    specialization = 'extension'
                }
                var getBestSite = function (s)
                {
                    var sites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                        filter: (site) => {
                            return s == undefined || site.structureType == s;
                        }
                    });
                    sites.sort(function(a, b){return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b)});
                    return sites[0]
                }
                
                var site = undefined;
                var order = ['extension', 'road', undefined]
                for (var spec in order)
                {
                    site = getBestSite(order[spec]);
                    if (site)
                    {
                        break;
                    }
                }
    
    
                if (site) {
                    // Go work on the construction site
                    if (!creep.pos.isNearTo(site)) {
                        DebugLog(creep.name + ' moving to building site ' + site + " distance " + creep.pos.getRangeTo(site))
                        creep.moveTo(site);
                    } else {
                        DebugLog(creep.name + ' building')
                        creep.build(site);
                    }
                }
            }
        }
    }
};


module.exports = roleBuilder;