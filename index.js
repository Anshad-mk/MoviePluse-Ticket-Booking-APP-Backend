const express = require("express");
const mongoose =require('mongoose')
let cookieParser = require('cookie-parser');
const cors = require("cors");
const user =require('./Routes/user')
const admin =require('./Routes/admin')
const Therater =require('./Routes/theaterowner')
const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(4000, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("server started 4000");
  }
});



  app.use(
    cors({
      origin: ["http://localhost:3000","http://192.168.88.190:3000"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );
  

mongoose.connect('mongodb://0.0.0.0:27017/Bookmyshow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(`MongoDB connection error: ${err}`));


app.use('/', user);
app.use('/admin', admin);
app.use('/theater', Therater);

  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
