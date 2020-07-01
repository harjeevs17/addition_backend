const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const watchs = require("./model/watchs.js");
const tv = require("./model/tv.js");
const book = require("./model/book.js");
const express = require("express");
const assert = require("assert");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const http = require("http");
var router = express.Router();
const port = 8008;
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + "/public"));

const url = "mongodb://localhost:27017/addition";
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
const connect = mongoose.connect(url);

app.use(cors());
app.use(bodyParser.json());
app.post("/insert-movie", function (req, res, next) {
  connect.then((db) => {
    console.log("Successfully connected");
    /*watchs
      .create({
        title: req.body.title,
        f_image: req.body.f_image,
        b_image: req.body.b_image,
        description: req.body.description,
        status: req.body.status,
        rating: req.body.rating,
		id:req.body.id,
      })*/
	  watchs.findOneAndUpdate({id:req.body.id},{$set:
	  {
		title: req.body.title,
        f_image: req.body.f_image,
        b_image: req.body.b_image,
        description: req.body.description,
        status: req.body.status,
        rating: req.body.rating,
		id:req.body.id,
		review:req.body.review,
		}
		},{upsert:true})
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });
});

app.post("/insert-tv", function (req, res, next) {
  connect.then((db) => {
    console.log("Successfully connected");
    /*tv.create({
      title: req.body.title,
      f_image: req.body.f_image,
      b_image: req.body.b_image,
      description: req.body.description,
      status: req.body.status,
      rating: req.body.rating,
	  id:req.body.id,
    })*/
	tv.findOneAndUpdate({id:req.body.id},{$set:
	  {
		title: req.body.title,
        f_image: req.body.f_image,
        b_image: req.body.b_image,
        description: req.body.description,
        status: req.body.status,
        rating: req.body.rating,
		id:req.body.id,
		review:req.body.review,
		}
		},{upsert:true})
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });
});

app.post("/insert-book", function (req, res, next) {
  connect.then((db) => {
    console.log("Successfully connected");
    book
      /*.create({
        title: req.body.title,
        f_image: req.body.f_image,
        b_image: req.body.b_image,
        description: req.body.description,
        status: req.body.status,
        rating: req.body.rating,
		id:req.body.id,
      })*/
	  book.findOneAndUpdate({id:req.body.id},{$set:
	  {
		title: req.body.title,
        f_image: req.body.f_image,
        b_image: req.body.b_image,
        description: req.body.description,
        status: req.body.status,
        rating: req.body.rating,
		id:req.body.id,
		review:req.body.review,
		}
		},{upsert:true})
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });
});
app.use(cors());
app.use(bodyParser.json());
app.get("/fetch-movies/:status", function (req, res, next) {
  connect.then((db) => {
    console.log("Connected successfully");
    watchs
      .find({status:req.params.status})
      .sort({ status: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(500);
      });
  });
});
app.get("/fetch-books/:status", function (req, res, next) {
  connect.then((db) => {
    console.log("Connected successfully");
    book
      .find({status:req.params.status})
      .sort({ status: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(500);
      });
  });
});
app.get("/fetch-tv/:status", function (req, res, next) {
  connect.then((db) => {
    console.log("Connected successfully");
    tv.find({status:req.params.status})
      .sort({ status: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(500);
      });
  });
});

app.get("/fetch-movie-rating/:id", function (req, res, next) {
	connect.then((db) => {
    console.log("Connected successfully");
    watchs.find({id:req.params.id}, {rating:1,review:1})
      .sort({ status: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(500);
      });
  });
});

app.get("/fetch-tv-rating/:id", function (req, res, next) {
	connect.then((db) => {
    console.log("Connected successfully");
    tv.find({id:req.params.id}, {rating:1,review:1})
      .sort({ status: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(500);
      });
  });
});

app.get("/fetch-book-rating/:id", function (req, res, next) {
	connect.then((db) => {
    console.log("Connected successfully");
    book.find({id:req.params.id}, {rating:1,review:1})
      .sort({ status: -1 })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(500);
      });
  });
});

const server = http.createServer(app);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

