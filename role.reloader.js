module.exports = roleReloader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.reloading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.reloading = false;
            creep.say('🔄 retrieving');
        }

        if (!creep.memory.reloading && creep.store.getFreeCapacity() == 0) {
            creep.memory.reloading = true;
            creep.say('🚧 reloading');
        }

        /**
         * Find the lowest hp structure
         */
        if (creep.memory.reloading) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return structure.structureType == STRUCTURE_TOWER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            retrieveEnergy(creep);
        }
    },
};

/** @param {Creep} creep **/
function retrieveEnergy(creep) {
    var storages = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
            return (
                structure.structureType == STRUCTURE_CONTAINER
            ) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        }
    })

    if (storages.length > 0) {
        if (creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storages[0]);
        }
    }
}

// module.exports = roleRepairer;