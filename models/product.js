import mongoose from 'mongoose';
const autoIncrement = require('mongoose-auto-increment');

let Schema = mongoose.Schema;

let product = new Schema({
    id: Number,
    name: String,
    price: Number,
    description: String,
    stars: Number,
    image: String
})

mongoose.models = {};

autoIncrement.initialize(mongoose.connection);
product.plugin(autoIncrement.plugin, {model: 'Product', field: 'id', startAt: 13});
let Product = mongoose.model('Product', product);

export default Product;