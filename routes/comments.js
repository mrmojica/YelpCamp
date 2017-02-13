const express = require("express");
//can pass option {mergeParams: true} this allows comment params to merge with campground and allow access
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// =======================COMMENTS ROUTES==========================

//Comments New
//if login run next if not redirect to login
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//Comments Create
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					console.log("new comment username" + req.user.username);
					//save comment
					comment.save()
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					//redirect to show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


// EDIT CAMPGROUD
router.get("/campgrounds/:comment_id/edit", function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// UPDATE CAMPGROUND
router.put("/campgrounds/:comment_id", function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});


// DELETE CAMPGROUND



//create middleware check user login to add comments etc...
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;