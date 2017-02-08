const express = require("express");
const bodyParser = require('body-parser');

// const jsonParser = bodyParser.json();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

let campgrounds = [
		{name: "Big Basin", image: "https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg"},
		{name: "Lake Ford", image: "https://farm4.staticflickr.com/3189/3062178880_4edc3b60d5.jpg"},
		{name: "Green Hill", image: "https://farm4.staticflickr.com/3149/3062180144_ee0d2d466a.jpg"}
	];



app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing.ejs", {});
});

app.get("/campgrounds", function(req, res){

	res.render("campgrounds", {campgrounds: campgrounds});

});

app.post("/campgrounds", function(req, res){
	let name = req.body.name;
	let image = req.body.image
	console.log(name);
	let newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});


app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});