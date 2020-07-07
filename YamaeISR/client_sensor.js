var mqtt = require('mqtt')

var Broker1 = 'mqtt://192.168.0.5:1885';
var Broker2 = 'mqtt://192.168.0.9:1885';


var client = mqtt.connect(Broker2)

var count = 0;
var trigger = 0;


var moment = require('moment');
require('moment-timezone');


client.on('connect', function () {


var sendMessage = setInterval(()=>{
  moment.tz.setDefault("Asia/Seoul");
  var timesent = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

var payload = {
  timesent : timesent,
  trigger : trigger, 
  count : count
}

      client.publish('/session/abcd001', JSON.stringify(payload))
      
      if(count>100){
      count=0;
      if(trigger == 0){
        clearInterval(sendMessage);
        client.end();
        client = mqtt.connect(Broker1);
        trigger = 1;
      }else {
        clearInterval(sendMessage);
        client.end();
        client = mqtt.connect(Broker2);
        trigger = 0;
      }
      }
      count++;
      }, 100)
})
 


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})