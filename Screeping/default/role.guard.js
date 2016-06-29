// guard.js
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('guard'); // -> 'a thing'
 */

var roleGuard = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Find any hostile creep, focusing the one closest to the spawn
        var spawns = creep.room.find(FIND_MY_SPAWNS);
        var spawn = spawns[0]
        var targets = spawn.room.find(FIND_HOSTILE_CREEPS);
        targets.sort(function(a,b) {return spawn.pos.rangeTo(a) - spawn.pos.rangeTo(b);})
        target = targets[0]
        if (target) {
            // Hostile creep found, engage
            if (!creep.pos.isNearTo(target)) {
                creep.moveTo(target);
            } else {
                creep.attack(target);
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
                    defendFlag = flag
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

module.exports = roleGuard;
