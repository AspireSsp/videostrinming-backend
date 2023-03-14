const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set("trust proxy", 1)

app.use(cookieParser());

//    route are import here..
const user = require("./routes/userRoutes");
const post = require("./routes/post");


app.use("/api/v1", user);
app.use("/api/v1", post);


//  Middleware for Errors
// app.use(errorMiddleware);
module.exports = app;
