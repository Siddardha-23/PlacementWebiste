const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const ejs = require('ejs')
const pdf =require('html-pdf')
const path = require('path')
const router = express.Router();
app.set('view engine', 'ejs');
app.set('views',path.join('../../','views'))


const { User } = require('../../models/registermodel');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/', (req, res) => {

    const myCookie = req.cookies.tpo;
    if (!myCookie) {
        res.send("switch to TPO account");
    }
    res.render('resumedownload', { message: '' })
});

router.post('/', (req, res) => {
    const username = req.body.username
    console.log(username)
    User.findOne({ username: username })
        .then((user) => {
            const username = user.username
            ejs.renderFile(path.join(__dirname,'../../views/resume-template.ejs'),{
                name:username 
            },(err,html)=>{
                if(err){
                    console.log(err) 
                }else{
                    pdf.create(html).toStream((err,stream)=>{
                        if(err){
                            console.log(err) 
                        }
                        else{
                            res.setHeader('Content-Type','application/pdf')
                            stream.pipe(res)
                        }
                    })
                }
            })
            // res.clearCookie('pc');
            // res.clearCookie('tpo');
            // res.clearCookie('user');
            // res.cookie('user', user.username);
            // res.redirect('/use-cookie');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred');
        });
})
module.exports = router;

