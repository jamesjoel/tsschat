/*
 Require all necessary module
*/
var express		 	= require('express');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var flash			= require('connect-flash');
var session 		= require('express-session');
var passport		= require('passport');

 /*
 Require our module for Routing Controller for all URL
 */
var router 			= require('./controllers/router'); 

var app = express();
var server = app.listen(3000, function(){
	console.log("Server Running");
})

/*
initializing passport 

*/
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret : 'tss'})); // Set Secret Key for session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/*
Setting for Appliction Views
*/
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

/*
Using module functionality
*/

app.use(express.static(__dirname+'/public')); // useing public directory for static files

app.use(router);

