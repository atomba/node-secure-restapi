
var fs = require('fs');
var secretJSON = fs.readFileSync('config/secret.json', 'utf8');
global.app_secret = JSON.parse(secretJSON).secretKey;

require('./library/core/mongoose')
require('./library/core/router2')