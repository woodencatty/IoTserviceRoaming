var mqtt = require('mqtt')
var client  = mqtt.connect('192.9.44.51:1883')
 
client.on('connect', function () {
  client.subscribe('/session/abcd001', function (err) {
    console.log(err);
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})