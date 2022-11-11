require('dotenv').config();
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
let ejs = require('ejs');
var multer = require("multer");

let app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');



app.get('/', (req, res) => {
    res.render(__dirname + '/views/index');
});

var upload = multer({ dest: "uploads/" });


app.post('/api/file', upload.single("upfile"), (req, res, next) => {
    var upfile = req.files;
    if (typeof upfile === "undefined") res.json({ error: "file not uploaded" });
    return res.json({
        name: upfile.originalname,
        type: upfile.mimetype,
        size: upfile.size
            /*try {
                if (!req.files) {
                    res.send({ message: 'no file uploaded !' });
                } else {
                    let upfile = req.files.upfile;
                    upfile.mv(__dirname + '/uploads/' + upfile.name);


                    res.send({
                        "name": upfile.name,
                        "type": upfile.mimetype,
                        "size": upfile.size

                    });
                }
            } catch (err) {
                res.send(err)
            }*/
            /*let sampleFile;
            let uploadPath;

            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.upfile;
            uploadPath = __dirname + '/uploads/' + upfile.name;

            // Use the mv() method to place the file somewhere on your server
            upfile.mv(uploadPath, function(err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');
            });*/

    });
});



app.listen(3000 || process.env.PORT, () => {
    console.log('server is listening on port 3000');
})