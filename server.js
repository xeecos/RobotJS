var childProcess = require('child_process')
  , express = require('express')
  , http = require('http')
  , morgan = require('morgan')
  , ws = require('ws');

// configuration files
var configServer = require('./lib/config/server');

var app = express();
app.set('port', configServer.httpPort);
app.use(express.static(configServer.staticFolder));
app.use(morgan('dev'));
app.post('/post', function (req, res) {
    console.log(req.query);
    res.send('ok');
});
// serve index
require('./lib/routes').serveIndex(app, configServer.staticFolder);

// HTTP server
http.createServer(app).listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});