const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const itemSchema = new Schema({
    item_id:  mongoose.Schema.Types.ObjectId,
    item_name: String,
    clothing_type:   String,
    image_URL: String,
    price: Number,
    condition: String,
    user_id: String,
    bought: Boolean
  });

  module.exports = mongoose.model('Items', itemSchema);
