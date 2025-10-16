var Resets = document.getElementById("Resets");
var Levels = document.getElementById("Levels");
var TP = document.getElementById("TP");

function clamp_ish(text, max=NaN,min=0) {
    if (text.value == "") {
        text.value = 0;
    }
    text.value = parseInt(text.value);
    if (max != NaN) {
        if (text.value > max) {
            text.value = max;
        } if (text.value < 0) {
            text.value = 0;
        }
        text.value = Math.max(min,text.value);
    }
    
    UpdateStuff();
    //UpdateSkills();
}

function clamp(val, min, max) {
    if (val < min) {return min};
    if (val > max) {return max};
    return val;
}

function UpdateStuff() {
    var R = parseInt(document.getElementById("Resets").value);
    var L = parseInt(document.getElementById("Levels").value);
    var tp = parseInt(document.getElementById("TP").value);
    var tr = 0;
    var BossHP = parseInt(document.getElementById("BossHp").value);
    var Boost = parseInt(document.getElementById("Boosts").value);
    var Attack = parseInt(document.getElementById("Attack").value);
    if (document.getElementById("TR").checked) {
        tr = 10000;
    }
    var generalDamageAddition = (R * 250) + tp + tr + 100*Attack;
    for (var itemID in ITEMS) {
        var item = ITEMS[itemID]

        item.New.base.damage = (item.original.base.damage + generalDamageAddition)*(Boost/100 + 1);
        
        if (item.name != "Grilled Cheese Sandwich" && item.name != "DEEZ BONE SWORD" && item.name != "Lancelot's Gun") {
            item.calculateStats();
            item.updateElements();
        }
    }
    //Update specific stuff that has slightly different buffs or is just completely unique
    
    function UpdateSpecialItem(Name, Damage, Special, SDamage) {
        if (Damage != null) {
            ITEMS[Name].New.base.damage = Damage*(Boost/100 + 1);
        }
        if (Special != null) {
            ITEMS[Name].New.specials[Special].damage = SDamage*(Boost/100 + 1);
        }
        ITEMS[Name].calculateStats();
        ITEMS[Name].updateElements();
    }
    {
        UpdateSpecialItem("BraveryGauntlets",
            50000 + clamp(L,0,10000)*20 + tp*2 + R*500 + tr*2 + 100*Attack,
            0,
            50000+ clamp(L,0,10000)*20 + tp*2 + R*500 + tr*2 + 100*Attack,
        );
        
        UpdateSpecialItem("Chompy",
            (325000+generalDamageAddition+tr*19)*1.125,
            0,
            (325000+generalDamageAddition+tr*19),
        );
        
        UpdateSpecialItem("BerdlysMagic",
            150000+((R * 250) + tp*1.25 + tr) + 100*Attack,
            0,
            50000+(R*50)+(0.14*tp)+(tr/10) + 100*Attack
        );
        
        UpdateSpecialItem("KingsSword",
            240000 + generalDamageAddition,
            0,
            240000 + generalDamageAddition
        );
        
        UpdateSpecialItem("Pizza",
            225000+generalDamageAddition,
            0,
            180000+generalDamageAddition,
        );
        
        UpdateSpecialItem("KillerKnife",
            115000+generalDamageAddition,
            0,
            115000+generalDamageAddition,
        );
        
        UpdateSpecialItem("LegionHammer",
            150000+generalDamageAddition,
            0,
            150000+generalDamageAddition,
        );
        
        UpdateSpecialItem("Rose",
            225000+generalDamageAddition,
            0,
            225000+generalDamageAddition,
        );
        
        UpdateSpecialItem("EndoHead",
            525000 + (tp + tr*2.5 + 250*R) + 100*Attack,
        );
        
        UpdateSpecialItem("EpicEye",
            45000+(0.3*tp)+(200*R) + 100*Attack,
        );
        
        UpdateSpecialItem("AllBreaking",
            15*(400000+generalDamageAddition)/2
        );
        
        UpdateSpecialItem("BraveryGauntletsUpgraded",
            83000 + clamp(L,0,10000)*33.2 + tp*2 + R*500 + tr*2 + 100*Attack,
            0,
            83000 + clamp(L,0,10000)*33.2 + tp*2 + R*500 + tr*2 + 100*Attack,
        );
        
        UpdateSpecialItem("Pyrokinesis",
            250000+generalDamageAddition,
            0,
            750000+generalDamageAddition,
        );
        
        UpdateSpecialItem("StringMaster",
            600000+generalDamageAddition,
            0,
            25000 + tr*0.5 + R*125 + tp*0.4 + 100*Attack,
        );
        
        UpdateSpecialItem("TheVoid",
            766666 + generalDamageAddition,
            0,
            766666 + 375*R + tp + 100*Attack,
        );
        
        UpdateSpecialItem("SansBoneSword",
            60 + clamp(L,0,6000)*20 + generalDamageAddition,
        );
        
        UpdateSpecialItem("ErrorSansBoneSword",
            160 + clamp(L,0,6000)*25 + generalDamageAddition,
        );
        
        UpdateSpecialItem("SoulBlaster",
            2000 + clamp(L,0,6000)*42 + generalDamageAddition,
        );
        
        if (L <= 6000) {
            var baseDamage = L*50 + 200000+generalDamageAddition;
            UpdateSpecialItem("Doombringer",
                baseDamage,
                0,
                baseDamage*1.2,
            );
            UpdateSpecialItem("Doombringer",
                null,
                1,
                baseDamage*12.9/18,
            );
        } else {
            var baseDamage = (L-6000)*50/4.5 + 500000+generalDamageAddition;
            UpdateSpecialItem("Doombringer",
                baseDamage,
                0,
                baseDamage*1.2,
            );
            UpdateSpecialItem("Doombringer",
                null,
                1,
                baseDamage*12.9/18,
            );
        }
        
        var damage = 15000+250*R+tp+L*14+tr  +  15000+250*R+tp*1.3+L*12.5+tr  +  15000+250*R+tp+L*12.5+tr*10 + 300*Attack;
        UpdateSpecialItem("AncientPumpblade",
            (damage)/3,
            0,
            (damage+ (15000+ 29*L + tp + 250*R + tr) )/4
        );
        UpdateSpecialItem("AncientPumpblade",
            null,
            1,
            (damage+ (10000 + 19*L + tp + 250*R + 50*tr) )/4
        );
        UpdateSpecialItem("AncientPumpblade",
            null,
            2,
            (damage+ (15000 + 1.9*L + 0.2*tp + 25*R + tr/10)*8 )/11
        );

        UpdateSpecialItem("DarkPumpblade",
            (damage)/3,
            0,
            (damage+ (15000+ 29*L + tp + 250*R + tr) )/4
        );
        UpdateSpecialItem("DarkPumpblade",
            null,
            1,
            (damage+ (10000 + 19*L + tp + 250*R + 50*tr) )/4
        );
        UpdateSpecialItem("DarkPumpblade",
            null,
            2,
            (damage+ (15000 + 1.9*L + 0.2*tp + 25*R + tr/10)*8 )/11
        );
        
        
        UpdateSpecialItem("SteelFrost",
            (1500 + clamp(30*L,0,30000) + clamp(7500*R,0,300000) + tp/2 + tr/(50/9)) + 100*Attack,
            0,
            (1500 + clamp(30*L,0,30000) + clamp(7500*R,0,300000) + tp/2 + tr/(50/9)) + 100*Attack,
        );
        
        UpdateSpecialItem("ChillingBlade",
            3000 + clamp(100*L,0,100000) + clamp(15000*R,0,600000) + tp/2 + tr/(100/33) + 100*Attack,
            0,
            3000 + clamp(100*L,0,100000) + clamp(15000*R,0,600000) + tp/2 + tr/(100/33) + 100*Attack,
        );

        UpdateSpecialItem("RiftEssence",
            225000 + tp*0.33 + R*2500 + tr*22.5 + 100*Attack,
            0,
            225000 + tp*0.33 + R*2500 + tr*22.5 + 100*Attack
        );
        UpdateSpecialItem("RiftEssence",
            null,
            1,
            500000 + R*250 + tp + tr*50 + 100*Attack
        );
        UpdateSpecialItem("RiftEssence",
            null,
            2,
            90000 + tr*9 + R * 1500 + tp * 0.25 + 100*Attack
        );
        
        UpdateSpecialItem("Bike",
            43750 + tp*0.05 + R*150 + tr/2 + 100*Attack,
        );
        
        UpdateSpecialItem("Maskv1",
            1400000 + R * (206503/590) + tp * (137/118) + tr*9.099984746 + 100*Attack,
        );
        
        UpdateSpecialItem("Maskv2",
            (700000+(tr*15)+(R*250 + tp*0.625) + 100*Attack) * 10.15/9,
        );
        
        UpdateSpecialItem("Banana",
            1000000+generalDamageAddition + Math.min(2000000,BossHP*0.015),
        );
    
        UpdateSpecialItem("CoolSkull",
            300000 + tr*20 + R*125 + tp*0.5 + 100*Attack,
        );
        
        //check all hits of pocket core
        {
            var d = 0;
            var b = Math.floor(366667+tp+375*R) + 100*Attack
            if (tr == 10000) {
                for (var i = 1; i <= 119; i++) {
                    if (i < 100) {
                        d +=  b * (Math.min(i, 100)/100);
                    } else {
                        d += b*1.25;
                    }
                }
            } else {
                for (var i = 1; i <= 119; i++) {
                    d += b * (Math.min(i,100)/100);
                }
            }
            UpdateSpecialItem("PocketCore",
                d/119,
            );
        }
        
        UpdateSpecialItem("HackingPhone",
            366666+R*375+tp + 100*Attack,
        );
        
        UpdateSpecialItem("SanssHat",
            7500+ tp*0.11315 + R*50+tr/2 + 100*Attack,
        );
        
        // FIX THIS, IT IS WRONG DAMAGE
        UpdateSpecialItem("HeadThrow",
            ((tr*50 + R*25000 + L*100 + tp*76.225 + 100)/10 * 3) + generalDamageAddition,
        );
        
        UpdateSpecialItem("FlamingStallion",
            100000 + tp*0.125 + R*175 + tr*4/3 + 100*Attack,
        );
        
        UpdateSpecialItem("SantasBag",
            clamp(120*L,0,1200000) + tp*0.5 + clamp(R*1500,0,15000) + 100*Attack,
        );
        
        UpdateSpecialItem("WintersCurse",
            (200000 + clamp(L*150,0,999900) + tp/2)*2 + 100*Attack,
        );
    }
    
    UpdateSkills();
}

