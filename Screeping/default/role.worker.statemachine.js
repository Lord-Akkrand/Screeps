// role.worker.statemachine.js

var CollectState = {
    name: 'CollectState',
    InitMemory: function() {
        // Return an object containing a default set of data for this state
        return {};
    },

    GetName: function() {
        return this.name;
    },

    OnEnter: function(owner, stateMachine, previousState) {
    },

    OnUpdate: function(owner, stateMachine) {
    },

    OnExit: function(owner, stateMachine, nextState) {
    },

    // Override these Can* functions to provide further control on how other states
    // affect this state.
    CanEnter: function (owner, stateMachine) {
        var carryParts = owner.getActiveBodyParts(CARRY);
        return carryParts > 0;
    },

    CanExit: function(owner, stateMachine) {
        return true;
    },
};

var StateMachine = require('statemachine')
var WorkerStateMachine = new StateMachine();
WorkerStateMachine.OnInit('WorkerStateMachine');
WorkerStateMachine.RegisterState(CollectState, true);

module.exports = WorkerStateMachine