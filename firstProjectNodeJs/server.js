const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
let app = express();

app.use(cors());
app.use(express.json());

/*app.get('/api/:date?', (req, res) => {
    let date = req.params.date;
    let dateToReturn = "";
    if (!date) {
        dateToReturn = new Date();
    } else {
        if (!isNaN(date)) {
            dateToReturn = new Date(parseInt(date));
        } else {
            dateToReturn = new Date(date);
        }
    }

    if (dateToReturn.toString() == 'Invalid Date') {
        res.json({ error: dateToReturn.toString() })
    } else {
        res.json({ unix: dateToReturn.getTime(), utc: dateToReturn.toUTCString() })
    }

});*/
app.get('/api/:date?', (req, res) => {
    let date = req.params.date;
    if (!date) {
        return res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() })
    }
    if (!isNaN(date)) {
        date = new Date(parseInt(date));
    } else {
        date = new Date(date);
    }
    if (date == 'Invalid Date') {
        return res.json({ error: dateToReturn.toString() });
    } else {
        return res.json({ unix: date.getTime(), utc: date.toUTCString() })
    }

});




app.listen(process.env.PORT || 3000, () => {
    console.log("server is listening on port 3000");
});