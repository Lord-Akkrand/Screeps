var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if (creep.carry.energy <= 0 || creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.harvesting = creep.carry.energy < creep.carryCapacity
            var controllerPos = creep.room.controller.pos
            sources.sort(function(a, b){return controllerPos.getRangeTo(a) - controllerPos.getRangeTo(b)});
            var source = sources[0]

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;