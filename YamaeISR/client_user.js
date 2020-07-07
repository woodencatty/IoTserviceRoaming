var mqtt = require('mqtt')

var Broker1 = 'mqtt://192.168.0.5:1884';
var Broker2 = 'mqtt://192.168.0.9:1885';

var client = mqtt.connect(Broker2)

var moment = require('moment');
require('moment-timezone');
 
client.on('connect', function () {
  client.subscribe('/session/abcd001', function (err) {
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
var payload = JSON.parse(message.toString());
console.log(payload)
 // console.log(" Data Received "+ post.count +" : "+ "("+timerescived+ "-"+ post.timesent+")" +"    message time easped: " + moment.duration(moment(timerescived).diff(moment(post.timesent))).asMilliseconds());

})