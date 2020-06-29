const http = require('http');
var qs = require('querystring');

var moment = require('moment');
require('moment-timezone');


http.createServer(function (request, response) {

  if (request.method == 'GET') {
    if (request.url == '/') {
      timeNow = new Date().getTime();
      response.end(timeNow.toString());
    }
  }
  else if (request.method == 'POST') {

    var body = '';
    request.on('data', function (data) {
      body += data;
    })
    request.on('end', function () {
      var post = qs.parse(body);
      
moment.tz.setDefault("Asia/Seoul");
var timerescived = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

      console.log(post.sender + " Data Received "+ post.count +" : "+ "("+timerescived+ "-"+ post.timesent+")");

      response.end(post.timesent)
    })

  } else {
    console.log('other case requested...');
  }
}).listen(8081, function () { console.log('REST Data Center Running at http://127.0.0.1:8080'); });