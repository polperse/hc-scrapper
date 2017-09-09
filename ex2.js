var express = require('express');
var request = require('request');
var path = require('path');
var cheerio = require('cheerio');
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

  $('.thead img').each(function(i, taList) {

    console.log($(this).attr('src') + ' hola');

    if (i > 0) {

      var taListAux = [
        {
            taImg : $(this).attr('src'),
            taDesc : 'null',
            taName : 'null'
          }];

      taList.push("miau");
      //taList[aux].taDesc = $(this).attr('title');
    }
    console.log($(this).attr('src'));
  });

  $('.thead span').each(function(i, element){
    taList[i].taName = $(this).text();
  });




var objFigure = {
  name : figureNameText,
  cost : figureCostText,
  range : figureRangeText,
  targets : figureTargetsImgSrc,
  ta : taList
};

  console.log(objFigure);

});


app.listen(port);
console.log('server running on port: ' + port);
