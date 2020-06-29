var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')
 
client.on('connect', function () {
  client.subscribe('/session/abcd001', function (err) {
    console.log("Subscribed with error " + err);
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  
  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  console.log(message.toString()+" - "+timeNow)
  
})