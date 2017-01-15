// data
use library;

db.users.insert({login: "test", password: "test"});
db.users.insert({_id: ObjectId("5063114bd386d8fadbd6b000"), login: "superman", password: "iloveflying"});
db.users.insert({_id: ObjectId("5063114bd386d8fadbd6b002"),login: "basia123", password: "lubieplacki"});
db.users.insert({_id: ObjectId("5063114bd386d8fadbd6b001"),login: "adam666", password: "basialubiplacki"});
db.users.insert({_id: ObjectId("5063114bd386d8fadbd6b005"),login: "james", password: "james"});
db.users.insert({_id: ObjectId("5063114bd386d8fadbd6b004"), login: "test3", password: "test3"});


db.books.insert({name:"Kot w butach", author: "Grimm", year: "1960", review: [
	{date: new Date(), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "My kids love it!"},
	{date: new Date("2016-12-12T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "My kids love it!"},
	], rentBy: "5063114bd386d8fadbd6b004"});

db.books.insert({name:"30 doors down", author: "W. Gombowicz", year: "1956", review: [], rentBy: ""});

db.books.insert({name:"Harry Potter 1", author: "J.K. Rowling", year: "1999", review: [
  {date: new Date("2000-02-02T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b002"), content: "superman has this book for 5 years and noone can rent it! :( "}
  ], rentBy: "5063114bd386d8fadbd6b000"});

db.books.insert({name:"50 shades of Grey", author: "E.L. James", year: "2005", review: [
  {date: new Date("2016-12-12T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "Worst book ever, not recommend. "},
  {date: new Date("2017-01-01T22:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b000"), content: "Quite good. I dont like fantasy. Readable."},
  {date: new Date("2008-05-28T07:00:00Z"), user_id: "", content: "I m not info romaces. Worst book ever. 1/10"},
  {date: new Date("2010-10-10T10:00:00Z"), user_id: "", content: "I love this book. Gery is my ideal model of man."}
  ], rentBy: ""});  


db.books.insert({name:"30 doors down", author: "W. Gombowicz", year: "1956", review: [], rentBy: ""});

db.books.insert({name:"Star Wars: Memories", author: "L. Benner", year: "2000", review: [
  {date: new Date("2000-02-02T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "Quite good. Book about great film, but not as good."}
  ], rentBy: ""});  

db.books.insert({name:"Harry Potter 2", author: "J.K. Rowling", year: "2000", review: [], rentBy: "5063114bd386d8fadbd6b000"});

db.books.insert({name:"Hobbit", author: "John Ronald Reuel Tolkien", year: "1981", review: [
  {date: new Date("1999-12-12T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "Worst book ever, not recommend. "},
  {date: new Date("2010-07-01T22:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b001"), content: "The third in a trilogy of films adapting the enduringly popular masterpiece The Hobbit, by J.R.R. Tolkien. The Hobbit: The Battle of the Five Armies brings to an epic conclusion the adventures of Bilbo Baggins, Thorin Oakenshield and the Company of Dwarves. Having reclaimed their homeland from the Dragon Smaug, the Company has unwittingly unleashed a deadly force into the world. Enraged, Smaug rains his fiery wrath down upon the defenseless men, women and children of Lake-town. "},
  {date: new Date("2008-05-28T07:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b002"), content: "I really enjoy reading this book! It's better to read Hobbit before Lord Of The Rings."},
  {date: new Date("2011-10-10T10:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b003"), content: "As darkness converges on their escalating conflict, the races of Dwarves, Elves and Men must decide - unite or be destroyed. Bilbo finds himself fighting for his life and the lives of his friends in the epic Battle of the Five Armies, as the future of Middle-earth hangs in the balance."}
  ], rentBy: ""});  

db.books.insert({name:"The North Water", author: "Ian McGuire", year: "2016", review: [
  {date: new Date("20016-12-30T18:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b001"), content: "Propelled by a vision that is savage, brutal and relentless, McGuire relates the tale of an opium-addicted 19th-century Irish surgeon who encounters a vicious psychopath on board an Arctic-bound whaling ship."},
], rentBy: "5063114bd386d8fadbd6b002"}); 

db.books.insert({name:"The Underground Railroad", author: "Colson Whitehead", year: "2016", review: [], rentBy: ""}); 

db.books.insert({name:"Lord of the Rings 2", author: "J. R. R. Tolkien", year: "1990", review: [
  {date: new Date(), user_id: ObjectId("5063114bd386d8fadbd6b003"), content: "With a conceit as simple as it is bold, Whitehead’s brave, necessary novel imagines a slave fleeing north on a literal underground railroad "}
  ], rentBy: "5063114bd386d8fadbd6b005"}); 


















// var x = {
//   "date": new Date(), 
//   "user_id": new ObjectId("5874ec05d1ccb2a14ed48756"), 
//   "content": "Fajna lub nie [test]."
//   };

// db.books.update({"_id": new ObjectId("587504c56850d1925b379d29")}, {$push: 
//   {"review": x}
//   });



//db.books.insert({name:"Kot w butach", author: "Grimm", year: "1960", review: "Great book!", rentBy: ""});
//db.books.insert({name:"Mikolajek", author: "Goscinny", year: "1986", review: "", rentBy: ""});
//db.users.insert({"_id": ObjectId("5063114bd386d8fadbd6b004"), login: "Adam123", password: "Adam123"});
//db.users.insert({login: "test1", password: "test1"});
//db.users.insert({login: "test2", password: "test2"});



//use library;

//db.createUser(
//   {
//     user: "test",
//     pwd: "test",
//     roles:
//       [
//         { role: "readWrite", db: "library" }
//       ]
//   }
//)

//db.books.insert({name:"Kot w butach", author: "Grimm", year: "1960", review: "", rentBy: ""});
//db.books.insert({name:"Kot w butach", author: "Grimm", year: "1960", review: "", rentBy: ""});
//db.books.insert({name:"Mikolajek", author: "Goscinny", year: "1986", review: "", rentBy: ""});
//db.books.insert({name:"Harry Potter 1", author: "Rowling", year: "1999", review: "", rentBy: ""});
//db.users.insert({login: "test", password: "test"});
//db.users.insert({login: "test1", password: "test1"});
//db.users.insert({login: "test2", password: "test2"});





// inne: 
//db.books.remove({'name':'Kot w butach'});
//db.books.remove({'rentBy':'58666affbb569757a028012f'});
//db.books.insert({name:"Kot w butach", author: "Grimm", year: "1960", review: "", rentBy: ""});
//show collections;
//db.rozne.drop();

//db.test.drop();


//db.books.update({"name": "Mikolajek"}, { $set: {"rentBy": "58666affbb569757a028012f"}});



// nie użyte: 

//db.books.update({"name": "Mikolajek"}, {"rentBy": "58666affbb569757a028012f"});
//db.createCollection("books", {autoIndexID : true} ) {  }
//db.createCollection("user", autoIndexID : true) { 
//  "login" : 1 ,
//  "password" : 1 ,
//  };
  





