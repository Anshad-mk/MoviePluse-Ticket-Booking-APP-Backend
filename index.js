const express = require("express");
const mongoose =require('mongoose')
let cookieParser = require('cookie-parser');
const cors = require("cors");
const user =require('./Routes/user')
const admin =require('./Routes/admin')
const Therater =require('./Routes/theaterowner')
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const app = express();
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8080, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("server started 8080");
  }
});



  app.use(
    cors({
      origin: ["http://localhost:3000","http://192.168.88.190:3000","https://relaxed-bublanina-7bc94f.netlify.app","https://second-main-project-front-end.vercel.app/"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      withCredentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );
  
const url ="mongodb+srv://anshad:Dtp9544554696@cluster0.xmn2vbt.mongodb.net/movieplus?retryWrites=true&w=majority"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(`MongoDB connection error: ${err}`));


app.use('/', user);
app.use('/admin', admin);
app.use('/theater', Therater);

  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
