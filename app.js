const express = require('express')
const app = express()
const port = 8080
const usersRouter= require("./routes/users");

const dbConnect=require("./database/dbConnection")

app.use("/users",usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

dbConnect();