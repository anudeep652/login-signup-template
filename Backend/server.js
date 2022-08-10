require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const  router  = require("./routes/auth");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.use("/user",router)

const PORT = process.env.PORT || 5000;

//db connection
const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
};
connectDb()


//initializing the server
app.listen(PORT,() => {
    console.log(`app is listening on port ${PORT}`);
})