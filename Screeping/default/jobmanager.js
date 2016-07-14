// jobmanager.js

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
        
    }

    RequestJob(creep) {
        var requests = this.GetJobRequests();
        requests.push(creep.name);
    }
};

module.exports = JobManager