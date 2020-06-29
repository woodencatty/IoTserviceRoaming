var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1:1883')

var moment = require('moment');
require('moment-timezone');

var user_id = "user01";
var session_info = {}

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
        session_info = message.toString();
        console.log(session_info + "assigned");
      })
    }
  }

})
/*
var sendMessage = setInterval(() => {

  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  client.publish('/session/abcd001', timeNow)

  if (count > 1000) {
    clearInterval(sendMessage);
  }
}, 100)
*/