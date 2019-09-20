var idle = (function() {

    // Create the library object
    var library = {};

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

    let savegameGameData = JSON.parse(localStorage.getItem(`idlejsSave`))
    if (savegameGameData !== null) {
        gameData = savegameGameData;
    }

    library.game = function() {

        document.title = gameData.name;
        document.body.innerHTML = `
                <link rel="stylesheet" type="text/css" href="Themes/defaultLight.css" id="theme_css">
                <section id="main">
                    <button class="deleteSave" onclick="idle.deleteSave()">Delete Save</button>
                    <h1 id="title"></h1>
                    <p id="description"></p>
                    <p id="mpc_mps" style="margin-bottom: -20px;"></p>
                    <h1 id="currency"></h1>
                    <button id="click" onclick="idle.getMoney()"></button>
                    <div id="upgradeWrapper">
                        <h2 id="upgrades">Upgrades</h2>
                        <div id="upgradeConntainer">
                        </div>
                    </div>
                </section>
            `;

        //Setting up the HTML with the user input
        document.getElementById("title").innerHTML = gameData.name;
        document.getElementById("currency").innerHTML = gameData.money + " " + gameData.currencySymbol;
        document.getElementById("mpc_mps").innerHTML = `Per click: ${idle.round(gameData.moneyPerClick, gameData.roundTo)} ${gameData.currencySymbol} | per second: ${idle.round(gameData.moneyPerSecond, gameData.roundTo)} ${gameData.currencySymbol}`;
        document.getElementById("click").innerHTML = gameData.mainButtonText;
        document.getElementById("description").innerHTML = gameData.description;
        document.getElementById("upgrades").innerHTML = gameData.upgradesTitle;

        //Function for the "get money button"
        library.getMoney = function() {
            gameData.money += idle.round(gameData.moneyPerClick, gameData.roundTo);
            document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
        }

        //Function to get money per second
        library.idle = function() {
            gameData.money += gameData.moneyPerSecond;
            document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
            document.getElementById("mpc_mps").innerHTML = `Per click: ${idle.round(gameData.moneyPerClick, gameData.roundTo)} ${gameData.currencySymbol} | per second: ${idle.round(gameData.moneyPerSecond, gameData.roundTo)} ${gameData.currencySymbol}`;
        }

        //Main game loop
        let mainGameLoop = window.setInterval(function() {
            idle.idle();
        }, 1000)

        let saveGameLoop = window.setInterval(function() {
            localStorage.setItem(`idlejsSave`, JSON.stringify(gameData))
        }, 15000)
    }

    //Upgrade constructor
    library.upgrade = class {
        constructor(upgradeName, level, moneyPerClick, moneyPerSecond, cost, moneyPerClickMultiplier, costMultiplier) {
            this.name = upgradeName;
            this.level = level;
            this.moneyPerClick = moneyPerClick;
            this.moneyPerSecond = moneyPerSecond;
            this.cost = cost;
            this.moneyPerClickMultiplier = moneyPerClickMultiplier;
            this.costMultiplier = costMultiplier;
            //Create new Button in HTML upgradeContainer

            let savegameUpgradeLevel = JSON.parse(localStorage.getItem(`${this.name}level`));
            if (savegameUpgradeLevel > this.level) {
                this.level = savegameUpgradeLevel;
            }

            let savegameUpgradeMoneyPerClick = JSON.parse(localStorage.getItem(`${this.name}moneyPerClick`));
            if (savegameUpgradeMoneyPerClick > this.moneyPerClick) {
                this.moneyPerClick = savegameUpgradeMoneyPerClick;
            }

            let savegameUpgradeMoneyPerSecond = JSON.parse(localStorage.getItem(`${this.name}moneyPerSecond`));
            if (savegameUpgradeMoneyPerSecond > this.moneyPerSecond) {
                this.moneyPerSecond = savegameUpgradeMoneyPerSecond;
            }

            let savegameUpgradeCost = JSON.parse(localStorage.getItem(`${this.name}cost`));
            if (savegameUpgradeCost > this.cost) {
                this.cost = savegameUpgradeCost
            }

            document.getElementById("upgradeConntainer").innerHTML += `<button class="upgradeButton" id="${this.name}" onclick="${this.name.toLowerCase()}.buy()" style="margin-bottom: 10px;">Upgrade ${this.name} (Current Level ${this.level}) Cost: ${idle.round(this.cost, gameData.roundTo)} ${gameData.currencySymbol} </button><br>`

        }
        buy = function() {
            if (gameData.money >= this.cost) {
                gameData.money -= this.cost;

                gameData.moneyPerSecond += this.moneyPerSecond;
                localStorage.setItem(`${this.name}moneyPerSecond`, JSON.stringify(this.moneyPerSecond));

                gameData.moneyPerClick += this.moneyPerClick;
                this.moneyPerClick *= this.moneyPerClickMultiplier;
                localStorage.setItem(`${this.name}moneyPerClick`, JSON.stringify(this.moneyPerClick));

                this.level += 1;
                localStorage.setItem(`${this.name}level`, JSON.stringify(this.level));

                this.cost *= this.costMultiplier;
                localStorage.setItem(`${this.name}cost`, JSON.stringify(this.cost));

                localStorage.setItem(`idlejsSave`, JSON.stringify(gameData))

                document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
                document.getElementById(this.name).innerHTML = `Upgrade ${this.name} (Current Level ${this.level}) Cost: ${idle.round(this.cost, gameData.roundTo)} ${gameData.currencySymbol}`;
            }
        }

        static deleteSave(){
            localStorage.removeItem(`${this.name}moneyPerSecond`);
            localStorage.removeItem(`${this.name}moneyPerClick`);
            localStorage.removeItem(`${this.name}level`);
            localStorage.removeItem(`${this.name}cost`);

        }
    }

    library.setTheme = function(theme) {
        document.getElementById("theme_css").href = `Themes/${theme}.css`
    }

    library.round = function(value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

    library.deleteSave = function() {
        localStorage.clear();
        location.reload();
    }

    // Expose the public methods inside the library
    return library;
})();
idle.game();