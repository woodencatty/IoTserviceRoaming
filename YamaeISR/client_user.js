var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.0.5:1884')

var Broker1 = 'mqtt://192.168.0.5:1884';
var Broker2 = 'mqtt://192.168.0.9:1885';

var moment = require('moment');
require('moment-timezone');

var count = 0;
var trigger = 0;
var set = 0;
var connected = 0;

var user_id = "user01";
var session_info;

client.on('connect', function () {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow2 = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    console.log(timeNow2 + " - SESSION_APPLY (error : null)")

    moment.tz.setDefault("Asia/Seoul");
    var temp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    console.log(temp + " - user001 Assigned on abcd001");

    client.subscribe('/session/abcd001', function (err) {
      console.log(temp + " - Session Use on  (error :" + err + ")")
    })
  
})


client.on('message', function (topic, message) {
console.log(message);
  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]
  payload = JSON.parse(message);

      moment.tz.setDefault("Asia/Seoul");
        var temp2 = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      console.log(temp2 + " - Message sent : " + payload);

      if(payload.trigger = 0){
        trigger = 1;
        count = 0;
        console.log("change to Broker 2");
        client.end();
        client = mqtt.connect(Broker2)
      }else{
        trigger = 0
        count = 0;
        console.log("change to Broker 1");
        client.end();
        client = mqtt.connect(Broker1)
      }

})
