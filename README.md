
# idle 0.11
A simple to use JS library to make basic idle/incremental games
The idea is/was, that this library is not the most complex one. It should just enable everyone (even people who don't understand English) to make a simple game in as few lines as possible.

## How to
Just copy all the files into a folder and open the index.html file in your favorite browser.
### Edit the settings (main.js)
In the main.js file, you will set up your game, style it and create upgrades.
#### Styling
With the idle.style() function, you can set up the basic color and look of your game (more to come) and it will create the CSS for you

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
#### Game settings
The idle.game() function will let you set the basic settings of your game and it will create the HTML for you.
Always use the idle.style() function before idle.game()

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
#### Creating Upgrades
With: let yourUpgradeName = new idle.upgrade() can you create your own upgrades. They will automatically be added to the HTML.

    //let cup = new idle.upgrade("name", price, money per click, money per second, money per click multiplier, cost multiplier)
    let cup = new idle.upgrade("Cup", 1, 0.01, 0, 1, 1.1, 1.3);

## Change log:
#### *V. 0.11:*
-- Added the ability to style a few of the elements of the game. more will follow soon.
#### *V. 0.1:*
Initial Release