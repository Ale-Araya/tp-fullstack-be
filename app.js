const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const usersRouter= require("./routes/users");

const dbConnect=require("./database/dbConnection")

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use("/users",usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

dbConnect();