const express = require('express');
//TODO: determine engine template... ejs, react, jade/pug are the big ones ive seen
//https://stackoverflow.com/questions/17911228/how-do-i-use-html-as-the-view-engine-in-express
//not sure about differences in performance
const ejs = require('ejs');
const path = require('path'); //to negate having to change .html extensions

const app = express();
const port = 8080;

app.use(express.static('public')); //will have to create folder 'public' to contain index.html, .css, and .js for this to work
app.set('view engine','ejs');

app.listen(port);

app.get('/',function(req,res){
    res.render('index');
});