var mosca = require('mosca');
var mqtt = require('mqtt')
var moment = require('moment');
require('moment-timezone');

var broker_id = "broker02"


var ascoltatore = {
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1885,
  backend: ascoltatore
};

var server = new mosca.Server(settings);

server.on('ready', setup);
function setup() {
  console.log('ISR Platform Broker on');
}

var Agent_to_Master = mqtt.connect('mqtt://127.0.0.1:1888')
Agent_to_Master.on('connect', function () {
  console.log('ISR Agent Server on');
})

// fired when a message is received
server.on('published', function (packet, client) {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  var topic_arr = packet.topic.split("/");
  // if(topic_arr[3] == "subscribes"){
  //   console.log('Published at '+timeNow+ "| topic :  "+packet.topic+" | message : "+ packet.payload);
  // }
});


//ISR Agent-----------------------------------------------------------------------------


server.on('subscribed', (topic, client) => {
  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]

  if (topic_arr[1] == "session") {
    if (topic_arr[2] == "request") {
      console.log(user_id + " requested " + topic)

      Agent_to_Master.subscribe(broker_id+'/'+user_id + '/session/request', function (err) {
        console.log("Session Applied to Master (error :" + err + ")");
      })
    }
  }
})

Agent_to_Master.on('message', function (topic, message) {
  var topic_arr = topic.split("/");
  var user_id = topic_arr[1]

  if (topic_arr[2] == "session") {
    if (topic_arr[3] == "request") {
      console.log(user_id + " Assigned ");
      Agent_to_Master.unsubscribe(topic, () => {
        var Agent_to_Client = mqtt.connect('mqtt://127.0.0.1:1884')
        Agent_to_Client.on('connect', function () {
          console.log('ISR Agent Client on');
          Agent_to_Client.publish(user_id + '/session/request', message.toString())
          Agent_to_Client.end();
        })
      })
    }
  }
})
