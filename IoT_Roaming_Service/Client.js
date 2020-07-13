var mqtt = require('mqtt')

var Broker = 'mqtt://192.168.0.147:1883';


var client = mqtt.connect(Broker)

var count = 0;

var moment = require('moment');
require('moment-timezone');


client.on('connect', function () {

var sendMessage = setInterval(()=>{
  moment.tz.setDefault("Asia/Seoul");
  var timesent = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

var payload = {
  timesent : timesent,
  count : count
}

      client.publish('/session/abcd001', JSON.stringify(payload))
      
      if(count>100000){
        clearInterval(sendMessage);
      }
      count++;
      }, 100)
})
 


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})