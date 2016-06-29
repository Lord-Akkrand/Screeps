var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        
            var sources = creep.room.find(FIND_SOURCES);
            var sourceIndex = creep.memory.source
            if (sourceIndex == undefined)
            {
                console.log(creep.name + ' source undefined')
                sourceIndex = 0
            }
            if(creep.harvest(sources[sourceIndex]) == ERR_NOT_IN_RANGE) {
                //console.log(creep.name + '(' + creep.memory.role + ') moving to source ' + sourceIndex)
                var ret = creep.moveTo(sources[sourceIndex]);
                if (ret == ERR_NO_PATH)
                {
                    
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            targets.sort(function(a, b){return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b)});
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    //console.log(creep.name + ' moving to ' + targets[0])
                }
            }
            else
            {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
	}
};

module.exports = roleHarvester;