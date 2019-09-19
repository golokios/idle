//Here you can style your game a bit. More still to come
//If you leave it empty, it will still work, but will look really basic
idle.style(
	//Basic CSS
	"#1e1e1e", //background-Color
	"#FFFFFF", //Font-Color
	"#2e2e2e", //Main-Color
	"#FFFFFF", //Secondary-Color
	"Arial", //Font

	//Title
	"50px", //Font-Size
	"#FFFFFF", //Font-Color
	"Helvetica", //Font

	//Description
	"18px", //Font-Size
	"#FFFFFF", //Font-Color
	"Helvetica", //Font

	//Currency
	"30px", //Font-Size
	"#FFFFFF", //Font-Color
	"Helvetica", //Font 

	//Get money Button
	"16px", //Font-Size
	"#000000", //Font-Color
	"Helvetica", //Font 
	"#FFFFFF", //Button-Color
	"10px 20px 10px 20px", //Padding
);

idle.game(
	"Your first idle Game", //Game Title
	"$", //Currency smybol
	0, //Starting money
	"Click to get Money", //Text on the "get money" button
	0.01, //Money per click
	0, //Money per Second
	"Upgrades", //Title for the "Upgrades section"
	"Here comes a fancy description... at some point at least", //Game description
	2 //On how many decimal places should be rounded to
);

//let cup = new idle.upgrade("name", price, money per click, money per second, money per click multiplier, cost multiplier)
let cup = new idle.upgrade("Cup", 1, 0.01, 0, 1, 1.1, 1.3);
