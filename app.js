const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");


const app = express();

//run seedDB function to add in filler comment data
// seedDB();

// const jsonParser = bodyParser.json();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
//serv public directory -> connect stylesheet to header file
app.use(express.static(__dirname + "/public"));



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
	res.render("landing", {});
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
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
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


// =======================COMMENTS ROUTES==========================

app.get("/campgrounds/:id/comments/new", function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});


app.post("/campgrounds/:id/comments", function(req, res) {
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// console.log(req.body.comment);
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect to show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});