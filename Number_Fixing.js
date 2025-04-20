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
    UpdateSkills();
}

function clamp(val, min, max) {
    if (val < min) {return min};
    if (val > max) {return max};
    return val;
}

var Names = [
    ["Stick", 7, 0.9, 1, 0, "Description: Its bark is worse than its bite"],
    ["Toy Knife", 15, 0.8, 1, 0, "Description: Made of plastic. A rarity nowadays."],
    ["Torn Notebook", 31, 1.2, 1, 0, "Description: Contains illegible scrawls."],
    ["Burnt Pan", 40, 0.9, 1, 0, "Description: Damage is rather consistent."],
    ["Empty Gun", 50, 0.8, 1, 0, "Description: An antique revolver. It has no ammo."],
    ["Worn Dagger", 100, 0.8, 1, 0, "Description: Perfect for cutting plants and vines."],
    ["Asgore Trident", 60, 1, 1, 0, "Description: The King's precious weapon"],
    ["Faster Blaster", 125, 0.85, 1, 0, "Description: "],
    ["Photoshop Sword", 300, 0.9, 1, 0, "Description: "],
    ["UF Asgore Trident", 360, 1, 1, 0, "Description: "],
    ["Real Knife", 440, 0.8, 1, 0, "Description: Here we are!"],
    ["Fresh Sans Eye", 475, 1.5, 1, 0, "Description: Fresh."],
    ["Nightmare Tentacle", 1000, 0.9, 1, 0, "Description: "],
    ["Cross Sans Weapon", 1650, 0.9, 1, 0, "Description: "],
    ["Negatale Sans Blaster", 1850, 1.5, 1, 0, "Description: "],
    ["Ink Brush",2500, 0.9, 1, 0, "Description: "],
    ["Hope Sword", 3600, 0.9, 1, 0, "Description: "],
    ["Gaster Hand", 5000, 1.5, 1, 0, "Description: "],
    ["Papyrus Bone", 5250, 0.9, 1, 0, "Description: "],
    ["Betty Scythe", 5500, 1, 1, 0, "Description: Fear prowess"],
    ["Ink Sans Eye", 7500, 1.5, 3, 0, "Description: 3 is greater than 1."],
    ["OOF", 7000, 0.8, 1, 0, "Description: "],
    ["Fatal Error Bone", 8000, 0.9, 1, 0, "Description: "],
    ["Soul Knife",7500, 0.8, 1, 0, "Description: "],
    ["Sanes Gun", 9000, 1.5, 1, 0, "Description: SANESSS!!!!"],
    ["Soul Trident", 10000, 1, 1, 0, "Description: "],
    ["Scythe XSoul", 12000, 1, 1, 0, "Description: Sacred life"],
    ["Orange Eye", 15000, 1.5, 1, 0, "Description: Deals x2 DMG on non-moving bosses."],
    ["Legendary Orb", 21500, 0.8, 1, 0, "Description: "],
    ["Temmie", 21000, 0.9, 1, 0, "Description: "],
    ["Tesla Knife", 34000, 0.8, 1, 0, "Description: "],
    ["Epic Bone", 54000, 0.9, 1, 0, "Description: "],
    ["Hardcore Knife", 69000, 0.8, 1, 0, "Description: "],
    ["Game Master Block", 40000, 1, 1, 0, "Description: "],
    ["X Gaster Hand", 50000, 3, 1, 0, "Description: "],
    ["Switch Bone", 42500, 0.9, 1, 0, "Description: "],
    ["Bob Sword.", 50000, 0.9, 1, 0, "Description: "],
    ["Hate Knife.", 60000, 0.8, 1, 0, "Description: "],
    ["Gauntlet", 80000, 0.9, 1, 0, "Description:"],
    ["C.O.D.E Worn Dagger", 85000, 0.8, 1, 0, "Description: "],
    ["Hardcore Game Master Block", 121000, 1, 1, 0, "Description: "],
    ["OOF Blaster", 103330, 1.6, 1, 0, "Description: Deals x3 more DMG if the target has 25% of hp or lower."],
    ["Bigger Blaster", 150000, 4, 1, 0, "Description: "],
    ["C.O.D.E Betty Scythe", 155000, 1, 1, 0, "Description: "],
    ["Frog Knife", 100000, 0.8, 1, 0, "Description: Croak"],
    ["Bravery Gauntlets", 1100000, 14, 24, 0, "Description:  Landing 10 Hits will enable Frenzy Mode: x2 Hit Speed."],
    ["Chompy", 731250, 6, 2, 0, "Description: Summons Chompy. Triggers an explosion if you re-activate it while being close to it (deals 25% more Damage).", "No Explosion", 108330],
    ["Error Blaster", 80000, 1.5, 1, 0, "Description: "],
    ["UPD C.O.D.E Worn Dagger", 120000, 0.8, 1, 0, "Description: "],
    ["Real Real Knife", 70000, 0.25, 1, 0, "Description: real"],
    ["UPD OOF Blaster", 138330, 1.6, 1, 0, "Description: Deals x3 more DMG if the target has 25% of hp or lower."],
    ["OOF head eye", 90000, 1.4, 1, 0, "Description: A huge head provides a huge power (Deals x3 more DMG if EPICNESS is equipped and on use)."],
    ["Berdly's Magic", 1700000, 20, 15, 0, "Description: Sends swirls with it's axe, and fires deadly projectiles with the spear.", "Only Special", 17500],
    ["C.O.D.E Saber", 230000, 0.9, 1, 0, "Description: "],
    ["Fortune Blade", 100000, 0.6, 1, 0, "Description: Each hit increases your Luck 1% for 10 seconds."],
    ["Pizza", 2250000, 21, 11, "Description: Weirdly enough, it doesn't seem to be for human consumption. Extra impact in hit target on Damage from any source."],
    ["King's Sword", 240000, 0.9, 1, 0, "Description: Attacking while not moving will send x3 Projectiles instead.", "Projectile", 276920],
    ["King Power", 100000, 1.5, 1, 0, "Description: King's prowess."],
    ["Killer Knife", 230000, 1, 2, 0, "Description: Perfect for it's job...", "Beam" , 115000],
    ["Devils Knife", 300000, 1, 1, 0, "Description: "],
    ["Puppet Scarf", 300000, 0.6, 1, 0, "Description: Each consecutive hit reduces Cooldown by 0.1 seconds. Stacks up to 6 times, grants 100000 bonus Damage when fully stacked. Missing or waiting 3 seconds resets the stacks.   (stats based on boost)"],
    ["Rose", 4500000, 15, 20, 0, "Description: Creates a Zone that damages Enemies inside of it."],
    ["Endo Head", 525000, 5, 1, 0, "Description: Gives speed boost and Invincibility on hit, picking up the head will shorten it's Cooldown.\n\n(based on 5 second cooldown due to cooldown decrease when picking it up)"],
    ["Multiverse Scythe", 345000, 1, 1, 0, "Description: Ink turned into a scythe :flushed:"],
    ["Epic Eye", 900000, 12, 20, 0, "Description: what's 10+10?\n\n(Including all bones)"],
    ["All Breaking", 3000000, 4.4, 9, 0, "Description: Damage ignores 50% + 2 of Enemy's Defense and tags them. Hitting tagged enemies will deal bonus DMG."],
    ["Cutter", 2250000, 1.5, 6, 0, "Description: Knife recharges every 1.5 seconds up to 6 times.", "Constant attacking", 250000],
    ["SnansBlade", 355000, 0.9, 1, 0, "Description: "],
    ["UPD C.O.D.E Betty Scythe", 355000, 1, 1, 0, "Description: "],
    ["Bravery Gauntlets (Upgraded)", 4430000, 19, 40, 0, "Description:  Landing 12 Hits will enable Frenzy Mode: x2 Hit Speed."],
    ["SnatSansMinion", 1880000, 10, 8, 0, "Description: Snatcher's Gift: A Special Minion that was planned to be used in the fight against you. attaches to an enemy and spins against it, damaging 8 times. Doesn't let the enemy use shields during the spin. You're probably lucky he spared you from it.       (all 8 hits)"],
    ["Pyrokinesis", 3750000, 18, 9, 0, "Description: Sends a Fireball that on hit, deals tick Damage 3 times(Being near the enemy instantly sets them on fire). The third use will launch a Fire Fist instead (x3 Damage total)"],
    ["Deity Block", 435000, 1, 0.9, 1, 0, "Description: "],
    ["EraserSaber", 465000, 0.9, 1, 0, "Description: "],
    ["String Master", 650000, 1.2, 3, 0, "Description: Sends a string with each attack, landing them in an enemy will Damage them a little and restore 0.5% of your Max HP\n\n(Including Strings)", "String", 41660],
    ["LONGSTICK", 350000, 1, 1, 0, "Description: "],
    ["KONGPOWER", 425000, 1, 1, 0, "Description: KING OF CHAOS SPECIAL ATTACK!!!"],
    ["JOVILSCYTHE", 750000, 1, 1, 0, "Description: "],
    ["SansBoneSword", 60, 0.9, 1, 0, "Description: LV increases the Damage by 20 (Max 6000 LV)"],
    ["ErrorSansBoneSword", 160, 0.9, 1, 0, "Description: LV increases the Damage by 25 (Max 6000 LV)"],
    ["SoulBlaster", 2000, 1.2, 1, 0, "Description: LV increases the Damage by 42 (Max 6000 LV)"],
    ["Doombringer", 3320000, 15, 14, 0, "Description: Brings despair equal in power to it's user.", "Throwing", 160000],
    ["Snowball", 11000, 1.7, 1, 0, "Description: "],
    ["Toy", 7000, 0.8, 1, 0, "Description: "],
    ["Ascentdents Stars", 25000, 3, 1, 0, "Description: "],
    ["Christmas Tree", 85000, 0.9, 1, 0, "Description: "],
    ["Christmas Sword", 270000, 0.9, 1, 0, "Description: "],
    ["Ancient Pumpblade", 270000, 3.6, 4, 0, "Description: A blade that grows in strength with it's user. It was forged by the ancient blacksmiths of the Pump Kingdom.", "Pump Bomb", 15300, "Pumpment Cut", 45800],
    ["Dark Pumpblade", 270000, 3.6, 4, 0, "Description: An exact copy of the Ancient Pumpblade.", "Pump Bomb", 15300, "Pumpment Cut", 45800],
    ["Steel Frost", 3000, 1, 2, 0, "Description: Very Frosty. 30 extra Damage per LV(30K max) and 7500 extra Damage per Reset(300K Max). Throws a projectile that deals the same Damage as the Melee attack.", "Ranged", 1500],
    ["Chilling Blade", 3000, 2, 1, 0, "Description: Very Chill, so Chill, it gives 100 extra Damage per LV(100K Max) and 15000 extra Damage oer Reset(600K Max)", "Ranged", 3000],
    ["Rift Essence", 675000, 15, 3, 0, "Description: Getting the right patterns will trigger events. When Resetting, your extra TP is turned into LV's.", "Explosion", 33300, "Wires",36000],
    ["Counter Bone", 1500000, 10, 3, 0, "Description: For 1.5 seconds, you will ignore the damage received and create a blast that deals 500k DMG up to 3 times."],
    ["Kill", 1000000, 20, 1, 0, "Description: Teleports behind nearest boss dealing 1M DMG and giving Invincibility during 3 seconds, doesn't give invincibility if you're out of range"],
    ["Snat Knife", 1000000, 20, 1, 0, "Description: IT'S NOT A RE_SKIL TRUST."],
    ["Bike", 438000, 5, 10, 0, "Description: +10 Speed boost while it's equipped and extra 15 Speed boost when activated, it can hit multiple times and stun enemeies."],
    ["Mask (v1)", 1400000, 30, 1, 0, "Description: Hauriunt omnia"],
    ["Mask (v2)", 7120000, 36, 9, 0, "Description: Hauriunt omnia"],
    ["Banana", 1000000, 30, 1, 0, "Description: You place a spinning banana, after 4 seconds it explodes healing 40% of missing HP to nearby allies and dealing damage to nearby enemies\n(for percent damage, input a level. Each level is 20k HP, max 1B. Not being lazy)"],
    ["Sans's Hat", 75000, 25, 10, 0, "Description: The hat starts gathering a storm, which later explosion causes all nearby enemies to Freeze."],
    ["Head Throw", 10, 10, 1, 0, "Description: You throw your head away as a bomb which periodically increases size for 1 second and making it roll in the floor, taking 10% of your current HP. The base damage will depend on the HP that is taken away x3."],
    ["Flaming Stallion", 1200000, 5, 12, 0, "Description: +11 Speed boost and Jump Power while it's equipped and extra 75 Speed boost and Jump Power when activated, it can hit multiple times and stun enemies."],
    ["Santa's Bag", 120, 5, 1, 0, "Description: Sends a Gift that Damages enemies for 1 LV = 120 Damage (1.2M Max) dashing backwards and giving you Immunity for a second. If it hits a Player, they will be attached to the gift until it opens, healing them for 10% of your Max HP(Receiver gets 20% of their Max HP at most) and also gain 1 second Immunity."],
    ["Winter's Curse (LV2)", 300, 10, 1, 0, "Description: Cold.. so cold.. no one can survive, not even the light... Every 10 seconds, a hand will grip the nearest enemy."],
    ["Grilled Cheese Sandwich", 0, 0, 1, 0, "Description: {grilled sandwich link} from {grilled sandwich trello link}"],
    ["DEEZ BONE SWORD", 0, 0, 1, 0, "Description: {deez link} from {deez trello link}"],
    ["Lancelot's Gun", 0, 0, 1, 0,"Description: {lancelot link} from {lancelot trello link}"]
]

