(function(window) {
    function library() {
        var libraryObject = {};
        // Global game variables
        let gameData = {
            name: "",
            money: 0,
            currencySymbol: "",
            startingMoney: 0,
            mpc: 0,
            mps: 0,
            roundTo: 0,
        }

        libraryObject.game = function(name, currencySymbol, startingMoney, mainButtonText, mpc, mps, upgradesTitle, description, roundTo) {

            gameData.name = name;
            gameData.money = idle.round(startingMoney, gameData.roundTo);
            gameData.currencySymbol = currencySymbol;
            gameData.mpc = mpc;
            gameData.mps = mps;
            gameData.roundTo = roundTo;

            document.title = name;
            document.body.innerHTML = `
                <link rel="stylesheet" type="text/css" href="Themes/default.css" id="theme_css">
                <section id="main">
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
            document.getElementById("mpc_mps").innerHTML = `Per click: ${idle.round(gameData.mpc, gameData.roundTo)} ${gameData.currencySymbol} | per second: ${idle.round(gameData.mps, gameData.roundTo)} ${gameData.currencySymbol}`;
            document.getElementById("click").innerHTML = mainButtonText;
            document.getElementById("description").innerHTML = description;
            document.getElementById("upgrades").innerHTML = upgradesTitle;

            //Function for the "get money button"
            libraryObject.getMoney = function() {
                gameData.money += idle.round(gameData.mpc, gameData.roundTo);
                document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
            }

            //Function to get money per second
            libraryObject.idle = function() {
                gameData.money += gameData.mps;
                document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
                document.getElementById("mpc_mps").innerHTML = `Per click: ${idle.round(gameData.mpc, gameData.roundTo)} ${gameData.currencySymbol} | per second: ${idle.round(gameData.mps, gameData.roundTo)} ${gameData.currencySymbol}`;
            }

            //Main game loop
            let mainGameLoop = window.setInterval(function() {
                idle.idle();
            }, 1000)

        }

        //Upgrade constructor
        libraryObject.upgrade = class {
            constructor(upgradeName, level, moneyPerClick, moneyPerSecond, cost, mpcMultiplier, costMultiplier) {
                this.name = upgradeName;
                this.level = level;
                this.moneyPerClick = moneyPerClick;
                this.moneyPerSecond = moneyPerSecond;
                this.cost = cost;
                this.mpcMultiplier = mpcMultiplier;
                this.costMultiplier = costMultiplier;
                //Create new Button in HTML upgradeContainer
                document.getElementById("upgradeConntainer").innerHTML += `<button class="upgradeButton" id="${this.name}" onclick="${this.name.toLowerCase()}.buy()" style="margin-bottom: 10px;">Upgrade ${this.name} (Current Level ${this.level}) Cost: ${idle.round(this.cost, gameData.roundTo)} ${gameData.currencySymbol} </button><br>`

            }
            buy = function() {
                if (gameData.money >= this.cost) {
                    gameData.money -= this.cost;
                    gameData.mpc += this.moneyPerClick;
                    this.moneyPerClick *= this.mpcMultiplier;
                    this.cost *= this.costMultiplier;
                    this.level += 1;
                    document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
                    document.getElementById(this.name).innerHTML = `Upgrade ${this.name} (Current Level ${this.level}) Cost: ${idle.round(this.cost, gameData.roundTo)} ${gameData.currencySymbol}`;
                }
            }
        }

        //Theme selector
        libraryObject.setTheme = function(theme){
            document.getElementById("theme_css").href = `Themes/${theme}.css`
        }

        //Round function
        libraryObject.round = function(value, exp) {
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

        return libraryObject;
    }
    if (typeof(window.idle) === 'undefined') {
        window.idle = library();
    }
})(window);