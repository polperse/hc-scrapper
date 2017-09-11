var express = require('express');
var request = require('request');
var path = require('path');
var cheerio = require('cheerio');
var util = require('util');
var math = require('math');
//var fs = require('fs');

var app = express();

var port = 8000;
var url = 'http://www.hcrealms.com/forum/units/units_figure.php?q=sog052';

request(url, function(err, response, body)
{

  var $ = cheerio.load(body);

  var taList = [];
  var iconList = [];
  var clickList1 = [];
  var clickList2 = [];
  var clickList3 = [];
  var clickList4 = [];
  var clickList5 = [];
  var clickList6 = [];
  var clickList7 = [];
  var clickList8 = [];
  var clickList9 = [];
  var clickList10 = [];
  var clickList11 = [];
  var clickList12 = [];


  var figureName = $('.tcat');
  var figureNameText = figureName.text().trim();

  var figureCost = $('.thead div').first();
  var figureCostText = figureCost.text().trim();

  var figureRange = $('.thead div').first().next();
  var figureRangeText = figureRange.text().trim();

  var figureTargets = $('.thead div img');
  var figureTargetsImgSrc = $(figureTargets).attr('src');

  // Aca trato de sacar la url de la imagen y la descripcion de la TA... Al pedo. Con el nombre alcanza.

  // $('.thead img').each(function(i, element) {
  //
  //   console.log('ImgSrc: ' + $(this).attr('src'));
  //   console.log('Title: ' + $(this).attr('title'));
  //   console.log('^^^^^^^^^^^^');
  //
  //   if ( i > 0 ) {
  //
  //     var ta = [
  //       {
  //           taName : 'null',
  //           taDesc : $(this).attr('title'),
  //           taImg : $(this).attr('src')
  //         }];
  //
  //     taList.push(ta);
  //
  //   }
  // });

  $('.thead span').each(function(i, element){
     taList.push($(this).text());
   });

  $('.icons img').each(function(i, element){
     iconList.push($(this).attr('src'));
  });

  //console.log('html: ' + $('.power td').html());

  $('.power td').each(function(i, element){

    var clickSlot = i + 1;

    if (clickSlot === 1) {
      var clickNumber = 1; console.log('seteo a clicknumber en: ' + clickNumber);
    }

    console.log('paso ' + clickSlot + ' ' + math.floor((clickSlot / 5) + 1));

    if ((clickSlot % 5) !== 0 ) {
      var click = [{power: $(this).attr('title')},{value: $(this).text().trim()}];
      switch (math.floor((clickSlot / 5) + 1)){
        case 1:
          clickList1.push(click);
          break;
        case 2:
          clickList2.push(click);
          break;
        case 3:
          clickList3.push(click);
          break;
        case 4:
          clickList4.push(click);
          break;
        case 5:
          clickList5.push(click);
          break;
        case 6:
          clickList6.push(click);
          break;
        case 7:
          clickList7.push(click);
          break;
        case 8:
          clickList8.push(click);
          break;
        case 9:
          clickList9.push(click);
          break;
        case 10:
          clickList10.push(click);
          break;
        case 11:
          clickList11.push(click);
          break;
        case 12:
          clickList12.push(click);
          break;
      }
    }

        //clickSlot++;
  });

  console.log(util.inspect(clickList1, false, null));


  // Recopilo toda la data del objeto

  var objFigure = {
    name : figureNameText,
    cost : figureCostText,
    range : figureRangeText,
    targets : figureTargetsImgSrc,
    ta : taList,
    dial : {
      icons : iconList,
      s01 : clickList1,
      s02 : clickList2,
      s03 : clickList3,
      s04 : clickList4,
      s05 : clickList5,
      s06 : clickList6,
      s07 : clickList7,
      s08 : clickList8,
      s09 : clickList9,
      s10 : clickList10,
      s11 : clickList11,
      s12 : clickList12
    }
  };

  console.log(util.inspect(objFigure, false, null));
  console.log('==== END =====');


});


app.listen(port);
console.log('server running on port: ' + port);
