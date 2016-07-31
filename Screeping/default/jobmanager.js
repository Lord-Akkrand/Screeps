// jobmanager.js

var JobFactory = require('job');

class JobManager {
    OnInit(owner) {
        this.owner = owner;
    }

    GetMemory() {
        var memory = this.owner.getMemory();
        if (memory.JobManager == undefined) {
            memory.JobManager = { Queue: [], Requests: [], QueueDirty: false }
        }
        return memory.JobManager;
    }

    GetJobQueue(setDirtyFlag) {
        var memory = this.GetMemory();
        if (setDirtyFlag != undefined) {
            memory.QueueDirty = setDirtyFlag;
        }
        return memory.Queue;
    }

    GetJobRequests() {
        var memory = this.GetMemory();

        return memory.Requests;
    }

    AddJob(jobInfo) {
        var queue = this.GetJobQueue(true);
        queue.push(jobInfo);
    }

    OnUpdate() {
        // Check for any assigned jobs that don't have matching creeps (they're dead?)
        var queue = this.GetJobQueue();
        for (var j in queue) {
            var job = queue[j];
            var currentlyAssigned = job.Assigned;
            if (currentlyAssigned != undefined) {
                var assignedCreep = Game.getObjectById(currentlyAssigned);
                if (assignedCreep == undefined) {
                    console.log('JobManager:OnUpdate() found a job (' + job.JobType + ') assigned to <' + currentlyAssigned + '>, who cannot be found.  Unassigning job.');
                    job.Assigned = undefined;
                }
            }
        }
        // sort the job queue
        queue.sort(function (a, b) {
            return JobFactory.Compare(a, b);
        });

        // requests only last a frame, so they'll all be deleted
        var requests = this.GetJobRequests();
        for (var i in requests) {
            var request = requests[i];
            var creep = Game.creeps[request];
            console.log(creep + ' has a job request.')
            for (var j in queue) {
                var job = queue[j];
                console.log(' -> checking job ' + j + ' in the queue.')
                var requirements = JobFactory.MeetsRequirements(job, creep);
                console.log(' -> requirements fit ' + requirements)
                var fitEmptyJob = job.Assigned == undefined && (requirements == JobFactory.RequirementsSucess || requirements == JobFactory.RequirementsOverqualified);
                var replaceAssignedJob = job.Assigned && job.AssignedQuality < requirements;
                var assignToCreep = fitEmptyJob || replaceAssignedJob;
                console.log(' -> fitEmptyJob ? <' + fitEmptyJob + '> replaceAssignedJob ? <' + replaceAssignedJob + '>')
                if (assignToCreep) {
                    console.log(' -> assign the job.')
                    // No one is doing this, and you can do it.
                    // Or, someone is doing it, and you can do it better.
                    if (job.Assigned) {
                        console.log(' -> job was already assigned to ' + job.Assigned)

                        // Unassign the creep currently doing it, then add a request for them to get a new job.
                        var assignedCreep = Game.getObjectById(job.Assigned);
                        assignedCreep.unassignJob();
                        JobFactory.Unassign(job);
                        requests.push({ CreepId: job.Assigned });
                    }

                    // assign the job to the creep, and stop looking for jobs for this creep.
                    JobFactory.Assign(job, creep);
                    break;
                }
            }
        }
        this.ClearRequests();
    }

    ClearRequests() {
        var memory = this.GetMemory();
        memory.Requests = []
    }

    RequestJob(creep) {
        var requests = this.GetJobRequests();
        requests.push(creep.name);
    }
};

module.exports = JobManager