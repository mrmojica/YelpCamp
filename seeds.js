const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [
	{
		name: "Oakes Rest",
		image: "https://farm9.staticflickr.com/8590/16684265096_9bf65a3440.jpg",
		description: "Bacon ipsum dolor amet t-bone turducken corned beef pastrami meatloaf cow chicken short ribs ball tip jowl. Frankfurter shank bresaola kielbasa meatloaf ball tip beef picanha pancetta porchetta. Alcatra porchetta ham hamburger pork loin biltong. Leberkas drumstick rump tail. Burgdoggen shoulder tenderloin ground round porchetta, fatback tri-tip biltong turducken frankfurter leberkas pork chop beef ribs. Ham drumstick jerky boudin, porchetta kevin sausage. Shank pork loin jerky chuck alcatra."

	},
	{
		name: "Lake Rest",
		image: "https://farm1.staticflickr.com/150/333980768_ab02f4e32c.jpg",
		description: "Bacon ipsum dolor amet t-bone turducken corned beef pastrami meatloaf cow chicken short ribs ball tip jowl. Frankfurter shank bresaola kielbasa meatloaf ball tip beef picanha pancetta porchetta. Alcatra porchetta ham hamburger pork loin biltong. Leberkas drumstick rump tail. Burgdoggen shoulder tenderloin ground round porchetta, fatback tri-tip biltong turducken frankfurter leberkas pork chop beef ribs. Ham drumstick jerky boudin, porchetta kevin sausage. Shank pork loin jerky chuck alcatra."

	},
	{
		name: "Green Rest",
		image: "https://farm3.staticflickr.com/2363/2386955872_a1196b0286.jpg",
		description: "Bacon ipsum dolor amet t-bone turducken corned beef pastrami meatloaf cow chicken short ribs ball tip jowl. Frankfurter shank bresaola kielbasa meatloaf ball tip beef picanha pancetta porchetta. Alcatra porchetta ham hamburger pork loin biltong. Leberkas drumstick rump tail. Burgdoggen shoulder tenderloin ground round porchetta, fatback tri-tip biltong turducken frankfurter leberkas pork chop beef ribs. Ham drumstick jerky boudin, porchetta kevin sausage. Shank pork loin jerky chuck alcatra."

	}
]

function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
			console.log("removed campgrounds!");

		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					//create a comment
					Comment.create(
					{
						text: "This place is great, but wish there was internet",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
						campground.comments.push(comment);
						campground.save();
						console.log("created new comment");
						}
					});

					
				}
			});
		});
	});
	
}

module.exports = seedDB;