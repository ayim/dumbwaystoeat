var request = require('request');

exports.getTagging = (imageUri, callback) =>{
    listOfKeyWords = [];
    request.get(process.env.IMAGGA_ENDPOINT + '/'+process.env.IMAGGA_V1_TAGGING + encodeURIComponent(imageUri), function (error, response, body) {
        var bodyInJson = JSON.parse(body);
        console.log(JSON.stringify(bodyInJson));
        console.log(typeof bodyInJson);
        var tags = bodyInJson.results[0].tags;
        tags.forEach(tag => {
            listOfKeyWords.push(tag.tag);
        });
        callback(error, listOfKeyWords);
    }).auth(process.env.API_KEY, process.env.API_SECRET, true);
};