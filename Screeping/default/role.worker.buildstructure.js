
var BuildStructureStates = {
    HubState: {
        name: 'BuildStructure_HubState',
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
                // If there's no construction site, then place one.
                // Then, the creep needs to get some energy, move to the site, and build it.

                // If the creep has energy, they should move to the controller and upgrade it.
                // If they don't have energy, they should move to the nearest place to get energy and gather it.
                if (owner.carry.energy > 0) {
                    console.log('->Has ' + owner.carry.energy + ' energy.  Moving to upgrade controller.');
                    stateMachine.ChangeState(BuildStructureStates.MoveToSite, owner, undefined);
                }
                else {
                    console.log('->Has ' + owner.carry.energy + ' energy.  Moving to gather energy.');
                    stateMachine.ChangeState(BuildStructureStates.GatherEnergy, owner, undefined);
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
    MoveToSite: {
        name: 'BuildStructure_MoveToSite',
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
                if (owner.carry.energy <= 0) {
                    console.log('->Has ' + owner.carry.energy + ' energy.  Moving to gather energy.');
                    stateMachine.ChangeState(BuildStructureStates.GatherEnergy, owner, undefined);
                    return;
                }
                var jobPos = job.Position;
                var jobPosition = new RoomPosition(jobPos.X, jobPos.Y, jobPos.RoomName);
                
                if (job.ConstructionSite == undefined) {
                    owner.room.createConstructionSite(jobPosition, job.TargetId);
                    var lookForAt = owner.room.lookForAt(LOOK_CONSTRUCTION_SITES, jobPosition);
                    console.log(' just added construction site, found this ' + JSON.stringify(lookForAt));
                    job.ConstructionSite = lookForAt.constructionSite.id;
                }

                if (job.ConstructionSite) {
                    var site = Game.getObjectById(job.ConstructionSite);
                    if (owner.build(site) == ERR_NOT_IN_RANGE) {
                        owner.moveTo(jobPosition);
                    }
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
        name: 'BuildStructure_GatherEnergy',
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
                if (owner.carry.energy >= owner.carryCapacity) {
                    console.log('->Has ' + owner.carry.energy + '/' + owner.carryCapacity + ' energy.  Moving to upgrade controller.');
                    stateMachine.ChangeState(UpgradeControllerStates.MoveToController, owner, undefined);
                    return;
                }
                var sources = owner.room.find(FIND_SOURCES);
                sources.sort(function (a, b) {
                    var rangeA = owner.pos.getRangeTo(a);
                    var rangeB = owner.pos.getRangeTo(b);
  
                    return owner.pos.getRangeTo(a) - owner.pos.getRangeTo(b);
                });
                if (owner.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    //console.log(owner.name + '(' + owner.memory.role + ') moving to source ' + sourceIndex)
                    var ret = owner.moveTo(sources[0]);
                    if (ret == ERR_NO_PATH) {
                        console.log('we have a problem getting to the closest source!');
                    }
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
}

module.exports = UpgradeControllerStates;