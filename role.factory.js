module.exports = class creepFactory {
    creepAttributes(move, work, carry, attack = 0, ranged_attack = 0, heal = 0, claim = 0, tough = 0) {
        var attributes = {
            'MOVE': move,
            'WORK': work,
            'CARRY': carry,
            'ATTACK': attack,
            'RANGED_ATTACK': ranged_attack,
            'HEAL': heal,
            'CLAIM': claim,
            'TOUGH': tough,
        };

        var attributeName = Object.keys(attributes);
        var attributeList = [];

        for (var attribute in attributeName) {
            for (let i = 0; i < attributes[attribute]; ++i) {
                attributeList.push(attribute);
            }
        }

        return attributeList;
    }

    spawnHarvester(attribute) {
        const id = getCreepID("harvester");
        Game.spawns['Spawn1'].spawnCreep(attribute, id, { memory: { role: 'harvester' } });
    }

    spawnUpgrader() {

    }

    spawnBuilder() {

    }

}
function spawnCreep() {
    // Game.spawns['Spawn1'].spawnCreep()
}

function getCreepID(id) {
    return id + ": " + Game.time;
}