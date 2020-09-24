//used to log things to the console with a timestamp
const moment = require('moment');

module.exports.log = message => console.log(`[${moment()}] ${message}`);