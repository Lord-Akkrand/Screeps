// guard.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */

var roleSniper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Find any hostile creep, focusing the one closest to the spawn
        var spawns = creep.room.find(FIND_MY_SPAWNS);
        var spawn = spawns[0]
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        var origin = spawn
        if (!origin)
        {
            origin = creep;
        }
        targets.sort(function(a,b) {return origin.pos.getRangeTo(a) - origin.pos.getRangeTo(b);})
        if (targets.length == 0)
        {
             targets = creep.room.find(FIND_HOSTILE_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType != STRUCTURE_CONTROLLER;
                    }
            });
            targets.sort(function(a,b) {return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);})
        }
        target = targets[0]
        if (target) {
            // Hostile creep found, engage
            if (!creep.pos.isNearTo(target)) {
                creep.moveTo(target);
            } else {
                creep.rangedAttack(target);
            }
        } else {
            // No hostile creep, back to spawn
            var flags = creep.room.find(FIND_FLAGS);
            var defendFlag = undefined
            for (var f in flags)
            {
                var flag = flags[f]
                if (flag.name == 'SpawnDefend')
                {
                    defendFlag = flag;
                    break;
                }
            }
            if (defendFlag)
            {
                if (!creep.pos.isNearTo(defendFlag)) {
                    creep.moveTo(defendFlag);
                }
            }
            else if (!creep.pos.isNearTo(spawn)) {
                creep.moveTo(spawn);
            }
        }
    }
};

module.exports = roleSniper;
