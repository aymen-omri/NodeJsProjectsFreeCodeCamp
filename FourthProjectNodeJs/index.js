require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let con = require('./dbConfig');
let myUser = require('./models/user');
let cors = require('cors');

let app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.json());

con.once('open', () => {
    console.log("connected successfully");
});

con.on('error', () => {
    console.log("something went wrong");
});


app.get('/test', (req, res) => {
    res.json({ message: "i m working just fine!!" })
})

app.post('/api/users', (req, res) => {
    let { userName } = req.body;
    let obj = new myUser({ username: userName });
    obj.save((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ username: userName, _id: data._id });
        }
    })
});


app.get('/api/users', (req, res) => {
    myUser.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let table = [];
            for (let elem of data) {
                table.push({
                    username: elem.username,
                    _id: elem._id
                });
            }
            res.json(data);
        }
    });
});


app.post('/api/users/:_id/exercices', (req, res) => {
    let description = req.body.description;
    let duration = req.body.duration;
    let date = req.body.duration;
    let idUser = req.params._id;

    if (date === "") {
        date = new Date().toDateString();
    } else {
        date = new Date(date).toDateString();
    }

    let obj = { description: description, duration: duration, date: date };

    myUser.findById(idUser, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.log.push(obj);
            data.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let objToReturn = {
                        username: data.username,
                        description: obj.description,
                        duration: obj.duration,
                        date: obj.date,
                        _id: idUser
                    };
                    res.json(objToReturn);
                }

            });
        }
    });

});

app.get('/api/users/:_id/logs', (req, res) => {
    let idUser = req.params._id;
    let from = req.query.from;
    let to = req.query.to;
    let limit = +req.query.limit;

    myUser.findById({ _id: idUser }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let log = data.log.map(item => {
                return {
                    description: item.description,
                    duration: item.duration,
                    date: item.date
                }
            });
            if (from) {
                let myDate = new Date(from);
                log = data.log.filter(elem => elem.date >= myDate);
            }
            if (to) {
                let myDate = new Date(to);
                log = data.log.filter(elem => elem.date <= myDate);
            }
            if (limit) {
                log = log.slice(0, limit);
            }

            let count = log.length;

            let objToReturn = {
                "username": data.username,
                "count": count,
                "_id": data._id,
                "log": log
            }

            res.json(objToReturn);
        }
    })

})



app.listen(3000 || process.env.PORT, () => {
    console.log("app is listening on port 3000");
})