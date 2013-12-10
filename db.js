var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var xmasRecord = new Schema({
    user_id    : String,
    times    : Number,
    updated_at : Date
});
 
mongoose.model( 'xmasRecord', xmasRecord );
 
//mongoose.connect( 'mongodb://localhost/ewc' );
mongoose.connect( 'mongodb://drewc:drewc@ds053678.mongolab.com:53678/heroku_app20241895');