function UpdateStuff() {
    var R = parseInt(document.getElementById("Resets").value);
    var L = parseInt(document.getElementById("Levels").value);
    var tp = parseInt(document.getElementById("TP").value);
    var tr = 0;
    var BossHP = parseInt(document.getElementById("BossHp").value);
    var Boost = parseInt(document.getElementById("Boosts").value);
    if (document.getElementById("TR").checked) {
        tr = 10000;
    }
    var generalDamageAddition = (R * 250) + tp + tr;
    
    for (var i = 0; i < Names.length; i++) {
        Names[i][4] = (Names[i][1] + generalDamageAddition)*(Boost/100 + 1) / Names[i][2];
    }
    
    let convert = (n) => {
        let s = ["", "k", "m", "b", "t"];
        let mag = Math.floor(Math.log10(n));
        let index = Math.floor(mag / 3);
        let abbreviatedValue = parseFloat((n / Math.pow(1000, index)).toPrecision(3));
        return abbreviatedValue + s[index];
    };
    
    for (var i = 0; i < Names.length-3; i++) {
        document.getElementById(Names[i][0]).innerText = "Your DPS: " + convert(Names[i][4]);
        document.getElementById(Names[i][0] + " Damage").innerText = "Your Damage: " + convert((Names[i][1] + generalDamageAddition)*(Boost/100 + 1));
        document.getElementById(Names[i][0] + " DPS").innerText = "Your DPS: " + convert(Names[i][4]);
    }
    //Update specific stuff that has slightly different buffs or is just completely unique
    
    function updateUniques(ItemName,SpecialDMG,cooldown) {
        document.getElementById(ItemName).innerText = "Your DPS: " + convert(SpecialDMG*(Boost/100 + 1)/cooldown);
        document.getElementById(ItemName + " Damage").innerText = "Your Damage: " + convert(SpecialDMG*(Boost/100 + 1));
        document.getElementById(ItemName + " DPS").innerText = "Your DPS: " + convert(SpecialDMG*(Boost/100 + 1)/cooldown);
    }

    {
        updateUniques("Ink Sans Eye",2500*3+generalDamageAddition*3,1.5);
        
        updateUniques("Chompy",(325000+generalDamageAddition-tr+tr*20)*2.25,6);
        document.getElementById("Chompy No Explosion").innerText = "No Explosion DPS: " + convert((325000+generalDamageAddition+tr*20)/3);
        
        updateUniques("Bravery Gauntlets",(50000+ clamp(L,0,10000)*20 + tp*2 + R*500 + tr*2)*22,14);
        
        updateUniques("Berdly's Magic",((150000+((R * 250) + tp*1.25 + tr))*9 + (50000+(R*50)+(0.14*tp)+(tr/10))*7), 20)
        document.getElementById("Berdly's Magic Only Special").innerText = "Only Special DPS: " + convert(((50000+R*50+0.14*tp+tr/10)*7)/20);
        
        document.getElementById("King's Sword Projectile").innerText = "Projectile DPS: " + convert((240000+generalDamageAddition)*3/2.6);
        
        updateUniques("Pizza",(225000+generalDamageAddition)*6 + (180000+generalDamageAddition)*5,21);
        
        updateUniques("Killer Knife",(115000+generalDamageAddition)*2,1);
        document.getElementById("Killer Knife Beam").innerText = "Beam DPS: " + convert(115000+generalDamageAddition);
        
        updateUniques("Rose",(225000+generalDamageAddition)*20,15);
        
        updateUniques("Endo Head",525000 + (tp + tr*2.5 + 250*R),5);
        
        updateUniques("Epic Eye",(45000+(0.3*tp)+(200*R))*20,12);
        
        updateUniques("All Breaking",(400000+generalDamageAddition)*6 + (400000+generalDamageAddition)/2*3,4.4);

        updateUniques("Cutter",(375000 + generalDamageAddition) * 14,10.75);
        document.getElementById("Cutter Burst (ranged)").innerText = "Burst (ranged) DPS: " + convert((375000+generalDamageAddition)*7/10.75);
        
        updateUniques("Bravery Gauntlets (Upgraded)",(83000+ clamp(L,0,10000)*33.2 + tp*2 + R*500 + tr*2)*(4/3)*40,19);
        
        updateUniques("SnatSansMinion",(225000 + generalDamageAddition) * 8,10);
        
        updateUniques("Pyrokinesis",(750000+generalDamageAddition)*3 + (250000+generalDamageAddition)*6,18);
        
        updateUniques("String Master",(600000+generalDamageAddition) + (25000 + tr*0.5 + R*125 + tp*0.4)*2,1.2);
        document.getElementById("String Master String").innerText = "String DPS: " + convert(((35000+tr/2 + R * 125 + tp * 0.4)*2)/1.2);
        
        updateUniques("SansBoneSword",60 + clamp(L,0,6000)*20 + generalDamageAddition,0.9);
        
        updateUniques("ErrorSansBoneSword",160 + clamp(L,0,6000)*25 + generalDamageAddition,0.9);
        
        updateUniques("SoulBlaster",2000 + clamp(L,0,6000)*42 + generalDamageAddition,1.2);
        
        if (L <= 6000) {
            updateUniques("Doombringer",((L*50 + 200000+generalDamageAddition)*13+(L*50 + 200000+generalDamageAddition)*3.6),15);
            document.getElementById("Doombringer Throwing").innerText = "Throwin DPS: " + convert(((L*50 + 200000+generalDamageAddition)*0.8*13+(L*50 + 200000+generalDamageAddition)*2.5)/15);
        } else {
            updateUniques("Doombringer",(((L-6000)*50/4.5 + 500000+generalDamageAddition)*13+((L-6000)*50/4.5 + 200000+generalDamageAddition)*3.6),15);
            document.getElementById("Doombringer Throwing").innerText = "Throwin DPS: " + convert((((L-6000)*50/4.5 + 500000+generalDamageAddition)*0.8*13+((L-6000)*50/4.5 + 500000+generalDamageAddition)*2.5)/15);
        }
        
        var d1 = 15000+250*R+tp+L*14+tr;
        var d2 = 15000+250*R+tp*1.3+L*12.5+tr;
        var d3 = 15000+250*R+tp+L*12.5+tr*10;
        
        updateUniques("Ancient Pumpblade",d1 + d2 + d3 + (15000+L*29+tp+250 * R+ tr),3.6);
        document.getElementById("Ancient Pumpblade Pump Bomb").innerText = "Pump Bomb DPS: " + convert((d1 + d2 + d3 + (10000 + L*19 + tp + 250*R + tr*50)) / (0.9*4));
        document.getElementById("Ancient Pumpblade Pumpment Cut").innerText = "Pumpment DPS: " + convert((d1 + d2 + d3 + (15000 + L*1.9 + tp*0.2+25 * R + tr/10)*8) / (0.9*4));
        
        updateUniques("Dark Pumpblade",d1 + d2 + d3 + (15000+L*29+tp+250 * R+ tr),3.6);
        document.getElementById("Dark Pumpblade Pump Bomb").innerText = "Pump Bomb DPS: " + convert((d1 + d2 + d3 + (10000 + L*19 + tp + 250*R + tr*50)) / (0.9*4));
        document.getElementById("Dark Pumpblade Pumpment Cut").innerText = "Pumpment DPS: " + convert((d1 + d2 + d3 + (15000 + L*1.9 + tp*0.2+25 * R + tr/10)*8) / (0.9*4));
        
        updateUniques("Steel Frost",(1500 + clamp(30*L,0,30000) + clamp(7500*R,0,300000) + tp/2 + tr/(50/9))*2,1);
        document.getElementById("Steel Frost Ranged").innerText = "Ranged DPS: " + convert((1500 + clamp(30*L,0,30000) + clamp(7500*R,0,300000) + tp/2 + tr*50/9));

        updateUniques("Chilling Blade",(3000 + clamp(100*L,0,100000) + clamp(15000*R,0,600000) + tp/2 + tr/(100/33)),2);
        document.getElementById("Chilling Blade Ranged").innerText = "Ranged DPS: " + convert((3000 + clamp(100*L,0,100000) + clamp(15000*R,0,600000) + tp/2 + tr*10/33));

        updateUniques("Rift Essence",(225000 + (tp*0.33)+(R*2500)+(tr*22.5))*3,15);
        document.getElementById("Rift Essence Wires").innerText = "Wires DPS: " + convert(((90000 + tr*9 + R * 1500 + tp * 0.25) *6)/15);
        document.getElementById("Rift Essence Explosion").innerText = "Explosion DPS: " + convert((500000+(R*250)+tp+(tr*50))/15);
        
        updateUniques("Counter Bone",(500000 + generalDamageAddition)*3,10);
        
        updateUniques("Kill",1000000 + generalDamageAddition,20);
        
        updateUniques("Snat Knife",1000000 + generalDamageAddition,20);
        
        updateUniques("Bike",(43750+(tp*0.05)+(R*150)+(tr/2))*10,5);
        
        updateUniques("Mask (v1)",(1400000 + R * (206503/590) + tp * (137/118) + tr*9.099984746),30);
        
        var h1 = 700000+(tr*15)+(R*249.522 + tp*0.625477); var h2 = 740000 + (tr * 16) + (R * 19.5138034824) + (tp * 0.824236196518); var h3 = h1 * 2;
        updateUniques("Mask (v2)",h1 * 5 + h2*3 + h3,36);
        
        updateUniques("Banana",BossHP*0.015 + 1000000 + generalDamageAddition,30);
        
        updateUniques("Sans's Hat",(7500+ tp*0.11315 + R*50+tr/2)*10,25);
        
        updateUniques("Head Throw",(((tr*50)+(R*25000)+(L*100)+(tp*76.225)+100) * 0.9 /10) + ((tr*5)+(tp*2)+(R*650)),10);
        
        updateUniques("Flaming Stallion",(100000+(tp*0.125)+(R*175)+(tr*4/3))*12,5);
        
        updateUniques("Santa's Bag",clamp(120*L,0,1200000)+tp*0.5+clamp(R*1500,0,15000),5);
        
        
        updateUniques("Winter's Curse (LV2)",(200000 + clamp(L*150,0,999900) + tp/2)*2,10);
    }
}

