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

//Select your theme. Has to be placed inside the Themes folder.
idle.setTheme("defaultLight");

//let cup = new idle.upgrade("name", price, money per click, money per second, money per click multiplier, cost multiplier)
let cup = new idle.upgrade("Cup", 1, 0.01, 0, 1, 1.1, 1.3);
