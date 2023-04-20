const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
const router = express.Router();
app.set('view engine', 'ejs');
const path = require('path');

const Interview =require('../../models/interview') 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/',(req,res)=>{

  const myCookie = req.cookies.user;
  if(!myCookie){
      res.send("switch to student account");
      return;
    } 
    const docs =[]
    Interview.find().then((documents) => {
        documents.forEach((doc)=>{
            docs.push(documents)
        })
        

        // documents.forEach((doc)=>{
        //     console.log(doc)
        //     docs.push(doc)
        // })
     })//;((err,docs)=>{
    //     console.log(docs)
    //     
    // }
    console.log(docs)
    res.render(path.join(__dirname,'../../views/viewinsights.ejs'),{experiences:docs})
   
    
    // res.render(path.join(__dirname,'../../views/viewinsights.ejs')) 
        
})
router.post('/', (req,res)=>{

    console.log(req.body)

    
})
  module.exports = router;