function UpdateSkills() {
    new Audio("./Sounds/Switch.mp3").play();

    var Damage = parseInt(document.getElementById("DmgSlider").value);
    var Reload = parseInt(document.getElementById("ReloadSlider").value);
    var R = parseInt(document.getElementById("Resets").value);
    var L = parseInt(document.getElementById("Levels").value);
    var tp = parseInt(document.getElementById("TP").value);
    var tr = 0;
    var Boost = parseInt(document.getElementById("Boosts").value);
    var BossHP = parseInt(document.getElementById("BossHp").value);
    var Attack = parseInt(document.getElementById("Attack").value);
    if (document.getElementById("TR").checked) {
        tr = 10000;
    }
    
    var generalDamageAddition = tp + tr + 250*R + 100*Attack;
    
    //fix some stuff
    if (Damage == 7) {
        Damage = 11;
    }
    
    function updateSkill(skill) {
        skill.calculateStats();
        var skill1 = document.getElementById(skill.name + " DPS");
        if (skill1 != null) {
            skill1.innerText = "Your DPS: " + convert(skill.stats.DPS);
        }
        var skill2 = document.getElementById(skill.name + " Damage");
        if (skill2 != null) {
            skill2.innerText = "Your Damage: " + convert(skill.New.base.damage);
        }
        var skill3 = document.getElementById(skill.name + " Total Damage");
        if (skill3 != null) {
            skill3.innerText = "Total Damage: " + convert(skill.stats.totalDamage);
        }
        var skill3 = document.getElementById(skill.name + " EDPS");
        if (skill3 != null) {
            skill3.innerText = "Your DPS: " + convert(skill.stats.DPS);
        }
    }
    
    for (var skillID in Skills) {
        var skill = Skills[skillID];
        skill.New.base.damage = ((skill.original.base.damage)*(1 + Damage/10) + generalDamageAddition)*(Boost/100 + 1);
        var special = skill.original.specials[0];
        if (special) {
            skill.New.specials[0].damage = (skill.original.specials[0].damage * 1.1)*(Boost/100 + 1);
            skill.New.specials[0].cooldown = (skill.original.base.cooldown-Reload);
        }
        skill.New.base.cooldown = (skill.original.base.cooldown-Reload);
        
        updateSkill(skill);
    }
    //manual calculations
    //asgore
    Skills.Asgore.New.specials[0].damage = ((100000 * (1 + Damage/10) + 0.2*tp + 50*R + tr/5 + 100*Attack) * 1.9)*(Boost/100 + 1);
    updateSkill(Skills.Asgore);
    
    //fallen one
    Skills.FallenOne.New.base.damage = (510000 + 250*R + Math.min(0.0033 * BossHP,500000) + (7/6)*tp + 1.75*tr + 100*Attack)*(Boost/100 + 1);
    Skills.FallenOne.New.base.cooldown = 42;
    updateSkill(Skills.FallenOne);

    if (BossHP > 80000000) {
        if (tr > 0) {
            BossHP = 80000000;
        } else {
            BossHP = 40000000;
        }
    }
    //betty
    Skills.Betty.New.base.damage = (300000*(1 + Damage/10) + (R*250+tp+tr+BossHP*0.05) + 100*Attack)*(Boost/100 + 1);
    updateSkill(Skills.Betty);
    
    //gaster
    Skills.Gaster.New.base.damage = (100000 * (1 + Damage/10) + generalDamageAddition)*(Boost/100 + 1);
    Skills.Gaster.New.specials[0].damage = Skills.Gaster.New.base.damage*2;
    updateSkill(Skills.Gaster);
}
