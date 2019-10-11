//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/NODE_JS_JWT';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;

