var Resets = document.getElementById("Resets");
var Levels = document.getElementById("Levels");
var TP = document.getElementById("TP");

function clamp_ish(text, max=NaN) {
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
    }
    
    UpdateStuff();
    UpdateSkills();
}

function clamp(val, min, max) {
    if (val < min) {return min};
    if (val > max) {return max};
    return val;
}

var Names = {
            0: ["Stick","Description: Its bark is worse than its bite"],
            1: ["Toy Knife","Description: Made of plastic. A rarity nowadays."],
            2: ["Torn Notebook","Description: Contains illegible scrawls."],
            3: ["Burnt Pan","Description: Damage is rather consistent."],
            4: ["Empty Gun","Description: An antique revolver. It has no ammo."],
            5: ["Worn Dagger","Description: Perfect for cutting plants and vines."],
            6: ["Asgore Trident","Description: The King's precious weapon"],
            7: ["Faster Blaster","Description: "],
            8: ["Photoshop Sword","Description: "],
            9: ["UF Asgore Trident","Description: "],
            10: ["Real Knife","Description: Here we are!"],
            11: ["Fresh Sans Eye","Description: Fresh."],
            12: ["Nightmare Tentacle","Description: "],
            13: ["Cross Sans Weapon","Description: "],
            14: ["Negatale Sans Blaster","Description: "],
            15: ["Ink Brush","Description: "],
            16: ["Hope Sword","Description: "],
            17: ["Gaster Hand","Description: "],
            18: ["Papyrus Bone","Description: "],
            19: ["Betty Scythe","Description: Fear prowess"],
            20: ["Ink Sans Eye","Description: 3 is greater than 1."],
            21: ["OOF","Description: "],
            22: ["Fatal Error Bone","Description: "],
            23: ["Soul Knife","Description: "],
            24: ["Sanes Gun","Description: SANESSS!!!!"],
            25: ["Soul Trident","Description: "],
            26: ["Scythe XSoul","Description: Sacred life"],
            27: ["Orange Eye","Description: Deals x2 DMG on non-moving bosses."],
            28: ["Legendary Orb","Description: "],
            29: ["Temmie","Description: "],
            30: ["Tesla Knife","Description: "],
            31: ["Epic Bone","Description: "],
            32: ["Hardcore Knife","Description: "],
            33: ["Game Master Block","Description: "],
            34: ["X Gaster Hand","Description: "],
            35: ["Switch Bone","Description: "],
            36: ["Bob Sword.","Description: "],
            37: ["Hate Knife.","Description: "],
            38: ["Gauntlet","Description: "],
            39: ["C.O.D.E Worn Dagger","Description: "],
            40: ["Hardcore Game Master Block","Description: "],
            41: ["OOF Blaster","Description: Deals x3 more DMG if the target has 25% of hp or lower."],
            42: ["Bigger Blaster","Description: "],
            43: ["C.O.D.E Betty Scythe","Description: "],
            44: ["Chompy","Description: Summons Chompy. Triggers an explosion if you re-activate it while being close to it (deals 25% more Damage).", "No Explosion", 108330],
            45: ["Error Blaster","Description: "],
            46: ["UPD C.O.D.E Worn Dagger","Description: "],
            47: ["Real Real Knife","Description: real"],
            48: ["UPD OOF Blaster","Description: Deals x3 more DMG if the target has 25% of hp or lower."],
            49: ["OOF head eye","Description: A huge head provides a huge power (Deals x3 more DMG if EPICNESS is equipped and on use)."],
            50: ["Berdly's Magic","Description: Sends swirls with it's axe, and fires deadly projectiles with the spear.", "Only Special", 17500],
            51: ["C.O.D.E Saber","Description: "],
            52: ["Pizza","Description: Weirdly enough, it doesn't seem to be for human consumption. Extra impact in hit target on Damage from any source."],
            53: ["King's Sword","Description: Attacking while not moving will send x3 Projectiles instead.", "Projectile", 276920],
            54: ["King Power","Description: King's prowess."],
            55: ["Killer Knife","Description: Perfect for it's job...", "Beam" , 115000],
            56: ["Devils Knife","Description: "],
            57: ["Puppet Scarf","Description: Each consecutive hit reduces Cooldown by 0.1 seconds. Stacks up to 6 times, grants 100000 bonus Damage when fully stacked. Missing or waiting 3 seconds resets the stacks.   (stats based on boost)"],
            58: ["Rose","Description: Creates a Zone that damages Enemies inside of it."],
            59: ["Endo Head","Description: Gives speed boost and Invincibility on hit, picking up the head will shorten it's Cooldown.\n\n(based on 5 second cooldown due to cooldown decrease when picking it up)"],
            60: ["Multiverse Scythe","Description: Ink turned into a scythe :flushed:"],
            61: ["Epic Eye","Description: what's 10+10?\n\n(Including all bones)"],
            62: ["SnansBlade","Description: "],
            63: ["UPD C.O.D.E Betty Scythe","Description: "],
            64: ["SnatSansMinion","Description: Snatcher's Gift: A Special Minion that was planned to be used in the fight against you. attaches to an enemy and spins against it, damaging 8 times. Doesn't let the enemy use shields during the spin. You're probably lucky he spared you from it.       (all 8 hits)"],
            65: ["Pyrokinesis","Description: Sends a Fireball that on hit, deals tick Damage 3 times(Being near the enemy instantly sets them on fire). The third use will launch a Fire Fist instead (x3 Damage total)"],
            66: ["Deity Block","Description: "],
            67: ["EraserSaber","Description: "],
            68: ["String Master","Description: Sends a string with each attack, landing them in an enemy will Damage them a little and restore 0.5% of your Max HP\n\n(Including Strings)", "String", 41660],
            69: ["LONGSTICK","Description: "],
            70: ["KONGPOWER","Description: KING OF CHAOS SPECIAL ATTACK!!!"],
            71: ["JOVILSCYTHE","Description: "],
            72: ["SansBoneSword","Description: LV increases the Damage by 20 (Max 6000 LV)"],
            73: ["ErrorSansBoneSword","Description: LV increases the Damage by 25 (Max 6000 LV)"],
            74: ["SoulBlaster","Description: LV increases the Damage by 42 (Max 6000 LV)"],
            75: ["Doombringer","Description: Brings despair equal in power to it's user\n\n(14 uses to include special attack)", "Throwing", 160000],
            76: ["Snowball", "Description: "],
            77: ["Toy", "Description: "],
            78: ["Ascentdents Stars", "Description: "],
            79: ["Christmas Tree", "Description: "],
            80: ["Christmas Sword", "Description: "],
            81: ["Ancient Pumpblade", "Description: A blade that grows in strength with it's user. It was forged by the ancient blacksmiths of the Pump Kingdom."],
            82: ["Rift Essense","Description: Getting the right patterns will trigger events. When Resetting, your extra TP is turned into LV's.", "Explosion", 20, "Wires",20],
            83: ["Counter Bone","Description: For 1.5 seconds, you will ignore the damage received and create a blast that deals 500k DMG up to 3 times."],
            84: ["Kill","Description: Teleports behind nearest boss dealing 1M DMG and giving Invincibility during 3 seconds, doesn't give invincibility if you're out of range"],
            85: ["Bike","Description: +10 Speed boost while it's equipped and extra 15 Speed boost when activated, it can hit multiple times and stun enemeies."],
            86: ["Mask (v1)","Description: Hauriunt omnia"],
            87: ["Mask (v2)","Description: Hauriunt omnia"],
            88: ["Banana","Description: You place a spinning banana, after 4 seconds it explodes healing 40% of missing HP to nearby allies and dealing damage to nearby enemies\n(for percent damage, input a level. Each level is 20k HP, max 1B. Not being lazy)"],
            89: ["Sans' Hat", "Description: The hat starts gathering a storm, which later explosion causes all nearby enemies to Freeze."],
            90: ["Head Throw", "Description: You throw your head away as a bomb which periodically increases size for 1 second and making it roll in the floor, taking 10$ of your current HP. The base damage will depend on the HP that is taken away x3."],
        }

