class Die {
    min = 1;
    max = 1;
    mid = 0.5;

    constructor(max) {
        this.max = max;
        this.min = 1;
        this.mid = 0.5 * (max + 1);
    }

}

class DicePair {
    min = 2;
    max = 2;
    mid = 1;
    major;
    values = 1;

    constructor(die1, die2) {

        this.min = die1.min + die2.min;
        this.max = die1.max + die2.max;
        this.mid = 0.5 * (this.min + this.max);

        if (die1.max > die2.max) {
            this.major = die1;
        } else {
            this.major = die2;
        }

        this.values = this.max + 1 - this.min;

    }

    hitChance(def, mod) {
        let count = 0;
        for (let i = this.min; i < this.max + 1; i++) {
            if (def <= i + mod) {
                count++;
            }
        }
        return count / this.values;
    }

}

$(document).ready(function () {

    let goBtn = $('#goBtn');
    goBtn.on('click', function () {
        go();
    });

});

function go() {
    let die1 = new Die(parseInt($('#die1').val()));
    let die2 = new Die(parseInt($('#die2').val()));
    let def = parseInt($('#def').val());
    let wBaseDamage = parseInt($('#wd').val());
    
    let useTM = $('#checkTM').is(':checked');
    
    let bonus = parseInt($('#bd').val());
    let mod = parseInt($('#mod').val());
    let turns = parseInt($('#turns').val());

    let res = calculate(die1, die2, wBaseDamage, useTM, bonus, mod, def, turns);

    $('#hitChance').text(res.hitChance);
    $('#avgDamage').text(res.averageDamage);
}

function calculate(die1, die2, wBaseDamage, useTM, bonusDamage, mod, def, turns) {


    let pair = new DicePair(die1, die2);

    let finalW = wBaseDamage + bonusDamage;

    if (useTM) {
        finalW += pair.major.mid;
    }


    let hitChance = pair.hitChance(def, mod);

    let result = {};
    result.hitChance = Math.round(hitChance * 100) / 100;
    result.averageDamage = Math.round(hitChance * turns * finalW * 100) / 100;

    return result;

}
