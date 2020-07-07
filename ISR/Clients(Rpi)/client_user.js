var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1:1884')

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
        session_info = JSON.parse(message);
        console.log(message + "assigned");

        client.subscribe('/session/' + session_info.session, function (err) {
          console.log("sensor_data subscribe to " + session_info.session + "(error :" + err + ")")
        })
      })
    } else {
      moment.tz.setDefault("Asia/Seoul");
      var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      console.log("[" + timeNow + "] message at Broker1" + topic + " : " + message + "    message time easped: " + moment.duration(moment(timeNow).diff(moment(message))).asMilliseconds());
    }
  }

})



var client2 = mqtt.connect('mqtt://127.0.0.1:1885')

var moment = require('moment');
require('moment-timezone');

var user_id = "user01";
var session_info = {}

client2.on('connect', function () {
  client2.subscribe(user_id + '/session/request', function (err) {
    console.log("Session Applied (error :" + err + ")")
  })
})

client2.on('message', function (topic, message) {

  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]

  if (topic_arr[1] == "session") {
    if (topic_arr[2] == "request") {
      console.log(user_id + " Assigned ");
      client2.unsubscribe(user_id + '/session/request', () => {
        session_info = JSON.parse(message);
        console.log(message + "assigned");

        client2.subscribe('/session/' + session_info.session, function (err) {
          console.log("sensor_data subscribe to " + session_info.session + "(error :" + err + ")")
        })
      })
    } else {
      moment.tz.setDefault("Asia/Seoul");
      var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      console.log("[" + timeNow + "] message at Broker2 " + topic + " : " + message + "    message time easped: " + moment.duration(moment(timeNow).diff(moment(message))).asMilliseconds());
    }
  }

})