function UpdateSkills() {
    new Audio("https://codehs.com/uploads/4185869bfce22458c9e6ad1844624eb0").play();
    var SkillNames = [
        ["Froggit", 450000, 25, 1, 250, "Description: Jumps and creates a shockwave on landing."],
        ["Flowey", 45000, 40, 6, 250, "Description: Creates vines around you that leech off enemies, damaging them and healing a portion of your HP."],
        ["Papyrus", 125000, 35, 5, 250, "Description: Reduces the Speed of enemies in range, dealing DMG."],
        ["Undyne", 670000, 35, 1, 250,  "Description: Propels you in the air, then teleports to any Enemy in range dealing DMG. When you reach 0 HP, you will enter Undying mode boosting your Skill DMG x2 and getting all your HP back while slowly getting your HP drained."],
        ["Mettaton", 125000, 35, 8, 250, "Description: Boosts Speed and gives Invincibility for 2 seconds, creating 8 shockwaves for 2 second."],
        ["Asgore", 500000, 35, 5, 250, "Description: Creates a blast after a slight charge-up. The blast increases its size every 0.05 seconds 9 times, boosting the blast and burning DMG by 10% every time its size increases. Passive: burning DMG increases if the target is not moving, and it lowers if the target is fast."],
        ["Noelle", 400000, 20, 1, 250, "Description: Targets nearest Enemy."],
        ["Sans", 1500000, 45, 1, 250, "Description: Teleports above enemy in range and creates a Gaster Blaster dealing DMG."],
        ["Chara", 150000, 35, 7, 250, "Description: Deals DMG multiple times after one second, stunning the Enemy."],
        ["Betty", 300000, 35, 1, 7500, "Description: Deals 300000 DMG plus 4% (5%) of the current Enemy's Health and gives Invincibility for 5 seconds (If it lands). If a nearby Enemy is executable the CD is refreshed and killing a boss will give you 25% extra XP."],
        ["SNoelle", 210000, 40, 10, 250, "Description: Targets nearest Enemy."],
        ["Magic Blast", 500000, 35, 1, 250, "Description: Launches a high damaging blast."],
        ["Magic Rush",100000, 35, 5, 250,  "Description: Launches 5 magic projectiles."],
        ["Rocket Fist", 625000, 35, 1, 250, "Description: Launches a fist at high speeds that can collide with anything."],
    ];
    
    var Damage = parseInt(document.getElementById("DmgSlider").value);
    var Reload = parseInt(document.getElementById("ReloadSlider").value);
    var R = parseInt(document.getElementById("Resets").value);
    var L = parseInt(document.getElementById("Levels").value);
    var tp = parseInt(document.getElementById("TP").value);
    var tr = 0;
    var Boost = parseInt(document.getElementById("Boosts").value);
    var BossHP = parseInt(document.getElementById("BossHp").value);
    if (document.getElementById("TR").checked) {
        tr = 10000;
    }
    
    var generalDamageAddition = tp + tr;
    
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
    
    for (var skill of SkillNames) {
        var d = (skill[1]*(1 + Damage/10) + generalDamageAddition + skill[4]*R)*skill[3]*(Boost/100 + 1);
        var r = (skill[2]-(skill[2]*(0.05*Reload)));
        
        var skill1 = document.getElementById(skill[0]);
        if (skill1 != null) {
            skill1.innerText = "Your DPS: " + convert(d/r);
        }
        var skill2 = document.getElementById(skill[0] + " Damage");
        if (skill2 != null) {
            skill2.innerText = "Your Damage: " + convert(d);
        }
        var skill3 = document.getElementById(skill[0] + " DPS");
        if (skill3 != null) {
            skill3.innerText = "Your DPS: " + convert(d/r);
        }
    }
    
    var d; var r;
    //manual calculations
    function UpdateSkill(skillName,d,r) {
        document.getElementById(skillName).innerText = "Your DPS: " + convert(d*(Boost/100 + 1)/r);
        document.getElementById(skillName + " Damage").innerText = "Your Damage: " + convert(d*(Boost/100 + 1));
        document.getElementById(skillName + " DPS").innerText = "Your DPS: " + convert(d*(Boost/100 + 1)/r);
    }
    d = (SkillNames[10][1]*(1 + Damage/10) + 125*R + tr + tp*0.01)*10; 
    r = (SkillNames[10][2]-(SkillNames[10][2]*0.05*Reload));
    UpdateSkill("SNoelle",d,r);
    
    //asgore
    d = (SkillNames[5][1]*(1 + Damage/10) + generalDamageAddition + R*250);
    d += d*1.9;
    r = (SkillNames[5][2]-(SkillNames[5][2]*0.05*Reload))
    UpdateSkill("Asgore",d,r);
    //betty
    d = (SkillNames[9][1]*(1 + Damage/10) + (R*7500+tp+tr+BossHP*0.05));
    r = (SkillNames[9][2]-(SkillNames[9][2]*0.05*Reload));
    UpdateSkill("Betty",d,r);
}