// role.worker.statemachine.js

class CollectState {
    constructor(name) {
        this.name = 'CollectState';
    }

    InitMemory() {
        // Return an object containing a default set of data for this state
        return {};
    }

    GetName() {
        return this.name;
    }

    OnEnter(owner, stateMachine, previousState) {
    }

    OnUpdate(owner, stateMachine) {
    }

    OnExit(owner, stateMachine, nextState) {
    }

    // Override these Can* functions to provide further control on how other states
    // affect this state.
    CanEnter (owner, stateMachine) {
        var carryParts = owner.getActiveBodyParts(CARRY);
        return carryParts > 0;
    }

    CanExit(owner, stateMachine) {
        return true;
    }
};

var StateMachine = require('statemachine')
var WorkerStateMachine = new StateMachine();
WorkerStateMachine.OnInit('WorkerStateMachine');
WorkerStateMachine.RegisterState(CollectState);


module.exports = WorkerStateMachine