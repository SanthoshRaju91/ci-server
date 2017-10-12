import lib from './lib/ci';

const WEBHOOK_PATH = '/webhook';
const SECRET = 'secret';
const BUILD_PATH = '/Users/santhoshraju/Documents/squad-web';

lib.initialize(WEBHOOK_PATH, SECRET, BUILD_PATH);
