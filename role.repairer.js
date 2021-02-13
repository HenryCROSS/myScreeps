var roleRepairer = {

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
            /**
             * @type {Structure}
             */
            var targets = creep.room.find(FIND_MY_STRUCTURES);
            if (targets.length) {
                let target = targets[1];

                for (let i = 2; i < targets.length; ++i) {
                    if ((targets[i].hits / targets[i].hitsMax) < (target.hits / target.hitsMax)) {
                        target = targets[i];
                    }
                }

                // let target = _.minBy(targets, target => target.hits / target.hitsMax);

                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleRepairer;