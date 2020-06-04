const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://ichraf:123456ichraf@cluster0-up3q6.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then((data) => {
    console.log("Connected....");
  });

const app = express();

//import routes

const userRoutes = require('./routes/user.routes')
const offreRoutes = require('./routes/offre.routes')
const clientRoutes = require('./routes/client.routes')
const serviceRoutes = require('./routes/service.routes')
// Setup static files path
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// routes middleware

app.use('/user', userRoutes)
app.use('/offre', offreRoutes)
app.use('/client', clientRoutes)
app.use('/service', serviceRoutes)

app.listen(3000, () => {
  console.log("app is running");
});
