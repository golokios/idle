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
              <section id="main">
                <h1 id="title"></h1>
                <p id="description"></p>
                <h1 id="currency"></h1>
                <button id="click" onclick="idle.getMoney()"></button>
                <div id="upgradeWrapper">
                  <h2 id="upgrades">Upgrades</h2>
                  <div id="upgradeConntainer">
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
                document.getElementById("upgradeConntainer").innerHTML += `<button id="${this.name}" onclick="${this.name.toLowerCase()}.buy()" style="padding: 10px 20px 10px 20px; font-size: 16px; margin: 0px 0px 10px 0px;">Upgrade ${this.name} (Current Level ${this.level}) Cost: ${idle.round(this.cost, gameData.roundTo)} ${gameData.currencySymbol} </button><br>`

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

        libraryObject.style = function(
            //Basic CSS
            bg, fontColor,mainColor, secondaryColor, font,
            //Title
            titleFontSize, titleColor, titleFont,
            //Description
            dFontSize, dColor, dFont,
            //Currency
            cFontSize, cColor, cFont,
            //Get money Button
            getMoneyFontSize, getMoneyColor, getMoneyFont, getMoneyButtonColor, getMoneyPadding
            ) {
            //Basic CSS
            this.bg = bg;
            this.mainColor = mainColor;
            this.secondaryColor = secondaryColor;
            this.fontColor = fontColor;
            this.font = font;
            //Title
            this.titleFontSize = titleFontSize;
            this.titleColor = titleColor;
            this.titleFont = titleFont;
            //Description
            this.dFontSize = dFontSize;
            this.dColor = dColor;
            this.dFont = dFont;
            //Currency
            this.cFontSize = cFontSize;
            this.cColor = cColor;
            this.cFont = cFont;
            //Get money Button
            this.getMoneyFontSize = getMoneyFontSize;
            this.getMoneyColor = getMoneyColor;
            this.getMoneyFont = getMoneyFont;
            this.getMoneyButtonColor = getMoneyButtonColor;
            this.getMoneyPadding = getMoneyPadding;


            let style = document.createElement('style');
            style.innerHTML = `
                body{
                    background-color: ${this.bg};
                    color: ${this.fontColor};
                    font-family: ${this.font};
                }

                button{
                    border: 0px solid;
                }

                #title{
                    font-size: ${this.titleFontSize};
                    font-family: ${this.titleFont};
                    color: ${this.fontColor};
                    margin: 50px 0px 0px 0px;
                }

                #main{
                    min-width: 100vw;
                    min-height: 100vh;
                    text-align: center;
                }

                #description{
                    font-size: ${this.dFontSize};
                    font-family: ${this.dFont};
                    color: ${this.dColor};
                    margin: 0px 0px 100px 0px;
                }

                #currency{
                    font-size: ${this.cFontSize};
                    font-family: ${this.cFont};
                    color: ${this.cColor};
                }

                #click{
                    font-size: ${this.getMoneyFontSize};
                    font-family: ${this.getMoneyFont};
                    color: ${this.getMoneyColor}
                    background-color: ${this.getMoneyButtonColor};
                    padding: ${this.getMoneyPadding};
                }

                #upgradeWrapper{
                    padding: 10px 0px 10px 50px;
                    text-align: left;
                }

                #upgrades{

                }

                #upgradeConntainer{
                    text-align: left;
                }
            `;
            document.head.appendChild(style);
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