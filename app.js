var express = require("express")
, http = require('http')
, path = require('path')
,ejs = require('ejs');

require( './db' );
var mongoose = require( 'mongoose' );
var recordModel     = mongoose.model( 'xmasRecord' );

var app = express();
app.use('/js',express.static(path.join(__dirname,'public/javascripts')));
app.use('/css',express.static(path.join(__dirname,'public/styles')));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/addUser', function(req, res) {
    var callback = req.query.callback;
	if (req.query.name) {
	  var name = req.query.name;
	  var query = recordModel.findOne({ user_id: name });
	  query.exec(function(err, record){
	  	if (err) {
	        console.log('error');
	    	return handleError(err);
	    }
	    if(record == null) {
	      	var user = new recordModel({
	  			user_id:req.query.name,
	  			times: req.query.times,
	  			updated_at: Date.now()
	  		});
	  		user.save(function (err) {
	    		if (err) {
	    			console.log(err);
	    			return ;
	    		}
	  		});
	    	res.send(callback + '({statusMsg: "updated on server!"})');
      		res.end(); 
	    }
	    else {
	    	record.times = req.query.times;
	    	record.save();
	    	res.send(callback + '({statusMsg: "updated on server!"})');
      		res.end(); 
	    }
	  });
	}
	else {
	  res.send("Hello Express Server");
	  res.end();
	} 
}); 

app.get('/', function(req, res) { 
	
	var query = recordModel.find({}, function(err, users) {
		if (!err) {
			res.render('index',{'users':users});
			//res.send(users);
      		//res.end(); 
		}
	});
    
});

app.get('/awesomeWesley', function(req, res) { 
	recordModel.remove().exec();
	res.send('delete all records!');
    res.end(); 
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//app.listen(8000);
