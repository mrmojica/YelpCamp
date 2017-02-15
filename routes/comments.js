const express = require("express");
//can pass option {mergeParams: true} this allows comment params to merge with campground and allow access
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const moment = require("moment");

// =======================COMMENTS ROUTES==========================

//Comments New
//if login run next if not redirect to login
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res) {
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong.");
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
					comment.dateCreated = moment().format('MM/DD/YY, HH:mm:ss');
					console.log("comment info", comment);
					// console.log("new comment username" + req.user.username);
					//save comment
					comment.save()
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					//redirect to show page
					req.flash("success", "Successfully added comment.");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


// EDIT COMMENT
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// UPDATE COMMENT
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});


// DELETE COMMENT

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
       		req.flash("error", "Something went wrong.");	
            res.redirect("back");
       } else {
       		req.flash("success", "Comment deleted.");
            res.redirect("/campgrounds/" + req.params.id);
       }
    });
});



module.exports = router;