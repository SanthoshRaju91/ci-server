/**
* Main file for the CI server module.
* Exposes the API's for usage with the module.
*/
var webhook = require('github-webhook-handler');
var http = require('http');
var fs = require('fs');
var path = require('path');
var build = require('./build');

/* Reading the config.json from the project root directory */
var APP_ROOT = process.cwd();
var CONFIG = fs.readFileSync(path.join(APP_ROOT, '/config.json'), 'utf8');

var PORT = 7777;
var WEBHOOK_PATH = '';
var SECRET = '';
var BUILD_PATH = '';
var ACCESS_TOKEN = '';

var WATCH_BRANCHS = JSON.parse(CONFIG).WATCH_BRANCHS;
var SCRIPT_FILE = JSON.parse(CONFIG).FILENAME;

/**
* Function to start the CI server from the instance.
* @method start
* @param instanceCB - callback from initializer for creating the instance
* @param statusCB - callback from initializer for deployment status
*/
function start(instanceCB, statusCB) {
  var handler = webhook({ path: WEBHOOK_PATH, secret: SECRET });

  // TODO: parse the yml file for vaidating the instructions

  /* webhook handler listening for the push event from github */
  handler.on('push', function(event) {
    var WATCHLIST = WATCH_BRANCHS.map(function(current) {
      return 'refs/heads/' + current;
    });

    if (~WATCHLIST.indexOf(event.payload.ref)) {
      var index = WATCHLIST.indexOf(event.payload.ref);

      build(
        APP_ROOT,
        BUILD_PATH,
        WATCH_BRANCHS[index],
        SCRIPT_FILE,
        event.payload,
        statusCB
      );
    }
  });

  /* starting the server and make it listen to webhook events */
  http
    .createServer(function(req, res) {
      handler(req, res, function(err) {
        res.statusCode = 404;
        res.send('No such location exists on github');
      });
    })
    .listen(PORT, function(err) {
      if (err) {
        instanceCB(err, PORT);
      } else {
        instanceCB(null, PORT);
      }
    });
}

/**
* Function for creating the CI instance
* @method createInstance
* @param config - Configuration object for CI server
*/
function Instance(config) {
  PORT = config.PORT || PORT;
  WEBHOOK_PATH = config.WEBHOOK_PATH;
  SECRET = config.SECRET;
  BUILD_PATH = config.BUILD_PATH;

  return {
    start: start
  };
}

module.exports = Instance;
