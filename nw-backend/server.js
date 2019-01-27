var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    request = require('request'),
    cors = require('cors');
var app = module.exports = express();
var vision = require('./api/vision');
var imagga = require('./api/imagga');
var mConnect = mongoose.connect("mongodb://nw-test:test1000002@ds255347.mlab.com:55347/nwhacks2018");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/api/image', function (req, res) {
    var imageUri = req.body.imageUri;
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(imageUri));
    //var imageUri = 'http://res.cloudinary.com/dlehndc9n/image/upload/v1471825024/vk5vs8sx045ir2rf0xc3.jpg'
    vision.webDetection(imageUri, (err, tags0)=>{
        res.json(tags0);
    });
})

app.listen(process.env.PORT || 3000);
