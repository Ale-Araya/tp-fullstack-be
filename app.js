const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const productsRouter= require("./routes/products");
const photosRouter = require("./routes/api-external");

const dbConnect=require("./database/dbConnection")

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use("/products",productsRouter);
app.use("/photos",photosRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

dbConnect();