import lib from './lib/ci';

const WEBHOOK_PATH = '/webhook';
const SECRET = '';
const BUILD_PATH = '/root/squad-web';

lib.initialize(WEBHOOK_PATH, SECRET, BUILD_PATH);
