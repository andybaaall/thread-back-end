const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const commentSchema = new Schema({
    comment_id:  String,
    item_id: String,
    user_name:   String,
    comment: String
  });
