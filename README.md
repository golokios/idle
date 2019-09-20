
# idle 0.13
A simple to use JS library to make basic idle/incremental games.  
The idea is/was, that this library is not the most complex one. It should just enable everyone (even people who don't understand English) to make a simple game in as few lines as possible.
## How to
Just copy all the files into a folder and open the index.html file in your favorite browser.
### Change the game setting
In the idle.js grom line 6 and on, you can change the setting of your game
### Create upgrades and theme settings (main.js)
In the main.js file, style it and create upgrades.
#### Styling
With the idle.setTheme() function, you can change between themes that are Placed inside the Themes folder

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
With: let yourUpgradeName = new idle.upgrade() can you create your own upgrades. They will automatically be added to the HTML.

    //let cup = new idle.upgrade("name", price, money per click, money per second, money per click multiplier, cost multiplier)
    let cup = new idle.upgrade("Cup", 1, 0.01, 0, 1, 1.1, 1.3);
## Change log:
#### *V. 0.13:*
-- Updated the code to be a bit more clean.
-- Added a simple (probably very messy) way to autosave and delete your savegame 
-- Changed the way you set up your game. Instead of having to call the idle.game() function, your game will now be displayed automaticly.  
If you want to change game settings like the name, you will have to edit the gameData object in the main.js file.
#### *V. 0.12:*
-- Update to the Filestructure  
-- Added a simple themeselector instead of the idle.style() function in 0.11. You can now choose between defaultDark and defaultLight or create your own.  
-- A little bit of cleanup in the idle.js
#### *V. 0.11:*
-- Added the ability to style a few of the elements of the game. more will follow soon.
#### *V. 0.10:*
Initial Release