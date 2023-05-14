//  to controll ur website
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.use(express.urlencoded({ extended: true }));
const Auth = require("./models/authSchema");


// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
const { CLIENT_RENEG_LIMIT } = require("tls");
const { default: errorHandler } = require('./errorHandler');
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Use

app.use(cors());

// mongoose

mongoose
  .connect(
    "mongodb+srv://rostomtr:MX3P8U9F3Z@cluster0.fn3gcbb.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

app.get("/all-articles", (req, res) => {
  Auth.find()
    .then((result) => {
      res.render("index", { mytitle: "HOME" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/Signing", async (req, res) => {
  const email = req.body.email;
  const emailExists = await Auth.findOne({ email });
  if (emailExists) {
    return res.status(400).send({
      status: false, 
      message: "email already exist"
      })
  }
});

app.post("/all-articles", (req, res) => {
  const auth = new Auth(req.body);
  console.log(req.body);
  auth
    .save()
    .then((result) => {
      res.redirect("/all-articles");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("all-articles", (req, res) => {});

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.use(errorHandler);