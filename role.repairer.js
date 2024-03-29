module.exports = roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }

        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repairing');
        }

        /**
         * Find the lowest hp structure
         */
        if (creep.memory.repairing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);

            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
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