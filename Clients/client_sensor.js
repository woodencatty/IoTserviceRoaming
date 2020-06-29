var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.9.44.51:1883')
 
client.on('connect', function () {
      client.publish('/session/abcd001', 'Hello mqtt')
      console.log(err);
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})