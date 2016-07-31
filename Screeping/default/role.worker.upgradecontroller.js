
var UpgradeControllerStates = {
    HubState: {
        name: 'ControllerUpgrader_HubState',
        InitMemory: function () {
            // Return an object containing a default set of data for this state
            return {};
        },

        GetName: function () {
            return this.name;
        },

        OnEnter: function (owner, stateMachine, previousState, data) {
            console.log(owner.name + ' entering ' + this.name + ' of ' + stateMachine.name + '.  Previous state was ' + previousState.name)
        },

        OnUpdate: function (owner, stateMachine) {
            console.log(owner.name + ' in ' + this.name + ' of ' + stateMachine.name)
            var creepMem = owner.getMemory();
            var job = creepMem.Job;
            if (job) {
                console.log(owner.name + ' has a job of type ' + job.JobType + '.');
                // If the creep has energy, they should move to the controller and upgrade it.
                // If they don't have energy, they should move to the nearest place to get energy and gather it.
                if (owner.carry.energy > 0) {
                    console.log('->Has ' + owner.carry.energy + ' energy.  Moving to upgrade controller.');
                    stateMachine.ChangeState(UpgradeControllerStates.MoveToController, owner, undefined);
                }
                else {
                    
                }
            }
            else {
                console.log('->Has no Job.  Cannot perform this state without one.')
            }
        },

        OnExit: function (owner, stateMachine, nextState) {
        },

        // Override these Can* functions to provide further control on how other states
        // affect this state.
        CanEnter: function (owner, stateMachine) {
            return true;
        },

        CanExit: function (owner, stateMachine) {
            return true;
        },
    },
    MoveToController: {
        name: 'ControllerUpgrader_MoveToController',
        InitMemory: function () {
            // Return an object containing a default set of data for this state
            return {};
        },

        GetName: function () {
            return this.name;
        },

        OnEnter: function (owner, stateMachine, previousState, data) {
            console.log(owner.name + ' entering ' + this.name + ' of ' + stateMachine.name + '.  Previous state was ' + previousState.name)
        },

        OnUpdate: function (owner, stateMachine) {
            console.log(owner.name + ' in ' + this.name + ' of ' + stateMachine.name)
            var creepMem = owner.getMemory();
            var job = creepMem.Job;
            if (job) {
                console.log(owner.name + ' has a job of type ' + job.JobType + '.');
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                console.log('->Has no Job.  Cannot perform this state without one.')
                var hubState = stateMachine.getState('WorkerHubState')
                stateMachine.ChangeState(hubState, owner, undefined);
            }
        },

        OnExit: function (owner, stateMachine, nextState) {
        },

        // Override these Can* functions to provide further control on how other states
        // affect this state.
        CanEnter: function (owner, stateMachine) {
            return true;
        },

        CanExit: function (owner, stateMachine) {
            return true;
        },
    },
    GatherEnergy: {
        name: 'ControllerUpgrader_GatherEnergy',
        InitMemory: function () {
            // Return an object containing a default set of data for this state
            return {};
        },

        GetName: function () {
            return this.name;
        },

        OnEnter: function (owner, stateMachine, previousState, data) {
            console.log(owner.name + ' entering ' + this.name + ' of ' + stateMachine.name + '.  Previous state was ' + previousState.name)
        },

        OnUpdate: function (owner, stateMachine) {
            console.log(owner.name + ' in ' + this.name + ' of ' + stateMachine.name)
            var creepMem = owner.getMemory();
            var job = creepMem.Job;
            if (job) {
                console.log(owner.name + ' has a job of type ' + job.JobType + '.');
                
            }
            else {
                console.log('->Has no Job.  Cannot perform this state without one.')
                var hubState = stateMachine.getState('WorkerHubState')
                stateMachine.ChangeState(hubState, owner, undefined);
            }
        },

        OnExit: function (owner, stateMachine, nextState) {
        },

        // Override these Can* functions to provide further control on how other states
        // affect this state.
        CanEnter: function (owner, stateMachine) {
            return true;
        },

        CanExit: function (owner, stateMachine) {
            return true;
        },
    },
}

module.exports = UpgradeControllerStates;