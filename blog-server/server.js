require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get('/',(res, req)=>{
    req.send("hello wrold");
});


app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
