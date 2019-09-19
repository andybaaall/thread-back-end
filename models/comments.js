const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const commentSchema = new Schema({
    comment_id:  mongoose.Schema.Types.ObjectId,
    item_id: String,
    username:   String,
    comment: String
  });

  module.exports = mongoose.model('Comment', commentSchema);
