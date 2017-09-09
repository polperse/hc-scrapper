var express = require('express');
var request = require('request');
var path = require('path');
var cheerio = require('cheerio');
var fs = require('fs');

var app = express();

var port = 8000;
var url = 'http://www.hcrealms.com/forum/units/units_figure.php?q=wkM17-010';
var destinationFile = fs.createWriteStream('./downloads/wkM17-010.html');

request(url)
.pipe(destinationFile);

destinationFile.on('finish', function(){
  console.log('file written ok');
})
.on('error', function(err){
  console.log(err);
});


app.listen(port);
console.log('server running on port: ' + port);