function UpdateStuff() {
    var R = parseInt(document.getElementById("Resets").value);
    var L = parseInt(document.getElementById("Levels").value);
    var tp = parseInt(document.getElementById("TP").value);
    var tr = 0;
    var BossHP = parseInt(document.getElementById("BossHp").value);
    if (document.getElementById("TR").checked) {
        tr = 10000;
        
    }
    var generalDamageAddition = (R * 250) + tp + tr;
    
    var WeaponDamage = [7,15,31,40,50,100,60,125,300,360,440,475,1000,1650,1850,2500,3600,5000,5250,5500,7500,7000,8000,7500,9000,10000,12000,15000,21500,21000,34000,54000,69000,40000,50000,42500,50000,60000,80000,85000,121000,103330,150000,155000,731250,80000,120000,70000,138330,90000,1700000,230000,2250000,240000,100000,230000,300000,300000,4500000,525000,345000, 900000, 355000, 355000, 1880000, 3750000, 435000, 465000, 650000, 350000, 425000, 750000, 60, 160, 2000, 3320000, 11000, 7000, 25000, 85000, 270000, 60000, 675000, 1500000, 1000000, 438000, 1400000, 7120000,1000000, 75000, 10];
        
    var Cooldown = [0.9,0.8, 1.2, 0.9, 0.8, 0.8, 1, 0.85, 0.9, 1, 0.8, 1.5, 0.9, 0.9, 1.5, 0.9, 0.9, 1.5, 0.9, 1, 1.5, 0.8, 0.9, 0.8, 1.5, 1, 1, 1.5, 0.8, 0.9, 0.8, 0.9, 0.8, 1, 3, 0.9, 0.9, 0.8, 0.9, 0.8, 1, 1.6, 4, 1, 6, 1.5, 0.8, 0.25, 1.6, 1.4, 20, 0.9, 21, 0.9, 1.5, 1, 1, 0.6, 15, 5, 1, 12, 0.9, 1, 10, 18, 1, 0.9, 1.2, 1, 1, 1, 0.9, 0.9, 1.2, 15, 1.7, 0.8, 3, 0.9, 0.9, 3.6, 15, 10, 20, 5, 30, 36,30, 25, 10];

    var DPS = [];
    for (var i = 0; i < WeaponDamage.length; i++) {
        if (WeaponDamage[i] != "S") {
            DPS.push( (generalDamageAddition + WeaponDamage[i]) / Cooldown[i] );
        } else {
            DPS.push("S")
        }
    }
    
    let convert = (n) => {
        let s = ["", "k", "m", "b", "t"];
        let mag = Math.floor(Math.log10(n));
        let index = Math.floor(mag / 3);
        let abbreviatedValue = parseFloat((n / Math.pow(1000, index)).toPrecision(3));
        return abbreviatedValue + s[index];
    };
    
    for (var i = 0; i <= 80; i++) {
        document.getElementById("Item " + i).innerText = "Your DPS: " + convert(DPS[i]);
        document.getElementById(Names[i][0] + " Damage").innerText = "Your Damage: " + convert((WeaponDamage[i] + generalDamageAddition));
        document.getElementById(Names[i][0] + " DPS").innerText = "Your DPS: " + convert(DPS[i]);
    }
    //Update specific stuff that has slightly different buffs or is just completely unique
    {
        document.getElementById("Item 20").innerText = "Your DPS: " + convert((((2500+generalDamageAddition)*3)/1.5));
        document.getElementById("Ink Sans Eye Damage").innerText = "Your Damage: " + convert(((2500+generalDamageAddition)*3));
        document.getElementById("Ink Sans Eye DPS").innerText = "Your DPS: " + convert(((2500+generalDamageAddition)*3)/1.5);
    
        document.getElementById("Item 44").innerText = "Your DPS: " + convert(((325000+generalDamageAddition+tr*20)+(325000+generalDamageAddition+tr*20)*1.25)/6);
        document.getElementById("Chompy Damage").innerText = "Your Damage: " + convert((325000+generalDamageAddition+tr*20)+(325000+generalDamageAddition+tr*20)*1.25);
        document.getElementById("Chompy DPS").innerText = "Your DPS: " + convert(((325000+generalDamageAddition+tr*20)+(325000+generalDamageAddition+tr*20)*1.25)/6);
        document.getElementById("Chompy No Explosion").innerText = "No Explosion DPS: " + convert((325000+generalDamageAddition+tr*20)/3);
        
        document.getElementById("Item 50").innerText = "Your DPS: " + convert( ((150000+((R * 250) + tp*1.25 + tr))*9 + (50000+(R*50)+(0.14*tp)+(tr/10))*7)/20);
        document.getElementById("Berdly's Magic Damage").innerText = "Your Damage: " + convert( ((150000+((R * 250) + tp*1.25 + tr))*9 + (50000+(R*50)+(0.14*tp)+(tr/10))*7));
        document.getElementById("Berdly's Magic DPS").innerText = "Your DPS: " + convert( ((150000+((R * 250) + tp*1.25 + tr))*9 + (50000+(R*50)+(0.14*tp)+(tr/10))*7)/20);
        document.getElementById("Berdly's Magic Only Special").innerText = "Only Special DPS: " + convert(((50000+R*50+0.14*tp+tr/10)*7)/20);
    
        document.getElementById("King's Sword Projectile").innerText = "Projectile DPS: " + convert((240000+generalDamageAddition)*3/2.6);
    
        document.getElementById("Item 52").innerText = "Your DPS: " + convert(((225000+generalDamageAddition)*6 + (180000+generalDamageAddition)*5)/21);
        document.getElementById("Pizza Damage").innerText = "Your Damage: " + convert((225000+generalDamageAddition)*6 + (180000+generalDamageAddition)*5);
        document.getElementById("Pizza DPS").innerText = "Your DPS: " + convert(((225000+generalDamageAddition)*6 + (180000+generalDamageAddition)*5)/21);
        
        document.getElementById("Item 55").innerText = "Your DPS: " + convert((115000+generalDamageAddition)*2);
        document.getElementById("Killer Knife Damage").innerText = "Your Damage: " + convert((115000+generalDamageAddition)*2);
        document.getElementById("Killer Knife DPS").innerText = "Your DPS: " + convert((115000+generalDamageAddition)*2);
        document.getElementById("Killer Knife Beam").innerText = "Beam DPS: " + convert(115000+generalDamageAddition);
        
        document.getElementById("Item 58").innerText = "Your DPS: " + convert((225000+generalDamageAddition)*20/15);
        document.getElementById("Rose Damage").innerText = "Your Damage: " + convert((225000+generalDamageAddition)*20);
        document.getElementById("Rose DPS").innerText = "Your DPS: " + convert((225000+generalDamageAddition)*20/15);
        
        document.getElementById("Item 59").innerText = "Your DPS: " + convert((525000 + (tp + tr*2.5 + 250*R))/5);
        document.getElementById("Endo Head Damage").innerText = "Your Damage: " + convert(525000 + (tp + tr*2.5 + 250*R));
        document.getElementById("Endo Head DPS").innerText = "Your DPS: " + convert((525000 + (tp + tr*2.5 + 250*R))/5);
        
        document.getElementById("Item 61").innerText = "Your DPS: " + convert((45000+(0.3*tp)+(200*R))*20/12);
        document.getElementById("Epic Eye Damage").innerText = "Your Damage: " + convert((45000+(0.3*tp)+(200*R))*20);
        document.getElementById("Epic Eye DPS").innerText = "Your DPS: " + convert((45000+(0.3*tp)+(200*R))*20/12);
        
        document.getElementById("Item 64").innerText = "Your DPS: " + convert((225000 + generalDamageAddition) * 8/10);
        document.getElementById("SnatSansMinion Damage").innerText = "Your Damage: " + convert((225000 + generalDamageAddition) * 8);
        document.getElementById("SnatSansMinion DPS").innerText = "Your DPS: " + convert((225000 + generalDamageAddition) * 8/10);
        
        document.getElementById("Item 65").innerText = "Your DPS: " + convert(((750000+generalDamageAddition)*3 + (250000+generalDamageAddition)*6)/18);
        document.getElementById("Pyrokinesis Damage").innerText = "Your Damage: " + convert(((750000+generalDamageAddition)*3 + (250000+generalDamageAddition)*6));
        document.getElementById("Pyrokinesis DPS").innerText = "Your DPS: " + convert(((750000+generalDamageAddition)*3 + (250000+generalDamageAddition)*6)/18);
        
        document.getElementById("Item 68").innerText = "Your DPS: " + convert(((600000+generalDamageAddition) + (25000 + tr*0.5 + R*125 + tp*0.4)*2)/1.2);
        document.getElementById("String Master Damage").innerText = "Your Damage: " + convert(((600000+generalDamageAddition) + (25000 + tr*0.5 + R*125 + tp*0.4)*2));
        document.getElementById("String Master DPS").innerText = "Your DPS: " + convert(((600000+generalDamageAddition) + (25000 + tr*0.5 + R*125 + tp*0.4)*2)/1.2);
        document.getElementById("String Master String").innerText = "String DPS: " + convert(((35000+tr/2 + R * 125 + tp * 0.4)*2)/1.2);
        
        document.getElementById("Item 72").innerText = "Your DPS: " + convert((clamp(L,0,6000)*20 + 60 + generalDamageAddition)/0.9);
        document.getElementById("SansBoneSword Damage").innerText = "Your Damage: " + convert((clamp(L,0,6000)*20 + 60 + generalDamageAddition));
        document.getElementById("SansBoneSword DPS").innerText = "Your DPS: " + convert((clamp(L,0,6000)*20 + 60 + generalDamageAddition)/0.9);
        
        document.getElementById("Item 73").innerText = "Your DPS: " + convert((clamp(L,0,6000)*25 + 60 + generalDamageAddition)/0.9);
        document.getElementById("ErrorSansBoneSword Damage").innerText = "Your Damage: " + convert((clamp(L,0,6000)*25 + 60 + generalDamageAddition));
        document.getElementById("ErrorSansBoneSword DPS").innerText = "Your DPS: " + convert((clamp(L,0,6000)*25 + 60 + generalDamageAddition)/0.9);
        
        document.getElementById("Item 74").innerText = "Your DPS: " + convert((clamp(L,0,6000)*42 + 60 + generalDamageAddition)/1.2);
        document.getElementById("SoulBlaster Damage").innerText = "Your Damage: " + convert((clamp(L,0,6000)*42 + 60 + generalDamageAddition));
        document.getElementById("SoulBlaster DPS").innerText = "Your DPS: " + convert((clamp(L,0,6000)*42 + 60 + generalDamageAddition)/1.2);
    
        var Doombringer = document.getElementById("Item 75"); 
        if (L <= 6000) {
            Doombringer.innerText = "Your DPS: " + convert( (((L*50 + 200000+generalDamageAddition)*13+(L*50 + 200000+generalDamageAddition)*3.6))/15 );
            document.getElementById("Doombringer Damage").innerText = "Your Damage: " + convert( (((L*50 + 200000+generalDamageAddition)*13+(L*50 + 200000+generalDamageAddition)*3.6)));
            document.getElementById("Doombringer DPS").innerText = "Your DPS: " + convert( (((L*50 + 200000+generalDamageAddition)*13+(L*50 + 200000+generalDamageAddition)*3.6))/15 );
            document.getElementById("Doombringer Throwing").innerText = "Throwin DPS: " + convert(((L*50 + 200000+generalDamageAddition)*0.8*13+(L*50 + 200000+generalDamageAddition)*2.5)/15);
        } else {
            Doombringer.innerText = "Your DPS: " + convert( ((((L-6000)*50/4.5 + 500000+generalDamageAddition)*13+((L-6000)*50/4.5 + 200000+generalDamageAddition)*3.6))/15 );
            document.getElementById("Doombringer Damage").innerText = "Your Damage: " + convert( ((((L-6000)*50/4.5 + 500000+generalDamageAddition)*13+((L-6000)*50/4.5 + 200000+generalDamageAddition)*3.6)));
            document.getElementById("Doombringer DPS").innerText = "Your DPS: " + convert( ((((L-6000)*50/4.5 + 500000+generalDamageAddition)*13+((L-6000)*50/4.5 + 200000+generalDamageAddition)*3.6))/15 );
            document.getElementById("Doombringer Throwing").innerText = "Throwin DPS: " + convert((((L-6000)*50/4.5 + 500000+generalDamageAddition)*0.8*13+((L-6000)*50/4.5 + 500000+generalDamageAddition)*2.5)/15);
    
        }
        
        var d1 = 15000+250*R+tp+L*14+tr;
        var d2 = 15000+250*R+tp*1.3+L*12.5+tr;
        var d3 = 15000+250*R+tp+L*12.5+tr*10;
        
        document.getElementById("Item 81").innerText = "Your DPS: " + convert((d1 + d2 + d3 + (15000+L*29+tp+250 * R+ tr)) / (0.9*4));
        document.getElementById("Ancient Pumpblade Damage").innerText = "Your Damage: " +convert((d1 + d2 + d3 + (15000+L*29+tp+250 * R+ tr)));
        document.getElementById("Ancient Pumpblade DPS").innerText = "Your DPS: " + convert((d1 + d2 + d3 + (15000+L*29+tp+250 * R + tr)) / (0.9*4));
        document.getElementById("Ancient Pumpblade Pump Bomb").innerText = "Pump Bomb DPS: " + convert((d1 + d2 + d3 + (10000 + L*19 + tp + 250*R + tr*50)) / (0.9*4));
        document.getElementById("Ancient Pumpblade Pumpment Cut").innerText = "Pumpment DPS: " + convert((d1 + d2 + d3 + (15000 + L*1.9 + tp*0.2+25 * R + tr/10)*8) / (0.9*4));
        
        document.getElementById("Item 82").innerText = "Your DPS: " + convert((225000 + (tp*0.33)+(R*2500)+(tr*22.5))*3/15);
        document.getElementById("Rift Essense Damage").innerText = "Your Damage: " + convert((225000 + (tp*0.33)+(R*2500)+(tr*22.5))*3);
        document.getElementById("Rift Essense DPS").innerText = "Your DPS: " + convert((225000 + (tp*0.33)+(R*2500)+(tr*22.5))*3/15);
        document.getElementById("Rift Essense Wires").innerText = "Wires DPS: " + convert(((90000 + tr*9 + R * 1500 + tp * 0.25) *6)/15);
        document.getElementById("Rift Essense Explosion").innerText = "Explosion DPS: " + convert((500000+(R*250)+tp+(tr*50))/15);
        
        document.getElementById("Item 83").innerText = "Your DPS: " + convert((500000 + generalDamageAddition)*3/10);
        document.getElementById("Counter Bone Damage").innerText = "Your Damage: " + convert((500000 + generalDamageAddition)*3);
        document.getElementById("Counter Bone DPS").innerText = "Your DPS: " + convert((500000 + generalDamageAddition)*3/10);
        
        document.getElementById("Item 84").innerText = "Your DPS: " + convert((1000000 + generalDamageAddition)/20);
        document.getElementById("Kill Damage").innerText = "Your Damage: " + convert((1000000 + generalDamageAddition));
        document.getElementById("Kill DPS").innerText = "Your DPS: " + convert((1000000 + generalDamageAddition)/20);
        
        document.getElementById("Item 85").innerText = "Your DPS: " + convert((1000000 + generalDamageAddition)/20);
        document.getElementById("Snat Knife Damage").innerText = "Your Damage: " + convert((1000000 + generalDamageAddition));
        document.getElementById("Snat Knife DPS").innerText = "Your DPS: " + convert((1000000 + generalDamageAddition)/20);
        
        document.getElementById("Item 86").innerText = "Your DPS: " + convert((43750+(tp*0.05)+(R*150)+(tr/2))*10/5);
        document.getElementById("Bike Damage").innerText = "Your Damage: " + convert((43750+(tp*0.05)+(R*150)+(tr/2))*10);
        document.getElementById("Bike DPS").innerText = "Your DPS: " + convert((43750+(tp*0.05)+(R*150)+(tr/2))*10/5);
        
        document.getElementById("Item 87").innerText = "Your DPS: " + convert((1400000 + R * (206503/590) + tp * (137/118) + tr*9.099984746)/30);
        document.getElementById("Mask (v1) Damage").innerText = "Your Damage: " + convert((1400000 + R * (206503/590) + tp * (137/118) + tr*9.099984746));
        document.getElementById("Mask (v1) DPS").innerText = "Your DPS: " + convert((1400000 + R * (206503/590) + tp * (137/118) + tr*9.099984746)/30);
        
        var h1 = 700000+(tr*15)+(R*249.522 + tp*0.625477); var h2 = 740000 + (tr * 16) + (R * 19.5138034824) + (tp * 0.824236196518); var h3 = h1 * 2;
        document.getElementById("Item 88").innerText = "Your DPS: " + convert((h1 * 5 + h2*3 + h3)/(36));
        document.getElementById("Mask (v2) Damage").innerText = "Your Damage: " + convert((h1 * 5 + h2*3 + h3));
        document.getElementById("Mask (v2) DPS").innerText = "Your DPS: " + convert((h1 * 5 + h2*3 + h3)/(36));
        
        document.getElementById("Item 89").innerText = "Your DPS: " + convert((BossHP*0.015 + 1000000 + generalDamageAddition)/30);
        document.getElementById("Banana Damage").innerText = "Your Damage: " + convert(BossHP*0.015 + 1000000 + generalDamageAddition);
        document.getElementById("Banana DPS").innerText = "Your DPS: " + convert((BossHP*0.015 + 1000000 + generalDamageAddition)/30);
        
        document.getElementById("Item 90").innerText = "Your DPS: " + convert((7500+ tp*0.11315 + R*50+tr/2)*10/25);
        document.getElementById("Sans's Hat Damage").innerText = "Your Damage: " + convert((7500+ tp*0.11315 + R*50+tr/2)*10);
        document.getElementById("Sans's Hat DPS").innerText = "Your DPS: " + convert((7500+ tp*0.11315 + R*50+tr/2)*10/25);
        
        var d = (((tr*50)+(R*25000)+(L*100)+(tp*76.225)+100) * 0.9 /10) + ((tr*5)+(tp*2)+(R*650));
        document.getElementById("Item 91").innerText = "Your DPS: " + convert(d/10);
        document.getElementById("Head Throw Damage").innerText = "Your Damage: " + convert(d);
        document.getElementById("Head Throw DPS").innerText = "Your DPS: " + convert(d/10);
        
        
    
    }
}

