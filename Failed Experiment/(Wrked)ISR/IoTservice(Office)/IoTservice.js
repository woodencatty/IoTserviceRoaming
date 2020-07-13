var mqtt = require('mqtt')
var session_client = mqtt.connect('mqtt://127.0.0.1:1884')
var data_client = mqtt.connect('mqtt://127.0.0.1:1883')


var moment = require('moment');
require('moment-timezone');

var user_id = "user01";
var session_info = {}

session_client.on('connect', function () {
  session_client.subscribe(user_id + '/session/info', function (err) {
    console.log("Session info requests (error :" + err + ")")
  })
})

session_client.on('message', function (topic, message) {

  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]

  if (topic_arr[1] == "session") {
    if (topic_arr[2] == "info") {
      console.log(user_id + " Assigned ");
      session_client.unsubscribe(user_id + '/session/info', () => {
        session_info = JSON.parse(message);
        data_client.end(()=>{
          data_client = mqtt.connect('mqtt://'+session_info.broker_ip+':1883')
          data_client.subscribe('/session/' + session_info.session, function (err) {
            console.log("sensor_data subscribe to " + session_info.session + "(error :" + err + ")")
          })
        });
      })
    } else {
      moment.tz.setDefault("Asia/Seoul");
      var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      console.log("[" + timeNow + "] message at " + topic + " : " + message + "    message time easped: " + moment.duration(moment(timeNow).diff(moment(message))).asMilliseconds());
    }
  }

})