require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dbConnect = require("./config/DBconnection");
dbConnect();

const authRoutes = require('./routes/authRoutes')

app.use('/v1/user',authRoutes)



app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
