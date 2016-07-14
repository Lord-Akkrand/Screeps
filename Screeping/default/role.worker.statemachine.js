// role.worker.statemachine.js


var WorkerHubState = {
    name: 'WorkerHubState',
    InitMemory: function() {
        // Return an object containing a default set of data for this state
        return {};
    },

    GetName: function() {
        return this.name;
    },

    OnEnter: function (owner, stateMachine, previousState, data) {
        
    },

    OnUpdate: function (owner, stateMachine) {
        console.log(owner.name + ' in ' + this.name + ' of ' + stateMachine.name)
        var room = owner.room;
        var sources = room.getSources();
        for (var i in sources) {
            var source = Game.getObjectById(sources[i]);
            var assigned = source.getAssigned()
        }
    },

    OnExit: function(owner, stateMachine, nextState) {
    },

    // Override these Can* functions to provide further control on how other states
    // affect this state.
    CanEnter: function (owner, stateMachine) {
        return true;
    },

    CanExit: function(owner, stateMachine) {
        return true;
    },
};

var StateMachine = require('statemachine')
var WorkerStateMachine = new StateMachine();
WorkerStateMachine.OnInit('WorkerStateMachine');
WorkerStateMachine.RegisterState(WorkerHubState, true);

module.exports = WorkerStateMachine