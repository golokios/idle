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
        upgradesTitle: "Upgrades"
    }

    let savegameGameData = JSON.parse(localStorage.getItem(`idlejsSave`))
    if (savegameGameData !== null) {
        gameData = savegameGameData;
    }

    library.game = function() {

        document.title = gameData.name;
        document.body.innerHTML = `
                <div class="d-flex d-xl-flex flex-row justify-content-around justify-content-xl-end align-items-xl-center" style="padding-top: 0;padding-bottom: 0;padding-right: 50px;padding-left: 20px;background-color: #0d4374;">
        <h1 style="color: rgb(255,255,255);margin-top: 10px;margin-bottom: 10px; width: 70%; id="title">${gameData.name}</h1>
        <div class="d-flex d-xl-flex flex-row justify-content-xl-end align-items-xl-center" style="width: 100%;padding-right: 10px;padding-bottom: 10px;margin: 0px;margin-bottom: -10px;">
            <p class="d-xl-flex" style="color: rgb(255,255,255);margin-top: 15px;margin-right: 30px;" id="mpc_mps">${idle.round(gameData.moneyPerSecond, gameData.roundTo)}${gameData.currencySymbol} per second | ${gameData.moneyPerClick}${gameData.currencySymbol} per click</p>
            <div class="btn-group" role="group"><button class="btn btn-primary" type="button" style="background-color: rgb(67,67,67);color: rgb(255,255,255);">Info</button>
            <button class="btn btn-primary" type="button" style="background-color: rgb(90,193,54);color: rgb(255,255,255);" onclick="idle.save()">Save</button>
                <button class="btn btn-primary" type="button" style="background-color: rgb(228,59,59);color: rgb(255,255,255);" onclick="idle.deleteSave()">Delete savegame</button>
            </div>
        </div>
    </div>
    <section style="width: 100%;height: 100vh;padding-left: 0px;background-color: #181818;">
        <div class="row" style="margin: 0px;margin-left: 0px;margin-right: 0px;height: 100%;background-color: #151515;width: 100%;">
            <div class="col" style="padding-right: 0px;padding-left: 0px;max-width: 30%;background-color: #121212;" id="upgradeConntainer">
                <h2 class="text-center" style="margin-top: 30px;color: rgb(255,255,255);margin-bottom: 30px;" id="upgrades">${gameData.upgradesTitle}</h2>
            </div>
            <div class="col text-center" style="padding-right: 0px;padding-left: 0px;width: 70%;background-color: #0e0e0e;">
                <h1 class="text-center" style="margin-top: 30px;color: rgb(255,255,255);" id="title">${gameData.name}</h1>
                <h1 class="text-center" style="margin-top: 30px;color: rgb(255,255,255);font-size: 100px;margin-bottom: 0px;" id="currency">${gameData.money} ${gameData.currencySymbol}</h1>
                <p style="color: rgb(147,147,147);margin-bottom: 50px;margin-top: -10px;">You made 0.00$ so far</p><button class="btn btn-primary" type="button" style="font-size: 26px;padding-right: 40px;padding-left: 40px;padding-bottom: 10px;padding-top: 10px;background-color: rgb(13,67,116);" onclick="idle.getMoney()" id="click">${gameData.mainButtonText}</button></div>
        </div>
    </section>
    <div class="d-flex d-xl-flex flex-row justify-content-around justify-content-xl-center align-items-xl-center" style="padding-top: 10px;padding-bottom: 10px;padding-right: 50px;padding-left: 50px;background-color: #0d4374;">
        <p style="color: rgb(255,255,255);margin-bottom: 0px;">Created with idle.js and love|&nbsp;<a href="https://github.com/golokios/idle/">https://github.com/golokios/idle/</a></p>
    </div>
            `;

        //Setting up the HTML with the user input
        document.getElementById("title").innerHTML = gameData.name;
        document.getElementById("currency").innerHTML = gameData.money + " " + gameData.currencySymbol;
        document.getElementById("mpc_mps").innerHTML = `Per click: ${idle.round(gameData.moneyPerClick, gameData.roundTo)} ${gameData.currencySymbol} | per second: ${idle.round(gameData.moneyPerSecond, gameData.roundTo)} ${gameData.currencySymbol}`;
        document.getElementById("click").innerHTML = gameData.mainButtonText;
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

            document.getElementById("upgradeConntainer").innerHTML += `
                <div class="d-flex justify-content-between align-items-xl-center" style="padding: 30px;background-color: #181818;">
                    <div>
                        <h3 class="text-left d-flex justify-content-between" style="margin-top: 0px;color: rgb(255,255,255);margin-bottom: 0px;" id="${this.name}text">${this.name} (current level: ${this.level})</h3>
                        <p style="color: rgb(147,147,147);margin-bottom: 0px;" id="${this.name}mpc_mps">${idle.round(this.moneyPerClick, gameData.roundTo)}${gameData.currencySymbol} per click | ${idle.round(this.moneyPerSecond, gameData.roundTo)}${gameData.currencySymbol} per second</p>
                    </div>
                    <div>
                        <div class="btn-group" role="group"><button class="btn btn-primary" type="button" style="background-color: rgb(90,193,54);color: rgb(255,255,255);" id="${this.name}" onclick="${this.name.toLowerCase()}.buy()">Buy ${idle.round(this.cost, gameData.roundTo)}${gameData.currencySymbol}</button><button class="btn btn-primary" type="button" style="background-color: rgb(228,59,59);color: rgb(255,255,255);">Sell</button></div>
                    </div>
                </div>
            `

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
                document.getElementById(this.name).innerHTML = `Buy ${idle.round(this.cost, gameData.roundTo)}${gameData.currencySymbol}`;
                document.getElementById(`${this.name}text`).innerHTML = `${this.name} (current level: ${this.level})`;
                document.getElementById(`${this.name}mpc_mps`).innerHTML = `${idle.round(this.moneyPerClick, gameData.roundTo)}${gameData.currencySymbol} per click | ${idle.round(this.moneyPerSecond, gameData.roundTo)}${gameData.currencySymbol} per second`;
            }
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

    library.save = function() {
        localStorage.setItem(`idlejsSave`, JSON.stringify(gameData));
    }

    // Expose the public methods inside the library
    return library;
})();
idle.game();