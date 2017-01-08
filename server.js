var express = require('express');

var bodyParser = require('body-parser');
var app = express();

var engines = require('consolidate');
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 
app.use(express.static('resources'));
app.use('/resources', express.static('resources'));

var server = app.listen(8082, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port)
})

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var userCollection;
var booksCollection;
MongoClient.connect("mongodb://localhost:27017/library", function(err, db) {
	if(!err) {
		console.log("We are connected");
		userCollection = db.collection('users');
		booksCollection = db.collection('books');
	} else {
		return console.dir(err);
	}
});

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/mustache', express.static(__dirname + '/node_modules/mustache/'));

var User = {id:'', logn:'', pass:'', list:''};
var isLocked = false;




app.get('/', function (req, res) {
   res.sendFile( __dirname + "/views/" + "login.html" );
})

app.post('/', function(req, res) {
	User.login = req.body.login;  
	User.pass = req.body.pass; 

	var passFromDatabase = "";
	userCollection.findOne({login: User.login}).then(
		item => {
			if(User.login && User.pass && User.pass === item.password) {
				User.id = item._id;
				res.redirect('/list');
			} else {
				console.error("Wrong pass/user");
			}
		},
		err => console.error(err)
	);
})

app.get('/list', function (req, res) {
		var usersBooks = [];
		var allBooks = [];
		booksCollection.find().toArray().then(
			items => {
				for (var i in items) {
					allBooks.push(items[i]);
					if(items[i].rentBy == User.id) {
						usersBooks.push(items[i]);
					}
				}
				var tmp = [];
				res.render(__dirname + "/views/" +'list.html',{user: User.login, allBooks: allBooks, usersBooks: usersBooks});
			},
			err => console.error(err)
		);
})


app.post('/rent', function(req, res) {
	var bookId = req.body.item;

	booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": User.id.toString()}}).then(
		items => {
			res.redirect('/list');
		},
		err => console.log(err)
	);
})

app.post('/return', function(req, res) {
	var bookId = req.body.item;

	booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": ""}}).then(
		items => {
			res.redirect('/list');
		},
		err => console.log(err)
	);
})

app.post('/returnWithReview', function(req, res) {
	var bookId = req.body.item;
	var review = req.body.review;

	booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": "", "review": review}}).then(
		items => {
			res.redirect('/list');
		},
		err => console.log(err)
	);
})
