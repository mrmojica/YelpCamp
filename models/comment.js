//SCHEMA
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	text: String,
	rating: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	dateCreated: String
});

module.exports = mongoose.model("Comment", commentSchema);