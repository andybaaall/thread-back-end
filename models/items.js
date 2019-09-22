const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    item_name: String,
    item_description: String,
    clothing_type:   String,
    image_URL: String,
    price: Number,
    condition: String,
    // user_id: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
    // },
    user_id: String,
    bought: Boolean
});

module.exports = mongoose.model('Items', itemSchema);
