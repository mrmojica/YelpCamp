//All middleware goes here
const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middlewareObj = {
	//created middleware to check if user owns campground post
	checkCampgroundOwnership: function(req, res, next){
							//is user logged in
							if(req.isAuthenticated()){
								Campground.findById(req.params.id, function(err, foundCampground){
								if(err){
									req.flash("error", "Campground not found.");
									res.redirect("/campgrounds");
								} else {
									// does user own the campground?
									//use mongoose equal method since comparing an object to a string
									if(foundCampground.author.id.equals(req.user._id)){
										next();
									} else {
										req.flash("error", "You do not have permission to do that.");
										//return to previous page
										res.redirect("back");
									}
									
								}
							});
							
							} else {
								req.flash("error", "You need to be logged in.")
								res.redirect("back");
							}
						},
	//created middleware to check if user owns comment post
	checkCommentOwnership: function(req, res, next){
							//is user logged in
							if(req.isAuthenticated()){
								Comment.findById(req.params.comment_id, function(err, foundComment){
								if(err){
									req.flash("error", "Comment not found.");
									res.redirect("/campgrounds");
								} else {
									// does user own the comment?
									//use mongoose equal method since comparing an object to a string
									if(foundComment.author.id.equals(req.user._id)){
										next();
									} else {
										req.flash("error", "You do not have permission.");
										//return to previous page
										res.redirect("back");
									}
									
								}
							});
							
							} else {
								req.flash("error", "You need to be logged in.");
								res.redirect("back");
							}
	},
	//create middleware check user login to add comments etc...
	isLoggedIn: function(req, res, next){
					if(req.isAuthenticated()){
						return next();
					}
					//req.flash allows access to display on login page (always run before redirect)
					req.flash("error", "You need to be logged in.");
					res.redirect("/login");
				}

	};





module.exports = middlewareObj;