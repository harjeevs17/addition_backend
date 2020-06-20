const express = require('express');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Moods = require('../model/watchs.js');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const insertRouter = express.Router();
insertRouter.use(bodyParser.json());
const url = 'mongodb://localhost:27017/addition';
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex',true)
const connect = mongoose.connect(url);


app.use(cors());
app.use(bodyParser.json());


insertRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.post((req,res,next) => {
    connect.then((db)=>{
        console.log('Successfully connected');
        Moods.create({
             title:req.body.title,
             image:req.body.image,
             description:req.body.description,
        })
        .then(()=>{
            res.sendStatus(200);
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        })
    });
})

module.exports = insertRouter;