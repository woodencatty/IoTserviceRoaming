var mosca = require('mosca')

var moment = require('moment');
require('moment-timezone');
var ascoltatore = {
  //using ascoltatore
  type: 'mongo',		
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1884,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
  moment.tz.setDefault("Asia/Seoul");
  var temp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
	console.log(temp + ' - client connected');		
});


server.on('subscribed', (topic, client)=>{
  var topic_arr = topic.split("/");
  var user_id = topic_arr[1]

  if (topic_arr[2] == "session") {
    if (topic_arr[3] == "request") {

      var message = {
        userid: user_id,
        session: 'abcde01', // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
      };
      server.publish(message, ()=>{
        
  moment.tz.setDefault("Asia/Seoul");
  var temp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        console.log(temp + " - session granted!")
      })

    }
  }
})

// fired when the mqtt server is ready
function setup() {
  console.log('Broker 1 is up and running on 1884')
}
