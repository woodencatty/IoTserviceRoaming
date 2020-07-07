var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://192.168.0.5:1884')

var Broker1 = 'mqtt://192.168.0.5:1884';
var Broker2 = 'mqtt://192.168.0.9:1885';

var moment = require('moment');
require('moment-timezone');
var count = 0;
var trigger = 1;
var set = 0;

var user_id = "user01";
var session_info;

client.on('connect', function () {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow2 = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    console.log(timeNow2 + " - SESSION_APPLY (error :null)")
    
  moment.tz.setDefault("Asia/Seoul");
  var temp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        console.log(temp + " - user01 Assigned on abcd001");

        var sendMessage = setInterval(() => {

          moment.tz.setDefault("Asia/Seoul");
          var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

          var sendingData = {
            "timesend" : timeNow,
            "trigger" : trigger
          }

          client.publish('/session/abcd001', JSON.stringify(sendingData))
          console.log(timeNow + " - data send to /session/abcd001");
          if (count = 100) {
            if(trigger = 0){
              trigger = 1;
              count = 0;
              console.log("change to Broker 2");
              client.end();
              client = mqtt.connect(Broker2)
              clearInterval(sendMessage);
            }else{
              trigger = 0
              count = 0;
              console.log("change to Broker 1");
              client.end();
              client = mqtt.connect(Broker1)
              set ++;
              clearInterval(sendMessage);
            }
          }
          count ++;
          if(set > 10){
            clearInterval(sendMessage);
          }
        }, 100)


})

client.on('message', function (topic, message) {

  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]




})


