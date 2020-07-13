var request = require('request');

var moment = require('moment');
require('moment-timezone');

var timeNow;
var count = 0;

var sendMessage = setInterval(()=>{

  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
request.post(
  {
    url: 'http://59.9.86.21:61234',
    form: { count : count ,timesent : timeNow, sender : "IoTSensor01"}
  },
  function (err, httpResponse, body) {
    if (err) {
      console.log(err);
    } else {
      
  moment.tz.setDefault("Asia/Seoul");
  var timeReturn = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      console.log("Time Easped Try "+ count +" : "+"("+ timeReturn+"-"+body+")"+"    message time easped: " + moment.duration(moment(timeReturn).diff(moment(body))).asMilliseconds());
      count ++;
    }
  })
if(count>1000){
  clearInterval(sendMessage);
}
}, 100)