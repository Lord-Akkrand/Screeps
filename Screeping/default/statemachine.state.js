// statemachine.state.js
////////////////////////////////////////////////////////////////////-
// State base class. 
// Derive from this to create custom state classes for use with 
// the StateMachine.
// Note: When deriving from State make sure to name your class uniquely.
// You can also use this base State if you need an empty/{ 
// nothing kind of state.
////////////////////////////////////////////////////////////////////-

var State = {
    name: 'StateDoNothing',
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
    CanEnter: function(owner, stateMachine) {
        return true;
    },

    CanExit: function(owner, stateMachine) {
        return true;
    },
};

module.exports = State