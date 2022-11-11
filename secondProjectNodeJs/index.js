require('dotenv').config();
var express = require('express');
var app = express();

app.get("/api/whoami", function(req, res) {
    const ip = req.ip;
    const language = req.headers['accept-language'];
    const software = req.headers['user-agent'];
    res.send({ ip: ip, language: language, software: software });
})


var cors = require('cors');
//app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));


app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(3000, function() {
    console.log('Your app is listening on port ' + 3000);
});