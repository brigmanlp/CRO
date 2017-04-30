//Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');
//Create a new express app
var app = express();

//Webpack set up, allows Webpack to intercept requests and serve our app.js file
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('build/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});
//Set initial port. 
var PORT = process.env.PORT || 3000; 

//Starting our express server
app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
});