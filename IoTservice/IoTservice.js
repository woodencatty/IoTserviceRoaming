var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://203.249.127.29:1883')
 
client.on('connect', function () {
  client.subscribe('/session/abcd001', function (err) {
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})