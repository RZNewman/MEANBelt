
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
const flash = require('express-flash');
var bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');
var path = require('path');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;


var emailF = function (email) {
    var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
}

var urlF = function (url) {
    var urlRegex = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
    return urlRegex.test(url);
}

var urlEmpty = function (url){
    return url ==null ||url ==="" || urlF(url);
}


var PetS = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], minlength: [3, 'Name must have 3 characters'], unique:true },
    type: { type: String, required: [true, 'Type is required'], minlength: [3, 'Type must have 3 characters'] },
    desc: { type: String, required: [true, 'Description is required'], minlength: [3, 'Description must have 3 characters'] },
    skill1: {type: String},
    skill2: {type: String},
    skill3: {type: String},
    likes: {type: Number, default:0}
    //ratings: [RatingS]

}, { timestamps: true })



// CakeS.virtual('rating').get(function(){
//     //console.log(ratings)
//     if(this.ratings.length==0){
//         return 0;
//     }
//     return this.ratings.map(r=>r.rating).reduce((tot,num)=> tot+num)/this.ratings.length;
// })

PetS.plugin(uniqueValidator, { message: '{PATH} already taken' });
//CakeS.set('toJSON', { virtuals: true });


mongoose.model('Pet', PetS);
var Pet = mongoose.model('Pet')








var app = express();

//app.use(express.static(__dirname + "/static"));
app.use(express.static( __dirname + '/routing/dist/routing' ));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mistletoevagabondiris',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash());
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');



app.get('/xp/pet', function (request, response) {

    Pet.find({}).sort('type').exec( function(err,pets){
        if(err){
            response.json({errors: err.errors})
        }
        else{
            response.json({pets:pets})
        }
    })
})
app.get('/xp/pet/:id', function (request, response) {

    Pet.findOne({_id:request.params.id}, function(err,pet){
        if(err){
            response.json({errors: err.errors})
        }
        else{
            response.json({pet:pet})
        }
    })
})

app.post('/xp/pet', function (request, response) {

    Pet.create({
        name:request.body.name,
        type:request.body.type,
        desc:request.body.desc,
        skill1:request.body.skill1,
        skill2:request.body.skill2,
        skill3:request.body.skill3,
    }, function(err, pet){
        if(err){
            response.json({errors: err.errors})
        }
        else{
            response.json({pet: pet})
        }
    })
        
})
app.put('/xp/pet/:id', function(request, response){
    var opts = { runValidators: true, context: 'query'};
    //console.log(request.body)
    Pet.updateOne({_id:request.params.id},{$set:{
        name:request.body.name,
        type:request.body.type,
        desc:request.body.desc,
        skill1:request.body.skill1,
        skill2:request.body.skill2,
        skill3:request.body.skill3,
    
    }},opts,(errors, pet)=>{
        if(errors){
            response.json({errors: errors.errors})
        }
        else{
            response.json({pet:pet})
        }
    } )
})
app.delete('/xp/pet/:id',function(request, response){
    Pet.deleteOne({_id:request.params.id},err=>{
        response.json({})
    })
})

app.get('/xp/pet/:id/like', function(request, response){
 
    Pet.updateOne({_id:request.params.id},{$inc:{
        likes:1,
    }},(errors, pet)=>{
        if(errors){
            response.json({errors: errors.errors})
        }
        else{
            response.json({pet:pet})
        }
    } )
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./routing/dist/routing/index.html"))
});




const server = app.listen(8000);
// const io = require('socket.io').listen(server);

// var color = 'white';

// io.on('connection', function (socket) {
//     //console.log('running')


//     socket.on('messSub', function (data) {

//         io.emit('message', { mess: data.name + " said " + data.mess })


//     });

// });
