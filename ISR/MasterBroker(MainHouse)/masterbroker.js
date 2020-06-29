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

// fired when a message is received
server.on('published', function (packet, client) {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  var topic_arr = packet.topic.split("/");
  // if(topic_arr[3] == "subscribes"){
  //   console.log('Published at '+timeNow+ "| topic :  "+packet.topic+" | message : "+ packet.payload);
  // }
});

//ISR Manager-----------------------------------------------------------------------------


server.on('subscribed', (topic, client) => {
  var topic_arr = topic.split("/");
  var user_id = topic_arr[0]

  if (topic_arr[1] == "session") {
    if (topic_arr[2] == "request") {

      var ISR_Manager = mqtt.connect('mqtt://127.0.0.1:1884')
      ISR_Manager.on('connect', function () {
        console.log('ISR Manager on');
      })
      console.log(user_id + " requested " + topic)
      ISR_Manager.publish(topic, '{"session" : "vs56lj", "status" : "granted"}')
      console.log("session granted to " + user_id)

      ISR_Manager.end();
    }
  }

})

server.on('clientDisconnected', function (client) {
  console.log('clientDisconnected ', client.id);

  //var client = mqtt.connect('mqtt://127.0.0.1:1884')

  // client.on('connect', function () {
  //     client.publish('/User/'+client.id, "leave");
  // })

});


function makeSessionId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}