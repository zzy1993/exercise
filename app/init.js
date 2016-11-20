/**
 *
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/exercise');

require('./models/imageModel.js');
var image = mongoose.model('Image');

function addImage(title, filename) {
    var image = new Image({title: title, filename: filename});
    image.save(function () {
        console.log(title + " is saved.");
    });
}

image.remove().exec(function () {
    addImage('Boston_1728_Burgis','Boston_1728_Burgis.jpg');
    addImage('Boston_1769_Price_LC','Boston_1769_Price_LC.jpg');
    addImage('Boston_1775_deCosta','Boston_1775_deCosta.jpg');
    addImage('Boston_1775_Harbor_Wheeler','Boston_1775_Harbor_Wheeler.jpg');
    addImage('Boston_1775_Page','Boston_1775_Page.jpg');
    addImage('Boston_1776_unknown','Boston_1776_unknown.jpg');
    addImage('Boston_1777_Page','Boston_1777_Page.jpg');
    addImage('Boston_1805_Carelton','Boston_1805_Carelton.jpg');
    addImage('Boston_1814_Hales','Boston_1814_Hales.jpg');
    addImage('Boston_1846_Smith','Boston_1846_Smith.jpg');
    addImage('Boston_1852_Shields','Boston_1852_Shields.jpg');
    addImage('Boston_1874_Hopkins','Boston_1874_Hopkins.jpg');
    addImage('Boston_1875_Beers','Boston_1875_Beers.jpg');
})