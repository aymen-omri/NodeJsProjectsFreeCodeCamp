require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const shortId = require('shortid');
const validUrl = require('valid-url');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');

let app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/hello', (req, res) => {
    res.json({ hello: "hello there" });
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000 || process.env.PORT, () => {
    console.log("app is listening on port 3000");
});

const schema = mongoose.Schema;
let urlSchema = new schema({
    originalUrl: String,
    shorUrl: String
});
var urlss = mongoose.model('url', urlSchema);

const secret = process.env.MONGO;
mongoose.connect(secret, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });

const con = mongoose.connection;
con.once('open', () => {
    console.log("mongo database connected");
});
con.on('error', () => {
    console.log('something went wrong');
});


app.get('/api/shorturl/:url?', function(req, res) {
    const url = req.params.url;
    urlss.findOne({ shorUrl: url }, (err, data) => {
        if (!err && data != undefined) {
            res.redirect(data.originalUrl);
        } else {
            res.json({ message: err });
        }
    })

});




app.post('/api/shorturl', async(req, res) => {
    const oUrl = req.body.url;
    console.log(oUrl);
    const sUrl = shortId.generate();
    if (!validUrl.isWebUri(oUrl)) {
        res.json({ status: 'no', error: "invalidUrl" });
    } else {
        try {
            let findOne = await urlss.findOne({ originalUrl: oUrl });
            if (findOne) {
                res.json({ originalUrl: findOne.originalUrl, shorUrl: findOne.shorUrl });
            } else {
                res.json({ originalUrl: oUrl, shorUrl: sUrl });
                let obj = new urlss({ originalUrl: oUrl, shorUrl: sUrl })
                await obj.save();
            }



        } catch (error) {
            console.log(error);
            res.json({ status: 'no', error: error })
        }
    }


});