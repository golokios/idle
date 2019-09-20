
# idle 0.20 ALPHA
A simple to use JS library to make basic idle/incremental games.  
The idea is/was, that this library is not the most complex one, but should just enable everyone (even people that don't understand English), to make a simple game in as few lines as possible.
## How to
Just copy all the files into a folder and open the index.html file in your favourite browser.
### Change the game setting
In the assets/js/idle.js from line 6 to line 17, you can change the settings of your game
### Create upgrades and theme settings (main.js)
In the main.js file you can create upgrades and is planned for changing themes.
#### Styling
With the idle.setTheme() function, you can change between themes that are placed inside the assets/css folder  
Currently there are now themes, but you can create them (just make a new css file);

     idle.setTheme("defaultDark")
#### Game settings
The idle.game() function will let you set the basic settings of your game and it will create the HTML for you.  
Always use the idle.style() function before idle.game()

    let gameData = {
        name: "Your idle game",
        money: 0,
        currencySymbol: "$",
        startingMoney: 0,
        moneyPerClick: 0.1,
        moneyPerSecond: 0,
        roundTo: 2,
        mainButtonText: "Click to get money",
        description: "Write your own description",
        upgradesTitle: "Upgrades"
    }
#### Creating Upgrades
With: let yourUpgradeName = new idle.upgrade() you can create your own upgrades. They will automatically be added to the HTML.

    //let cup = new idle.upgrade("name", price, money per click, money per second, money per click multiplier, cost multiplier)
    let cup = new idle.upgrade("Cup", 1, 0.01, 0, 1, 1.1, 1.3);
## Change log:
#### *V. 0.20 ALPHA:*
-- Now using Bootstrap and a new design with it
-- Added a save button
#### *V. 0.13:*
-- Updated the code to be a bit more clean.
-- Added a simple (probably very messy) way to autosave and delete your savegame 
-- Changed the way you set up your game. Instead of having to call the idle.game() function, your game will now be displayed automatically.  
If you want to change game settings like the name, you will have to edit the gameData object in the main.js file.
#### *V. 0.12:*
-- Update to the file structure  
-- Added a simple themeselector instead of the idle.style() function in 0.11. You can now choose between defaultDark and defaultLight or create your own.  
-- A little bit of cleanup in the idle.js
#### *V. 0.11:*
-- Added the ability to style a few of the elements of the game. More will follow soon.
#### *V. 0.10:*
Initial Release