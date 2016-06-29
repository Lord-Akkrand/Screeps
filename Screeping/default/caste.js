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