const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing.ejs", {});
});

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Big Basin", image: "https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg"},
		{name: "Lake Ford", image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg"},
		{name: "Green Hill", image: "https://farm4.staticflickr.com/3149/3062180144_ee0d2d466a.jpg"}
	];

	res.render("campgrounds", {campgrounds: campgrounds});

});

app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});