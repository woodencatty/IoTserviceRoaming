var mosca = require('mosca');

var mqtt = require('mqtt')

var moment = require('moment');
require('moment-timezone');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1884,
  backend: ascoltatore
};

var server = new mosca.Server(settings);
server.on('ready', setup);

function setup() {
  console.log('ISR Platform Broker on');
}



//ISR Manager-----------------------------------------------------------------------------

var user_session = {
  user_id = "",
  broker_id = "",
  broker_ip = "",
  session_id = ""
}

server.on('subscribed', (topic, client) => {
  var topic_arr = topic.split("/");
  var broker_id = topic_arr[0]
  var user_id = topic_arr[1]

  if (topic_arr[2] == "session") {
    if (topic_arr[3] == "request") {

      var ISR_Manager = mqtt.connect('mqtt://127.0.0.1:1884')
      ISR_Manager.on('connect', function () {
        console.log('ISR Manager on');
      })
      user_session.user_id = user_id;
      user_session.broker_id = broker_id;
      user_session.session_id = "vs56lj";
      user_session.broker_ip = client.connection.stream.remoteAddress;
      
      console.log(user_id + " requested " + topic)
      ISR_Manager.publish(topic, '{"session" : "vs56lj", "status" : "granted"}')
      ISR_Manager.publish(user_id+'/session/info', user_session);

      console.log("session granted to " + user_id)

      ISR_Manager.end();
    }
  }

})

function makeSessionId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}