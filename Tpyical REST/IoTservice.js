const http = require('http');
var qs = require('querystring');

var requests = require('request');


var moment = require('moment');
require('moment-timezone');

http.createServer(function (request, response) {

  if (request.method == 'GET') {
    if (request.url == '/') {
      
      
  moment.tz.setDefault("Asia/Seoul");
  var timeNow = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  
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

      requests.post(
        {
          url: 'http://127.0.0.1:8081',
          form: { count : post.count ,timesent : post.timesent,  sender : post.sender}
        },
        function (err, httpResponse, body) {
          if (err) {
            console.log(err);
          } else {
           /* console.log("Message Sent at : " + post.timesent);
            console.log("\ndata Arrived at : " + body);*/
            response.end(body)
          }
        })

    })

  } else {
    console.log('other case requested...');
  }
}).listen(8080, function () { console.log('REST Data Center Running at http://210.102.181.221:8080'); });