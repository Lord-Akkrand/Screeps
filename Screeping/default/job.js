// job.js

var JobFactory = {
    CreateJob: function (jobType, ownerId, targetId) {
        return { JobType: jobType, OwnerId: ownerId, TargetId: targetId, BodyRequirements: [], Priority: [0, 0] };
    },

    SetBodyRequirements: function(job, parts) {
        job.BodyRequirements = parts;
    },

    Compare: function (jobaA, jobB) {
        var priorityA = jobA.Priority
        var priorityB = jobB.Priority
        for (tier in priorityA) {
            var valueA = priorityA[tier];
            var valueB = priorityB[tier];
            var diff = valueA - valueB;
            if (diff != 0) {
                return diff;
            }
        }
        return 0;
    },

    RequirementsFailure: 0,
    RequirementsSucess: 1,
    RequirementsOverqualified: 2,

    MeetsRequirements: function(job, creep) {
        var creepRemaining = creep.body.slice(0);
        var requirements = job.BodyRequirements.slice(0);
        for (var i in requirements) {
            var requirement = requirements[i];
            var hasRequirement = creepsRemaining.find(function (bodyPart) {
                return bodyPart.type == requirement;
            });
            if (hasRequirement == undefined) {
                return JobFactory.RequirementsFailure;
            }
            creepRemaining = creepRemaining.filter(function (bodyPart) {
                return bodyPart.type != requirement;
            });
        }
        if (creepRemaining.length == 0) {
            return JobFactory.RequirementsSucess;
        }
        return JobFactory.RequirementsOverqualified;
    },

    AddParameter: function(job, parameterName, parameterValue) {
        job[parameterName] = parameterValue;
    },

    AddPosition: function(job, roomPosition) {
        job.Position = { X: roomPosition.x, Y: roomPosition.y, RoomName: roomPosition.roomName };
    },

    GetPosition: function (job) {
        return job.Position;
    },

    GetRoomPosition: function (job) {
        return new RoomPosition(job.Position.X, job.Position.Y, job.Position.RoomName);
    },
};

module.exports = JobFactory