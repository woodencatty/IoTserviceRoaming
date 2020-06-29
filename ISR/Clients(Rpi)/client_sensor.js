var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://127.0.0.1:1883')

var moment = require('moment');
require('moment-timezone');
var count = 0;


client.on('connect', function () {
  var sendMessage = setInterval(() => {

    moment.tz.setDefault("Asia/Seoul");
    var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    client.publish('/session/abcd001', timeNow)

    if (count > 1000) {
      clearInterval(sendMessage);
    }
  }, 100)
})
