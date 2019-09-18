const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const userSchema = new Schema({
    user_id: String,
    user_name: String,
    password: String,
    admin: Boolean
  });
