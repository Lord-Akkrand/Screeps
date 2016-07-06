// statemachine.js
var State = require('statemachine.state');

class StateMachine {
    
    OnInit(name) {
        this.stateMachineName = name;
        this.states = {};
        
        // Register 'nothing' state
        this.RegisterState(State)
    }

    IsCurrentState(stateClass, owner) {
        var currState = this.GetCurrentState(owner);
        return (currState != undefined && currState.GetName() == stateClass.name);
    }

    GetStateMachinesMemory(owner) {
        var memory = owner.getMemory();
        if (memory.StateMachines == undefined) {
            memory.StateMachines = {}
        }
        return memory.StateMachines;
    }

    GetStateMachineMemory(owner) {
        var stateMachinesMemory = this.GetStateMachinesMemory(owner);
        if (stateMachinesMemory[this.stateMachineName] == undefined) {
            stateMachinesMemory[this.stateMachineName] = {
                currentStateName: '',
                isEntering: false,
                states: {},
            };
        }
        return stateMachinesMemory[this.stateMachineName];
    }

    GetStateMemory(owner, stateName) {
        var machineMemory = this.GetStateMachineMemory();
        if (machineMemory.states[stateName] == undefined) {
            var state = this.GetState(stateName);
            machineMemory.states[stateName] = state.InitMemory();
        }
        return machineMemory.states[stateName];
    }

    GetCurrentState(owner) {
        var machineMemory = this.GetStateMachineMemory(owner);
        var currentStateName = machineMemory.currentStateName
        return this.states[currentStateName];
    }

    SetCurrentStateName(owner, name) {
        var machineMemory = this.GetStateMachineMemory(owner);
        machineMemory.currentStateName = name;
    }

    GetState(stateName) {
        return this.states[stateName];
    }

    RegisterState(stateObj, isAliasin) {
        // Enforce state interface, see definition below
                
        var stateName = stateObj.GetName();
        if (this.states[stateName] != undefined) {
            console.log('State ' + stateName + ' already exists.');
            return false;
        }
       
        this.states[stateName] = stateObj;    
        return true;
    }

    OnUpdate(owner) {
        var stateObj = this.GetCurrentState(owner);
        if (stateObj != undefined) {
            stateObj.OnUpdate(owner, this);
        }
    }

    IsEntering(owner) {
        var machineMemory = this.GetStateMachineMemory(owner);
        var isEntering = machineMemory.isEntering;
        return isEntering;
    }

    SetEntering(owner, value) {
        var machineMemory = this.GetStateMachineMemory(owner);
        machineMemory.isEntering = value;
    }

    // Returns true if change state request was successful
    ChangeState(stateClass, owner) {
        var stateName = stateClass.name;
        var newState = this.states[stateName];
        if (newState == undefined) {        
            console.log("Failed to change state, unknown || unregistered state class: " + stateName + ", provided to StateMachine: " + this.name);
            return false;
        }
        else {
            var currState = this.GetCurrentState(owner);
            if (currState != newState && (newState == undefined || newState.CanEnter(owner, this))) {
                if (this.IsEntering(owner)) {
                    console.log("StateMachine console.log, while entering a state, we can't try && enter another new state:" + stateName);
                    return false;
                }

                var bEnterNewState = false;
                if (currState != undefined) {
                    if (currState.CanExit(owner, this)) {
                        // before we exit the current state, set a flag to indicate we are trying to enter a new state
                        // this way we can catch same frame multi state transition, && stop it.
                        this.SetEntering(owner, true);
                        // call on exit of current state
                        currState.OnExit(owner, this, newState);
                        bEnterNewState = true;
                    }
                    else {
                        bEnterNewState = true;           
                    }

                    if (bEnterNewState) {
                        // enter the new state
                        this.SetEntering(owner, true);
                        var prevState = currState;
                        this.SetCurrentStateName(owner, stateName);
                        currState = this.GetCurrentState(owner);
                        currState.OnEnter(owner, this, prevStat);
                        this.SetEntering(owner, false);
                        return true;
                    }
                }
            }
            return false;
        }
    }

    IsBusy(owner) {
        var stateObj = this.GetCurrentState(owner);
        if (obj != undefined) {
            return (!stateObj.CanExit(owner));
        }
        return false;
    }
};

module.exports = StateMachine