// caste.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

var casteVersion = 1

if (!Memory.casteVersion || Memory.casteVersion != casteVersion) {
    console.log('Initialising Caste Memory ' + Memory.casteVersion + ' -> ' + casteVersion)
    // Initialization not done: do it

    Memory.castes = {}
    
    // Set the initialization flag
    Memory.casteVersion = casteVersion;
}

class Caste {
    constructor(bodySpec, upgradeSpec, specOrder) {
        console.log(bodySpec + ' ' + upgradeSpec + ' ' + specOrder)
        this.m_bodySpec = bodySpec
        this.m_upgradeSpec = upgradeSpec
        this.m_specOrder = {}
        for (var i in specOrder) {
            this.m_specOrder[specOrder[i]] = i;
        }
    }

    getBodyForEnergy(energyCapacity) {
        var casteSpecsLength = this.m_bodySpec.length;

        DebugLog('CasteFactory energy ' + energyCapacity + ' original.len ' + casteSpecsLength)
        var bodyPartIndex = 0;
        var bodyParts = []
        while (energyCapacity > 0) {
            var part = this.m_bodySpec[bodyPartIndex];
            var partCost = BODYPART_COST[part];
            DebugLog('attempt part ' + part + ' at cost ' + partCost)
            if (partCost > energyCapacity) { break; }
            energyCapacity -= partCost;
            bodyParts.push(part);
            DebugLog('added, ' + energyCapacity + ' remaining')
            bodyPartIndex++;
            if (bodyPartIndex >= casteSpecsLength) {
                bodyPartIndex = 0;
                if (this.m_upgradeSpec) {
                    this.m_bodySpec = this.m_upgradeSpec;
                    casteSpecsLength = this.m_bodySpec.length;
                }
            }
        }
        if (bodyParts.length < this.m_bodySpec.length) {
            bodyParts = this.m_bodySpec.slice(0);
        }
        var so = this.m_specOrder
        bodyParts.sort(function(a,b) { return so[a] - so[b]; });
        return bodyParts;
    }
    
    getBodyForSpawn(spawn) {
        return this.getBodyForEnergy(spawn.room.energyAvailable)
    }
};

var WorkerFactory = require('caste.worker')

var CasteFactory = function(requirements) {
    var casteId = requirements.caste;
    var caste = undefined;
    console.log('CasteFactory ' + casteId)
    switch (casteId) {
        case 'Worker':
            caste = WorkerFactory(Caste);
            break;
        default:
            break;
    }
    if (requirements.spawn) {
        return caste.getBodyForSpawn(requirements.spawn);
    }
    else {
        return caste.getBodyForEnergy(requirements.energy);
    }
}

module.exports = CasteFactory;