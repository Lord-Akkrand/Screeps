// role.worker.statemachine.js

var UpgradeControllerStates = require('role.worker.upgradecontroller');

var WorkerHubJobStates = {
    UpgradeController: UpgradeControllerStates.HubState,
};

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
        var creepMem = owner.getMemory();
        var job = creepMem.Job;
        if (job) {
            var jobHubState = WorkerHubJobStates[job.JobType];
            if (jobHubState) {
                console.log(JSON.stringify(job));
                console.log('->Has a Job of type <' + JSON.stringify(job.JobType) + '>. Entering new hub state.');
                stateMachine.ChangeState(jobHubState, owner, undefined);
            }
            else {
                console.log('->Has a Job of type <' + job.JobType + '>. There is no hub state defined.  ' + owner.name + ' is frustrated.');
            }
        }
        else {
            console.log('->Has no Job.  Is bored.')
        }
    },

    OnExit: function (owner, stateMachine, nextState) {
        console.log(owner.name + ' leaving ' + this.name + ' of ' + stateMachine.name + '.  Next state is ' + nextState.name)
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

for (var i in UpgradeControllerStates) {
    var state = UpgradeControllerStates[i];
    WorkerStateMachine.RegisterState(state);
}

module.exports = WorkerStateMachine