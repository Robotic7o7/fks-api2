var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
var dotenv = require("dotenv");

dotenv.config();

//mongoose
var mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  
  mongoose.connect(
    "mongodb+srv://admin:iOGAslvzyZaR9p4K@cluster0.jipu4.mongodb.net/fks?retryWrites=true&w=majority",
    mongooseOptions
  );
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("mongodb connection established");
  });
  
  //--end--mongoose--
  

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subjectRouter = require('./routes/subjects')
var classRouter = require('./routes/classes')
var branchRouter = require('./routes/branches')
var assignmentRouter =require('./routes/assignments')
var authRouter = require('./routes/auth')

var app = express();
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subjects', subjectRouter)
app.use('/classes', classRouter)
app.use('/branches', branchRouter)
app.use('/assignments', assignmentRouter)
app.use('/auth', authRouter)

module.exports = app;
