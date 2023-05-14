const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const authSchema = new Schema({
  email: {
    type: String,
    required: [true, "please enter a valid university email address"],
    match: [/^[\w\-\.]+@univ-constantine2.dz/],
  },

  password: {
    type: String,
    required: [true, "please enter a strong password"],
    match: [/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/],
  },
});

// Create a model based on that schema
const Auth = mongoose.model("Auth", authSchema);

// export the model
module.exports = Auth;
