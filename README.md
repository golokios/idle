
# idle 0.12
A simple to use JS library to make basic idle/incremental games
The idea is/was, that this library is not the most complex one. It should just enable everyone (even people who don't understand English) to make a simple game in as few lines as possible.

## How to
Just copy all the files into a folder and open the index.html file in your favorite browser.
### Edit the settings (main.js)
In the main.js file, you will set up your game, style it and create upgrades.
#### Styling
With the idle.setTheme() function, you can change between themes that are Placed inside the Themes folder

     idle.setTheme("defaultDark")
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
#### *V. 0.12:*
-- Update to the Filestructure
-- Added a simple themeselector instead of the idle.style() function in 0.11. You can now choose between defaultDark and defaultLight or create your own.
-- A little bit of cleanup in the idle.js
#### *V. 0.11:*
-- Added the ability to style a few of the elements of the game. more will follow soon.
#### *V. 0.1:*
Initial Release