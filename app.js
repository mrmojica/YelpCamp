const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");

const app = express();
seedDB();

// const jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));



// Campground.create(
// 	{
// 		name: "Lake Ford",
// 		image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg",
// 		description: "Explore the vast lake of Lake Ford.  Fresh open nature."


// 	}, function(err, campground){
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("created new campground:");
// 			console.log(campground);
// 		}
// 	}
// );

// To delete all data in DB
// db.collection.drop();



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
			res.render("index", {campgrounds: campgrounds});
		}
	});

});

app.post("/campgrounds", function(req, res){
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let newCampground = {name: name, image: image, description: description}
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

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else {
			console.log(foundCampground);
			res.render("show", {campground: foundCampground});
		}
	});
});



app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});