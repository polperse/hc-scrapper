var express = require('express');
var request = require('request');
var path = require('path');
var cheerio = require('cheerio');
var util = require('util')
//var fs = require('fs');

var app = express();

var port = 8000;
var url = 'http://www.hcrealms.com/forum/units/units_figure.php?q=sog052';

request(url, function(err, response, body){
  var $ = cheerio.load(body);

  var taList = [];

  var figureName = $('.tcat');
  var figureNameText = figureName.text().trim();

  var figureCost = $('.thead div').first();
  var figureCostText = figureCost.text().trim();

  var figureRange = $('.thead div').first().next();
  var figureRangeText = figureRange.text().trim();

  var figureTargets = $('.thead div img');
  var figureTargetsImgSrc = $(figureTargets).attr('src');

  $('.thead img').each(function(i, element) {

    console.log('ImgSrc: ' + $(this).attr('src'));
    console.log('Title: ' + $(this).attr('title'));
    console.log('^^^^^^^^^^^^');

    if ( i > 0 ) {

      var ta = [
        {
            taName : 'null',
            taDesc : $(this).attr('title'),
            taImg : $(this).attr('src')
          }];

      taList.push(ta);

    }
  });

  $('.thead span').each(function(i, element){
     console.log(i);
     taList[i].taName = $(this).text();
   });
   

  var objFigure = {
    name : figureNameText,
    cost : figureCostText,
    range : figureRangeText,
    targets : figureTargetsImgSrc,
    ta : taList
  };

  console.log(util.inspect(objFigure, false, null));
  console.log('==========');
  console.log(objFigure[1[1]]);

});


app.listen(port);
console.log('server running on port: ' + port);
