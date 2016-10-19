

var disp = document.getElementById('disp'),
clickArea = document.getElementById('clickarea'),

loop = function () {

    setTimeout(loop, 33);

    Game.tick();

    disp.innerHTML = 'money: ' + Game.money.current.toFixed(2) + '$' + ', '+ 
    //'per second: ' + Game.click.avg.moneyPerSec.toFixed(2) + '; auto per sec: ' + Game.auto.avgMoney.toFixed(2);
    'click%: ' + Game.click.per.toFixed(2) + '; auto%: ' + Game.auto.per.toFixed(2);

};

loop();

clickArea.addEventListener('click', function (e) {

    e.preventDefault();

    Game.onClick();

});

clickArea.addEventListener('mousedown', function (e) {
    e.preventDefault();
});
clickArea.addEventListener('mouseup', function (e) {
    e.preventDefault();
});
clickArea.addEventListener('mousemove', function (e) {
    e.preventDefault();
});
