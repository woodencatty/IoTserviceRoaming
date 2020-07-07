var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://14.32.236.225:1884')

var Broker1 = 'mqtt://14.32.236.225:1884';
var Broker2 = 'mqtt://14.32.236.225:1885';

var moment = require('moment');
require('moment-timezone');
var count = 0;
var trigger = 0;
var set = 0;

var user_id = "user01";
var session_info;

client.on('connect', function () {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow2 = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  client.subscribe(user_id + '/session/request', function (err) {
    console.log(timeNow2 + " - SESSION_APPLY (error :" + err + ")")
  })
})


client.on('message', function (topic, message) {

  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]

  if (topic_arr[1] == "session") {
    if (topic_arr[2] == "request") {
      client.unsubscribe(user_id + '/session/request', () => {


        moment.tz.setDefault("Asia/Seoul");
        var temp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        session_info = JSON.parse(message);
        console.log(temp + " - " + user_id + " Assigned on " + session_info);
        client.subscribe('/session/' + session_info.session, function (err) {
          console.log(temp + " - Session Use on  (error :" + err + ")")
        })

      })
    }
    else{
      moment.tz.setDefault("Asia/Seoul");
        var temp2 = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      console.log(temp2 + " - Message sent : " + message);
    }
  }
})
