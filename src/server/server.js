const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;
require('dotenv').config();

// Middleware
app.use(cors());


// routes
app.get('/',(req, res)=>{
    res.send("hello");
})


app.listen(port, ()=>console.log("The server is running: http://localhost:8080"));
