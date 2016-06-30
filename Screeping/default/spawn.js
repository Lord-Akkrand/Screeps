// spawn.js

var logThis = false
var DebugLog = function(str)
{
    if (logThis)
    {
        console.log(str)
    }
}
Spawn.prototype.update = function()
{
    console.log('Spawn name ' + this.name)
}

Spawn.prototype.place = function()
{

}
