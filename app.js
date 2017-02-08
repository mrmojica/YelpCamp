const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();


// const jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

//SCHEMA

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Lake Ford",
// 		image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg"


// 	}, function(err, campground){
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("created new campground:");
// 			console.log(campground);
// 		}
// 	}
// );



app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing.ejs", {});
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});
		}
	});

});

app.post("/campgrounds", function(req, res){
	let name = req.body.name;
	let image = req.body.image
	let newCampground = {name: name, image: image}
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})
	

});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});


app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});