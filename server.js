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
				console.log("Password ok "+ item._id);
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
		console.log("||");
		booksCollection.find().toArray().then(
			items => {
				for (var i in items) {
					allBooks.push(items[i]);
					if(items[i].rentBy == User.id) {
						usersBooks.push(items[i]);
						console.log("my books" +allBooks[i].rentBy);
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
	console.log("rent: "+bookId+ " | "+User.id);

	booksCollection.update({"_id": new ObjectId(bookId)}, {$set: {"rentBy": User.id.toString()}}).then(
		items => {
			console.log(" __ w then rent");
			res.redirect('/list');
		},
		err => console.log(err)
	);
})





/*	booksCollection.insert({name: bookId, author: User.name}).then(
		item => console.log("success " + item), 
		err => console.log(err)
	);*/




/*
app.get('/list', function (req, res) {
	redis.hgetall('user:'+User.login, function (err, result) {
		var items = [];
		var listItems = [];
		for (i in result) {
			items.push(result[i]);
		}
		if(User.pass === items[0]) {
			User.list = items[1];
			redis.lrange(User.list, 0, -1, function (err, resultL) {
				for (i in resultL) {
					listItems.push(resultL[i]);
					console.log(listItems[i]);
				}

				res.render(__dirname + "/" +'list.html',{user: User.login, list: listItems});
			})
		}
	});
})

app.post('/del', function(req, res) {
	var item = req.body.item;
	redis.lrem(User.list, -1, item);
	res.redirect('/list');
})

app.post('/add', function(req, res) {
	var newItem = req.body.newItem; 

	if(!newItem) return;
	redis.rpush(User.list, newItem);
	res.redirect('/list');
})

var editingElem;

app.post('/editElem', function(req, res) {
	editingElem = req.body.item; 

	if(!editingElem) return;
	res.redirect('/edit');
})

app.get('/edit', function(req, res) {
	if(!editingElem) return;
	res.render(__dirname + "/" +'edit.html',{item: editingElem});
})

app.post('/edit', function(req, res) {
	var newItem = req.body.item; 

	if(!editingElem || !newItem) return;
	redis.linsert(User.list,'BEFORE', editingElem, newItem);
	redis.lrem(User.list, -1, editingElem);
	res.redirect('/list');
})
*/