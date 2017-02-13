const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");


router.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			//return user info for navbar login/logout status
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});

});

//Create - add new campground
router.post("/campgrounds", isLoggedIn, function(req, res){
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground = {name: name, image: image, description: description, author: author}
	
	console.log(req.user);
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newCreated){
		if(err){
			console.log(err);
		} else {
			// console.log(newCreated);
			res.redirect("/campgrounds");
		}
	})
	

});

router.get("/campgrounds/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router; 