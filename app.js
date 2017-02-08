const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("landing.ejs", {});
});

app.get("/campgrounds", function(req, res){

});

app.listen(8080 || process.env.PORT, function(){
	console.log("YelpCamp server running!!");
});