var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var Comment = Comment || {};
Comment.schema = Comment.schema || new Schema({
    text: String,
    author: String
});

mongoose.model('Comment', Comment.schema);

module.exports = Comment;