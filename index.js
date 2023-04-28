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
      origin: ["*","https://644b6f5530be156286d04e78--resonant-marzipan-1b2297.netlify.app","https://resonant-marzipan-1b2297.netlify.app","http://localhost:3000","http://localhost:4000","http://localhost:8080"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
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
