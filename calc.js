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
    major;
    minor;

    constructor(die1, die2) {

        this.min = die1.min + die2.min;
        this.max = die1.max + die2.max;

        if (die1.max > die2.max) {
            this.major = die1;
            this.minor = die2;
        } else {
            this.major = die2;
            this.minor = die1;
        }

    }

    hitChance(def, mod, critMin) {
        let fail = 0;
        let crit = 0;
        let comb = 0;

        for (let i = this.major.min; i < this.major.max + 1; i++) {
            for (let k = this.minor.min; k < this.minor.max + 1; k++) {
                
                let isCrit = false;
                
                if(k >= critMin && i + k > 2 && i === k){
                    crit++;
                    isCrit = true;
                }
                
                if(!isCrit && def > i + k + mod){
                    fail++;
                }
                
                comb++;
            }
        }

        //return (comb - fail) / comb;
        let res = {};
        res.toHit = (comb - fail) / comb;
        res.toCrit = crit / comb;
        return res;
        
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

    let critMin = 6;

    if (!$('#checkCrit').is(':checked')) {
        critMin = 2;
    }

    let bonus = parseInt($('#bd').val());
    let mod = parseInt($('#mod').val());
    let turns = parseInt($('#turns').val());

    let res = calculate(die1, die2, wBaseDamage, useTM, bonus, mod, critMin, def, turns);

    $('#hitChance').text(res.hitChance);
    $('#avgDamage').text(res.averageDamage);
}

function calculate(die1, die2, wBaseDamage, useTM, bonusDamage, mod, critMin, def, turns) {


    let pair = new DicePair(die1, die2);

    let finalW = wBaseDamage + bonusDamage;

    if (useTM) {
        finalW += pair.major.mid;
    }


    let chance = pair.hitChance(def, mod, critMin);
    let hitChance = chance.toHit;
    
    let result = {};
    result.hitChance = Math.round(hitChance * 100) / 100;
    result.critChance = Math.round(chance.toCrit * 100) /100;
    result.averageDamage = Math.round(hitChance * turns * finalW * 100) / 100;

    return result;

}
