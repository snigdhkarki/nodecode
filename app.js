var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://snigdh:snigdh@todo.glg9bkz.mongodb.net/test2');
var itemSchema = new mongoose.Schema({
    name: String,
    author: String
});
var Item = mongoose.model('Item', itemSchema);





var urlencoderParser = bodyParser.urlencoded({extended: false});
var app = express();
app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.get('/', function(req, res){
    res.render('index');    
} )
app.get('/contact', function(req, res){
    res.render('contact');    
} )
app.get('/formpage', function(req, res){
    res.render('formpage');    
} )
app.post('/formpage',urlencoderParser, function(req, res){
    var newItem = Item(req.body).save(function(err, data){
        if (err) throw err;        
        
        
    }) 
} )
app.get('/finder', function(req, res){
    res.render('finder');
})
app.post('/finder',urlencoderParser, function(req, res){
    Item.find({}, function(err, data){
        if (err) throw err;
        for (var i = 0; i< data.length; i++){
            if (data[i].name === req.body.name){
                res.render('finder', {data: data[i].author});                
            }
        }
    }) 
})
app.get('/deleter', function(req, res){
    res.render('deleter');
})
app.post('/deleter',urlencoderParser, function(req, res){
    Item.find({}, function(err, data){
        if (err) throw err;
        for (var i = 0; i< data.length; i++){
            if (data[i].name === req.body.name){
                var name = data[i].name;
                var author = data[i].author;                              
            }
        }
        Item.find({name:name,author:author}).remove(function(err, data){
            if (err) throw err;
            
        });

    }) 
})




