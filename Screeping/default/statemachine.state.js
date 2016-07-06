// statemachine.state.js
////////////////////////////////////////////////////////////////////-
// State base class. 
// Derive from this to create custom state classes for use with 
// the StateMachine.
// Note: When deriving from State make sure to name your class uniquely.
// You can also use this base State if you need an empty/{ 
// nothing kind of state.
////////////////////////////////////////////////////////////////////-

class State {
    constructor(name) {
        this.name = 'StateDoNothing';
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
    CanEnter(owner, stateMachine) {
        return true;
    }

    CanExit(owner, stateMachine) {
        return true;
    }
};

module.exports = State