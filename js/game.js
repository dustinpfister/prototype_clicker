var Game = (function () {

    // money state object
    var money = {

        current : 0,
        autoAmount : 0,
        autoRate : 1000,
        lastAuto : new Date()

    },

    // clicking to make money
    click = {

        total : 0,
        moneyPer : 0.01,
        per : 1,
        last : new Date(),
        avg : {

            last : new Date(),
            updateRate : 500,
            lastCount : 0,
            clickCounts : [],
            current : 0,
            moneyPerSec : 0,

            // what to do on a frame tick
            tick : function () {

                var now = new Date(),
                time = now - this.last,
                clickCount,
                avg;

                if (time >= this.updateRate) {

                    clickCount = click.total - click.avg.lastCount;

                    this.clickCounts.push(clickCount);

                    if (this.clickCounts.length === 5) {

                        this.clickCounts.shift();

                    }

                    avg = 0;
                    this.clickCounts.forEach(function (cc) {

                        avg += cc;

                    });

                    avg = avg / this.clickCounts.length / this.updateRate * 1000;

                    this.lastCount = click.total;

                    this.last = new Date();

                    this.current = avg;
                    this.moneyPerSec = this.current * click.moneyPer;

                }

            }

        }

    },

    // automaticly making money over time
    auto = {

        perAuto : 0,
        per : 0,
        avgMoney : 0,
        rate : 1000,
        moneyDelta : 0,
        totalMoney : 0,
        totalAutos : 0,
        lastAuto : new Date(),

        tick : function () {

            var now = new Date(),
            time = now - this.lastAuto,
            moneyDelta;

            if (time >= this.rate) {

                this.moneyDelta = this.perAuto / this.rate * time;

                money.current = money.current + this.moneyDelta;

                this.totalMoney += this.moneyDelta;
                this.totalAutos += 1;
                this.lastAuto = new Date();

                this.findAVG();

            }

        },

        findAVG : function () {

            this.avgMoney = this.totalMoney / this.totalAutos / this.rate * 1000;

        }

    },

    // the public api to be returned to Game global var.
    api = {

        // reference to money object
        money : money,
        click : click,
        auto : auto,

        perSec : 0,

        // what to do on a click or touch.
        onClick : function () {

            click.total += 1;

            money.current += click.moneyPer;

        },

        // what to do on a frame tick
        tick : function () {

            auto.tick();
            click.avg.tick();

            // add up the totals for avg money per click, and avg money over time to get total money per sec
            this.perSec = auto.avgMoney + click.avg.current;

            click.per = 0;
            auto.per = 0;
            if (this.perSec > 0) {
                click.per = click.avg.current / this.perSec;
                auto.per = 1 - click.per;

            }

        }

    };

    /*
    setInterval(function () {
    api.onClick()
    }, 1000)

     */

    // return the public api.
    return api;

}
    ());
