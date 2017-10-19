import CI from '../lib/ci';

const WEBHOOK_PATH = '/webhook';
const SECRET = 'secret';
const BUILD_PATH = '/Users/santhoshraju/Documents/apollo-mongo';

const config = {
  WEBHOOK_PATH,
  SECRET,
  BUILD_PATH
};

const ciServer = new CI(config);

ciServer.start(
  (err, port) => {
    if (err) {
      console.log(`Error on port ${port}, ${err}`);
    } else {
      console.log(`Webhook listening on port: ${port}`);
    }
  },
  (err, status) => {
    if (err) {
      console.log(`Error in deployment ${err}`);
    } else {
      console.log(`Deployment completed`);
    }
  }
);
