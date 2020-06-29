var mosca = require('mosca');
 
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
  port: 1884,
  backend: ascoltatore
};
 
var server = new mosca.Server(settings);
 
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  console.log("sent_log "+ packet.payload.toString());
});
 
server.on('ready', setup);
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

//ISR Manager-----------------------------------------------------------------------------

