const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
app.set('view engine', 'ejs');
const path = require('path');

const { Interview } = require('../../models/interview'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.user;
  if(!myCookie){
      res.send("switch to student account");
      return;
    }  
        
})
router.post('/',(req,res)=>{

    Interview.find({company:req.body.company})
        .toArray((err,documents) => {
            if(err) throw err;
            ejs.renderFile(path.join(__dirname,'../../views/viewinsights.ejs'),{
                experiences:documents
            }
            )})     

})
  module.exports = router;
