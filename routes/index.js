const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//root route
router.get("/", function(req, res) {
	res.render("landing", {});
});


// =======================AUTH ROUTES==========================

//show register form
router.get("/register", function(req, res){
	res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			//passed error in render to fix sign up bug that required to be clicked twice to display error
			// req.flash("error", err.message);
			return res.render("register", {"error": err.message});
		}
		//if user created redirect to campgrounds
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});


// show login form
router.get("/login", function(req, res){
	res.render("login");
});

//login logic (router.post /middleware /callback)

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		// documentation: http://passportjs.org/docs#flash-messages
		failureFlash: "Invalid username or password.",
        successFlash: "Welcome to YelpCamp!" 
	 }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged You Out!");
	res.redirect("/campgrounds");
});

module.exports = router;