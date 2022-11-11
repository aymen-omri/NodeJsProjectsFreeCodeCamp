let express = require("express");
let nodemailer = require('nodemailer');

let app = express();


app.use(express.json());


app.get('/email', (req, res) => {
    let trnasporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: "aymenomri14.03@gmail.com",
            pass: "xxxxxx"
        }
    })
    let info = trnasporter.sendMail({
        from: "aymenomri14.03@gmail.com",
        to: "xxx@gmail.com",
        subject: "why are you running",
        text: "your code is here",
    })

    if (info) {
        res.send('successfully recieved!!' + info);
    } else {
        res.send('something went wrong my friend !');
    }


})




app.listen(3000 || process.env.PORT, () => {
    console.log("app is listening on port 3000");
})