
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dog_dash');

var DogSchema = new mongoose.Schema({
	name: String
})
mongoose.model('Doggie', DogSchema); 
var Doggie = mongoose.model('Doggie') 





app.get('/', function(req, res) {

    Doggie.find({}, function(err, doggie) {
    console.log(doggie)

    res.render('index', {dog: doggie});
    })
})

app.post('/process', function(req, res) {
    console.log("POST DATA", req.body);

    var dogInstance = new Doggie()
    dogInstance.name = req.body.name
    dogInstance.save(function(err){

    })

    res.redirect('/');
})

app.get('/add', function(req, res) {

    res.render("add");

})

app.get('/display/:id', function(req, res) {
    var id = req.params.id;
    console.log(id)
    Doggie.findOne({_id: id}, function(err, doggie) {
        console.log(doggie)
    res.render("display", {dog: doggie});    
})
})

app.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    console.log(id)
    Doggie.remove({_id: id}, function(err){
    res.redirect("/");
})


})




app.listen(8000, function() {
    console.log("listening on port 8000");
})












