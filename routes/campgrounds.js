const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


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
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	let name = req.body.name;
	let price = req.body.price;
	let location = req.body.location;
	let image = req.body.image;
	let description = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground = {name: name, price: price, image: image, description: description, author: author}
	
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

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
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


// EDIT CAMPGROUD
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found.");
			} else {
			res.render("campgrounds/edit",{campground: foundCampground});
			}
		});
	
	
	
});

// UPDATE CAMPGROUND
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	let data = {name: req.body.name,}
	// req.body.campground is being returned as a single object from input "name" value
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// DELETE CAMPGROUND

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});



module.exports = router; 