var mqtt = require('mqtt')

var Broker = 'mqtt://59.9.86.21:1883';

var client = mqtt.connect(Broker)


var moment = require('moment');
require('moment-timezone');

var count = 0;
var message_parsed;

client.on('connect', function () {

  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  client.subscribe('/session/abcd001', function (err) {
    console.log(timeNow + " CONNECTED to Broker1 (error :" + err + ")")
  })
  
})


client.on('message', function (topic, message) {
    
  moment.tz.setDefault("Asia/Seoul");
  var timerescived = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

        message_parsed = JSON.parse(message);

        console.log(" Broker 1 : from IoT Sensor "+message_parsed.count+"rd Message" + "("+timerescived+ "-"+ message_parsed.timesent+")" +"    message time easped: " + moment.duration(moment(timerescived).diff(moment(message_parsed.timesent))).asMilliseconds());

})

var Broker2 = 'mqtt://183.97.43.212:1883';

var client2 = mqtt.connect(Broker2)

var count = 0;
var message_parsed;

client2.on('connect', function () {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow2 = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  client2.subscribe('/session/abcd001', function (err) {
    console.log(timeNow2 + "  CONNECTED to Broker2 (error :" + err + ")")
  })
  
})


client2.on('message', function (topic, message) {  moment.tz.setDefault("Asia/Seoul");
  var timerescived = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

        message_parsed = JSON.parse(message);

        console.log(" Broker 2 : from IoT Sensor "+message_parsed.count+"rd Message" + "("+timerescived+ "-"+ message_parsed.timesent+")" +"    message time easped: " + moment.duration(moment(timerescived).diff(moment(message_parsed.timesent))).asMilliseconds());

})
