var mqtt = require('mqtt')

var Broker1 = 'mqtt://192.168.0.5:1884';
var Broker2 = 'mqtt://192.168.0.9:1885';


var client = mqtt.connect(Broker2)

client.on('connect', function () {

  var trigger = 0;

var sendMessage = setInterval(()=>{
  moment.tz.setDefault("Asia/Seoul");
  var timesent = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

var payload = {
  timesent : timesent,
  trigger : trigger 
}

      client.publish('/session/abcd001', JSON.stringify(payload))
      
      if(count>1000){
        clearInterval(sendMessage);
      }
      }, 100)
})
 


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})