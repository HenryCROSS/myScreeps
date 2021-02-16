const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('./role.builder');
const roleRepairer = require('./role.repairer');
const roleReloader = require('./role.reloader');
// const CreepFactory = require('./role.factory');

module.exports.loop = function () {


    /**
     * TOWER
     */
    var tower = Game.getObjectById('602ad02c66bfcaf35d1a78db');
    if (tower) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if (closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);

        // const targets = tower.room.find(FIND_STRUCTURES, {
        //     filter: object => object.hits < object.hitsMax
        // });

        // targets.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);

        // tower.repair(targets[0]);

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    // clear the creep after it is died
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    /**
     * CREEPS NUMBER
     */
    const HARVESTER_MAX = 4;
    const UPGRADER_MAX = 3;
    const BUILDER_MAX = 0;
    const REPAIRER_MAX = 2;
    const RELOADER_MAX = 1;

    // count harvesters
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var reloaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'reloader');
    console.log('=================================');
    console.log("Enery:" + Game.spawns['Spawn1'].energyCapacity);
    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Builders: ' + builders.length);
    console.log('Repairers: ' + repairers.length);
    console.log('Reloaders: ' + reloaders.length);

    // spawn reloader
    if (reloaders.length < RELOADER_MAX) {
        var newName = 'Reloader ' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'reloader' } });
    }

    // spawn repairer
    if (repairers.length < REPAIRER_MAX) {
        var newName = 'Repairer ' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'repairer' } });
    }

    // spawn harvester
    if (harvesters.length < HARVESTER_MAX) {
        var newName = 'Harvester' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'harvester' } });
    }

    // spawn upgrader
    if (upgraders.length < UPGRADER_MAX) {
        var newName = 'Upgrader' + Game.time;
        // console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }

    // spawn builder
    if (builders.length < BUILDER_MAX) {
        var newName = 'builder' + Game.time;
        // console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'builder' } });
    }

    /**
     * INFORMATION
     */

    // who is spawning
    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    /**
     * RUNNING
     */

    // run the creeps
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'reloader') {
            roleReloader.run(creep);
        }
    }
}