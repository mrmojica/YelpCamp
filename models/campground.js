//SCHEMA
const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	location: {
		address: String,
		city: String,
		state: String,
		zipcode: String
	},
	phone: String,
	website: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);