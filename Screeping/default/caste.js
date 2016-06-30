// caste.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}

var casteFactory = function(spawn, casteSpecs, levelUpSpecs)
{
    var energyCapacity = spawn.room.energyAvailable;
    var casteSpecsLength = casteSpecs.length;
    
    DebugLog('CasteFactory energy ' + energyCapacity + ' original.len ' + casteSpecsLength)
    var bodyPartIndex = 0;
    var bodyParts = []
    while (energyCapacity > 0)
    {
        var part = casteSpecs[bodyPartIndex];
        var partCost = BODYPART_COST[part];
        DebugLog('attempt part ' + part + ' at cost ' + partCost)
        if (partCost > energyCapacity) { break; }
        energyCapacity -= partCost;
        bodyParts.push(part);
        DebugLog('added, ' + energyCapacity + ' remaining')
        bodyPartIndex++;
        if (bodyPartIndex >= casteSpecsLength) { 
            bodyPartIndex = 0; 
            if (levelUpSpecs)
            {
                casteSpecs = levelUpSpecs;
                casteSpecsLength = casteSpecs.length;
            }
        }
    }
    if (bodyParts.length < casteSpecs.length)
    {
        return casteSpecs;
    }
    return bodyParts;
}

module.exports = casteFactory;


class Caste {
    constructor(bodySpec, upgradeSpec, specOrder) {
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
        bodyParts.sort(function(a,b) { return this.m_specOrder[a] - this.m_specOrder[b]); });
        return bodyParts;
    }
    
    getBodyForSpawn(spawn) {
        return this.getBodyForEnergy(spawn.room.energyAvailable)
    }
};