var SkillNames = {
    0: ["Froggit","Description: "],
    1: ["Flowey", "Description: "],
    2: ["Papyrus", "Description: "],
    3: ["Undyne", "Description: "],
    4: ["Mettaton", "Description: "],
    5: ["Asgore", "Description: "],
    6: ["Sans", "Description: "],
    7: ["Chara", "Description: "],
    8: ["Betty", "Description: "],
    9: ["Magic Blast", "Description: "],
    10: ["Magic Rush", "Description: "],
    11: ["Rocket Fist", "Description: "],
}
        
function UpdateSkills() {
    var Damage = parseInt(document.getElementById("DmgSlider").value);
    var Reload = parseInt(document.getElementById("ReloadSlider").value);
    var R = parseInt(document.getElementById("Resets").value);
    var L = parseInt(document.getElementById("Levels").value);
    var tp = parseInt(document.getElementById("TP").value);
    var tr = 0;
    var BossHP = parseInt(document.getElementById("BossHp").value);
    if (document.getElementById("TR").checked) {
        tr = 10000;
        
    }
    
    var SkillDamage = [450000,45000,125000,670000,125000,500000,1500000,150000,300000,500000,100000,625000];
    var SkillCooldown = [25,40,35,35,35,35,45,35,35,35,35,35];

    var generalDamageAddition = (R * 250) + tp + tr;
    
    //fix some stuff
    if (Damage == 7) {
        Damage = 11;
    }
    if (BossHP > 80000000) {
        if (tr > 0) {
            BossHP = 80000000;
        } else {
            BossHP = 40000000;
        }
    }
    //manual calculations
    //froggit
    var d = (SkillDamage[0]*(1 + Damage/10) + generalDamageAddition); var r = (SkillCooldown[0]-(SkillCooldown[0]*(0.05*Reload)))
    document.getElementById("Skill 0").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[0][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[0][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //flowey
    d = (SkillDamage[1]*(1 + Damage/10) + generalDamageAddition)*6; r = (SkillCooldown[1]-(SkillCooldown[1]*0.05*Reload))
    document.getElementById("Skill 1").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[1][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[1][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //papyrus
    d = (SkillDamage[2]*(1 + Damage/10) + generalDamageAddition)*5; r = (SkillCooldown[2]-(SkillCooldown[2]*0.05*Reload));
    document.getElementById("Skill 2").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[2][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[2][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //undyne
    d = (SkillDamage[3]*(1 + Damage/10) + generalDamageAddition); r = (SkillCooldown[3]-(SkillCooldown[3]*0.05*Reload))
    document.getElementById("Skill 3").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[3][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[3][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //mettaton
    d = (SkillDamage[4]*(1 + Damage/10) + generalDamageAddition)*8; r = (SkillCooldown[4]-(SkillCooldown[4]*0.05*Reload));
    document.getElementById("Skill 4").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[4][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[4][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //asgore
    d = (SkillDamage[5]*(1 + Damage/10) + generalDamageAddition)*2; r = (SkillCooldown[5]-(SkillCooldown[5]*0.05*Reload))
    document.getElementById("Skill 5").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[5][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[5][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //sans
    d = (SkillDamage[6]*(1 + Damage/10)+generalDamageAddition); r = (SkillCooldown[6]-(SkillCooldown[6]*0.05*Reload))
    document.getElementById("Skill 6").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[6][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[6][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //chara
    d = (SkillDamage[7]*(1 + Damage/10) + generalDamageAddition)*7; r = (SkillCooldown[7]-(SkillCooldown[7]*0.05*Reload));
    document.getElementById("Skill 7").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[7][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[7][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //betty
    d = (SkillDamage[8]*(1 + Damage/10) + (R*7500+tp+tr+BossHP*0.05)); r = (SkillCooldown[8]-(SkillCooldown[8]*0.05*Reload)); 
    document.getElementById("Skill 8").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[8][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[8][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //magic blast
    d = (SkillDamage[9]*(1 + Damage/10) + generalDamageAddition); r = (SkillCooldown[9]-(SkillCooldown[9]*0.05*Reload));
    document.getElementById("Skill 9").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[9][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[9][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //magic rush
    d = (SkillDamage[10]*(1 + Damage/10) + generalDamageAddition)*5; r = (SkillCooldown[10]-(SkillCooldown[10]*0.05*Reload))
    document.getElementById("Skill 10").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[10][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[10][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    //rocket fist
    d = (SkillDamage[11]*(1 + Damage/10) + generalDamageAddition); r = (SkillCooldown[11]-(SkillCooldown[11]*0.05*Reload))
    document.getElementById("Skill 11").innerText = "Your DPS: " + convert(d/r);
    document.getElementById(SkillNames[11][0] + " Damage").innerText = "Your Damage: " + convert(d);
    document.getElementById(SkillNames[11][0] + " DPS").innerText = "Your DPS: " + convert(d/r);
    
}
