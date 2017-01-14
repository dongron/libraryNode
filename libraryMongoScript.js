// data
use library;

db.books.insert({name:"Kot w butach", author: "Grimm", year: "1960", review: "Great book!", rentBy: ""});
db.books.insert({name:"30 doors down", author: "W. Gombowicz", year: "1956", review: "", rentBy: ""});
db.books.insert({name:"Harry Potter 1", author: "J.K. Rowling", year: "1999", review: "", rentBy: ""});

db.users.insert({login: "test", password: "test"});
db.users.insert({login: "test1", password: "test1"});
db.users.insert({login: "test2", password: "test2"});
db.users.insert({_id: ObjectId("5063114bd386d8fadbd6b004"), login: "test3", password: "test3"});






  
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

//db.dupa.drop();


//db.books.update({"name": "Mikolajek"}, { $set: {"rentBy": "58666affbb569757a028012f"}});









// nie użyte: 

//db.books.update({"name": "Mikolajek"}, {"rentBy": "58666affbb569757a028012f"});
//db.createCollection("books", {autoIndexID : true} ) {  }
//db.createCollection("user", autoIndexID : true) { 
//  "login" : 1 ,
//  "password" : 1 ,
//  };
  




db.books.insert({name:"50 shades of Grey", author: "E.L. James", year: "2005", review: [
  {date: new Date("2016-12-12T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "Worst book ever, not recommend. "},
  {date: new Date("2017-01-01T22:00:00Z"), user_id: "", content: "Quite good. I dont like fantasy. Readable."},
  {date: new Date("2008-05-28T07:00:00Z"), user_id: "", content: "I m not info romaces. Worst book ever. 1/10"},
  {date: new Date("2010-10-10T10:00:00Z"), user_id: "", content: "I love this book. Gery is my ideal model of man."}
  ], rentBy: ""});  


db.books.insert({name:"30 doors down", author: "W. Gombowicz", year: "1956", review: "", rentBy: ""});

db.books.insert({name:"Star Wars: Memories", author: "L. Benner", year: "2000", review: [
  {date: new Date("2000-02-02T12:00:00Z"), user_id: ObjectId("5063114bd386d8fadbd6b004"), content: "Quite good. Book about great film, but not as good."}
  ], rentBy: ""});  


var x = {
  "date": new Date(), 
  "user_id": new ObjectId("5874ec05d1ccb2a14ed48756"), 
  "content": "Fajna lub nie [test]."
  };

db.books.update({"_id": new ObjectId("587504c56850d1925b379d29")}, {$push: 
  {"review": x}
  });

