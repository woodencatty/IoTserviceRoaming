var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://14.32.236.225:1884')

var moment = require('moment');
require('moment-timezone');
var count = 0;
var trigger = 0;


var user_id = "user01";
var session_info;

client.on('connect', function () {
  client.subscribe(user_id + '/session/request', function (err) {
    console.log("Session Applied (error :" + err + ")")
  })
})

client.on('message', function (topic, message) {

  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]

  if (topic_arr[1] == "session") {
    if (topic_arr[2] == "request") {
      console.log(user_id + " Assigned ");
      client.unsubscribe(user_id + '/session/request', () => {
        session_info = JSON.parse(message);
        console.log(message + "assigned");


        var sendMessage = setInterval(() => {

          moment.tz.setDefault("Asia/Seoul");
          var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
          client.publish('/session/' + session_info.session, timeNow)
          console.log("datasend to " + session_info.session);
          if (count = 100) {
            if(trigger = 0){
              client.end();
              client = mqtt.connect('mqtt://14.32.236.225:1885')
              trigger = 1;
              count = 0;
              clearInterval(sendMessage);
            }else{
              client.end();
              client = mqtt.connect('mqtt://14.32.236.225:1885')
              trigger = 0
              count = 0;
              clearInterval(sendMessage);
            }
          }
          count ++;
        }, 100)

      })
    }
  }

})


