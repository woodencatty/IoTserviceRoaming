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
 
var moment = require('moment');
require('moment-timezone');

var settings = {
  port: 1883,
  backend: ascoltatore
};
 
var server = new mosca.Server(settings);
 
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  console.log('Published at '+timeNow+ " Sent at "+ packet.payload.toString());
});
 
server.on('ready', setup);
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

//ISR Agent-----------------------------------------------------------------------------
 
server.on('clientDisconnected', function(client) {
  console.log('clientDisconnected', client.id);

  var client = mqtt.connect('mqtt://127.0.0.1:1884')

  client.on('connect', function () {
      client.publish('/User/'+client.id, "leave");
  })
  
});