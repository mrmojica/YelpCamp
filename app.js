const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//requiring routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");



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


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "BEST CAMP!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//allow us to get user information on every route (req.user)
app.use(function(req, res , next){
	//whatever is entered in res.render is available to all routes
	 res.locals.currentUser = req.user;
	 next();
});

//tells our app to use the three route files that are required
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);





app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});