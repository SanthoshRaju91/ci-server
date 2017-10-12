import webhook from 'github-webhook-handler';
import http from 'http';
import configuration from './config';
import { stateBuild } from './build';
import fs from 'fs';
import path from 'path';

const CONFIG = fs.readFileSync(
  path.resolve(__dirname, '../config.json'),
  'utf8'
);

const { PORT } = configuration;
const { WATCH_BRANCHS } = JSON.parse(CONFIG);

/**
* Initializing github webhook
* @method initialize
* @param WEBHOOK_PATH - webhook namespace
* @param SECRET - secret key for the github
*/
function initialize(WEBHOOK_PATH = '', SECRET = '', BUILD_PATH = '') {
  let handler = webhook({ path: WEBHOOK_PATH, secret: SECRET });

  handler.on('push', event => {
    let WATCHLIST = WATCH_BRANCHS.map(current => {
      return `refs/heads/${current}`;
    });

    if (WATCHLIST.indexOf(event.payload.ref) >= 0) {
      let index = WATCHLIST.indexOf(event.payload.ref);
      stateBuild(BUILD_PATH, event.payload, WATCHLIST[index]);
    }
  });

  /* starting the server and make it listen to webhook events */
  http
    .createServer((req, res) => {
      handler(req, res, err => {
        res.statusCode = 404;
        res.send('No such location exists on github');
      });
    })
    .listen(PORT, err => {
      if (err) {
        console.error(`Error on port :${PORT}`);
      } else {
        console.log(`Webhook listening on PORT: ${PORT}`);
      }
    });
}

export default {
  initialize
};
