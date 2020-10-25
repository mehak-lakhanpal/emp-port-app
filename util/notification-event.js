const EventEmitter = require('events');
class NotificationEmitter extends EventEmitter{ };

const userNotificationEmitter = new NotificationEmitter();

userNotificationEmitter.on('closeOpening', function(users,project,client){
    for(user of users){
        console.log(`Hi user-${user}, Opening with project name = ${project} and client = ${client} is closed !`);
    }
})

userNotificationEmitter.on('userApplication', function(user,opening){
     console.log(`Hi manager! User -${user} has applied for this Opening - ${opening}`);
})

exports.userNotificationEmitter = userNotificationEmitter;