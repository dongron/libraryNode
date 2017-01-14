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

var server = app.listen(process.env.PORT || 5000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port)
})

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var userCollection;
var booksCollection;

//mongodb://localhost:27017/library
//mongodb://user:password@ds159188.mlab.com:59188/library
MongoClient.connect("mongodb://user:password@ds159188.mlab.com:59188/library", function(err, db) {
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
	updateRenting(req, res, true);
})

app.post('/return', function(req, res) {
	updateRenting(req, res); 
})

app.post('/returnWithReview', function(req, res) {
	updateRenting(req, res); 
})

app.get('/reviews/:_id', function (req, res) {
	console.log(req.params._id);
	booksCollection.findOne({"_id": new ObjectId(req.params._id)}).then(
		item => {
			var book = {
				id: req.params._id,
				name: item.name,
				author: item.author
			}
			res.render(__dirname + "/views/" +'bookDetails.html',{userId: User.id, book: book, reviews: item.review});
			// res.send(item.review);
		},
		err => console.error(err)
	);
})

app.post('/removeRev', function (req, res) {
	console.log(req.body.bookId + "|" + req.body.userId );

	booksCollection.update({"_id": new ObjectId(req.body.bookId)}, 
		{$pull: {"review" : { "user_id": new ObjectId(req.body.userId)}}}).then(
			items => {
				res.send("removed");
			},
			err => console.log(err)
		);

})

// --

function updateRenting(req, res, isRenting) {
	var bookId = req.body.item;
	var review = req.body.review || "";
	console.log(User.id);
	if(!bookId) {
		return;
	} else if(isRenting) {
		booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": User.id.toString()}}).then(
			items => {
				res.redirect('/list');
			},
			err => console.log(err)
		);
	} else if(review) {
		var reviewObject = {
			date: new Date(),
			user_id: new ObjectId(User.id),
			content: review
		}
		booksCollection.update({"_id": new ObjectId(bookId)}, {$push: {"review" : reviewObject}}).then(
			items => {
				res.redirect('/list');
			},
			err => console.log(err)
		);
		booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": ""}}).then(
			items => {
				res.redirect('/list');
			},
			err => console.log(err)
		);
	} else {
		booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": ""}}).then(
			items => {
				res.redirect('/list');
			},
			err => console.log(err)
		);
	}
}