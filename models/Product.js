const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required:true,
    },
    img: {
        type: String,
        required:true,
    }
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;