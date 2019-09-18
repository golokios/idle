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
              <section style="min-width: 100vw;min-height: 100vh; font-family: Arial; text-align: center;">
                <h1 id="title" style="font-size: 40px; margin: 50px 0px 0px 0px;"></h1>
                <p id="description" style="font-size: 18px; margin: 0px 0px 100px 0px;"></p>
                <h1 id="currency" style="font-size: 30px"></h1>
                <div style="padding: 10px 0px 10px 0px;">
                  <button id="click" onclick="idle.getMoney()" style="padding: 10px 20px 10px 20px; font-size: 16px;"></button>
                </div>
                <div style="padding: 10px 0px 10px 50px; text-align: left;">
                  <h2 id="upgrades">Upgrades</h2>
                  <div id="upgradeConntainer" style="text-align: left;">
                  </div>
                </div>
              </section>
            `;

            document.getElementById("title").innerHTML = gameData.name;
            document.getElementById("currency").innerHTML = gameData.money + " " + gameData.currencySymbol;
            document.getElementById("click").innerHTML = mainButtonText;
            document.getElementById("description").innerHTML = description;
            document.getElementById("upgrades").innerHTML = upgradesTitle;

            libraryObject.getMoney = function() {
                gameData.money += idle.round(gameData.mpc, gameData.roundTo);
                document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
            }

            libraryObject.idle = function() {
                gameData.money += gameData.mps;
                document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
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
                document.getElementById("upgradeConntainer").innerHTML += `<button id="` + this.name + `" onclick="` + this.name.toLowerCase() + `.buy()" style="padding: 10px 20px 10px 20px; font-size: 16px; margin: 0px 0px 10px 0px;">Upgrade ` + this.name + ` (Current Level ` + this.level + `) Cost: ` + idle.round(this.cost, gameData.roundTo) + ` ` + gameData.currencySymbol + `</button><br>`

            }
            buy = function() {
                if (gameData.money >= this.cost) {
                    gameData.money -= this.cost;
                    gameData.mpc += this.moneyPerClick;
                    this.moneyPerClick *= this.mpcMultiplier;
                    this.cost *= this.costMultiplier;
                    this.level += 1;
                    document.getElementById("currency").innerHTML = idle.round(gameData.money, gameData.roundTo) + " " + gameData.currencySymbol;
                    document.getElementById(this.name).innerHTML = "Upgrade " + this.name + " (Current Level " + this.level + ") Cost: " + idle.round(this.cost, gameData.roundTo) + " " + gameData.currencySymbol;
                }
            }
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