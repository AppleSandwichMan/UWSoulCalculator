class Item {
    constructor(name, description = "", base = null, specials = [], options = {}) {
        this.name = name;
        this.description = description;
        
        this.original = {
            base,
            specials
        };
        this.New = structuredClone(this.original);
        this.options = {
            hideDamage:options.hideDamage ?? false,
            AddSpecial:options.AddSpecial ?? true,
            hideSpecial:options.hideSpecial ?? false,
            hideFirstSpecial:options.hideFirstSpecial ?? false,
            addHits:options.addHits ?? true,
            showBase:options.showBase ?? true,
            statsEffectAll:options.statsEffectAll ?? false,
            addAllSpecials:options.addAllSpecials ?? false,
        };

        this.stats = {
            totalDamage: 0,
            totalHits: 0,
            DPS: 0,
            hitDPS: 0,
            uses: 0,
            specials: {} // Named special stats only
        };
        // {"varName:{"type":"int,slider,bool", "value":,"method":,"min":,"max":}}
        Object.assign(this, options.variables);
        this.variables = (options.variables != undefined) ? Object.keys(options.variables) : [];

        this.calculateStats();
    }
    cleanName(name) {
        return name.replace(/[^a-zA-Z0-9]/g, "");
    }
    calculateStats() {
        const { base, specials } = this.New;
        const firstSpecial = specials.length > 0 ? specials[0] : null;

        for (const spec of specials) {
            const cleaned = this.cleanName(spec.name);
            const totalSpecialDamage = spec.damage * spec.hits;
            const totalSpecialHits = spec.hits;
            const cooldown = spec.cooldown;

            this.stats.specials[cleaned] = {
                name: spec.name,
                damage: spec.damage,
                hits: spec.hits,
                cooldown,
                totalDamage: totalSpecialDamage,
                totalHits: totalSpecialHits,
                DPS: totalSpecialDamage / cooldown,
                hitDPS: totalSpecialHits / cooldown
            };
        }

        if (!base || Object.keys(base).length === 0) return;
        
        var cycleTime = 0;
        if (this.options.AddSpecial) {
            cycleTime = firstSpecial ? firstSpecial.cooldown : base.cooldown;
        } else {
            cycleTime = base.cooldown;
        }

        const baseHits = base.hits * base.uses;
        const baseDamage = base.damage * (this.options.addHits ? baseHits : 1);
        
        var specialDamage = firstSpecial ? [firstSpecial.damage * firstSpecial.hits] : [0];
        var specialHits = firstSpecial ? [firstSpecial.hits] : [0];
        if (this.options.addAllSpecials) {
            specialDamage = specials.map(item => item.damage * item.hits);
            specialHits = specials.map(item => item.hits);
        }
        specialDamage = specialDamage.reduce((a, b) => a + b, 0);
        specialHits = specialHits.reduce((a, b) => a + b, 0);
        this.stats.totalHits = baseHits;
        this.stats.totalDamage = baseDamage;
        this.stats.uses = base.uses;
        
        if ((this.options.AddSpecial || this.options.addAllSpecials) && firstSpecial != null) {
            this.stats.totalDamage += specialDamage;
            this.stats.totalHits += specialHits;
            this.stats.uses += firstSpecial.uses;
        }
        
        this.stats.DPS = this.stats.totalDamage / cycleTime;
        this.stats.hitDPS = this.stats.totalHits / cycleTime;
    }
    updateElements() {
        function checkIfNull(item, value) {
            if (item != null) {
                item.innerText = value;
            }
        }
        checkIfNull(document.getElementById(this.name + " MiniDPS"),"Your DPS: " + convert(this.stats.DPS))
        checkIfNull(document.getElementById(this.name + " Damage"),"Your Damage: " + convert(this.New.base.damage));
        checkIfNull(document.getElementById(this.name + " Total Damage"), "Total Damage: " + convert(this.stats.totalDamage));
        checkIfNull(document.getElementById(this.name + " DPS"), "Your DPS: " + convert(this.stats.DPS));
    
        for (var i = 0; i < this.original.specials.length; i++) {
            var name = this.New.specials[i].name;
            checkIfNull(document.getElementById(this.name + " " + name + " Damage"),name + " Total Damage: " + convert(this.stats.specials[this.cleanName(name)].totalDamage));
            checkIfNull(document.getElementById(this.name + " " + name + " DPS"),name + " DPS: " + convert(this.stats.specials[this.cleanName(name)].DPS));
        } 
    }
}
var jokeDMG = -2.5e+238;

//Weapons
window.Items = {
    "Stick": new Item(
        "Stick",
        "Description: Its bark is worse than its bite",
        {"damage": 7, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "ToyKnife": new Item(
        "Toy Knife",
        "Description: Made of plastic. A rarity nowadays.",
        {"damage": 15, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "TornNotebook": new Item(
        "Torn Notebook",
        "Description: Contains illegible scrawls.",
        {"damage": 31, "cooldown": 1.2, "uses": 1, "hits": 1},
        []
    ),
    "BurntPan": new Item(
        "Burnt Pan",
        "Description: Damage is rather consistent.",
        {"damage": 40, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "EmptyGun": new Item(
        "Empty Gun",
        "Description: An antique revolver. It has no ammo.",
        {"damage": 50, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "WornDagger": new Item(
        "Worn Dagger",
        "Description: Perfect for cutting plants and vines.",
        {"damage": 100, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "AsgoreTrident": new Item(
        "Asgore Trident",
        "Description: The King's precious weapon",
        {"damage": 60, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "PhotoshopSword": new Item(
        "Photoshop Sword",
        "Description: ",
        {"damage": 200, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "RealKnife": new Item(
        "Real Knife",
        "Description: Here we are!",
        {"damage": 300, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "UFPapyrusBone": new Item(
        "UF Papyrus Bone",
        "Description: ",
        {"damage": 360, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "UFAsgoreTrident": new Item(
        "UF Asgore Trident",
        "Description: ",
        {"damage": 1000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "FreshSansEye": new Item(
        "Fresh Sans Eye",
        "Description: Fresh.",
        {"damage": 1400, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "NightmareTentacle": new Item(
        "Nightmare Tentacle",
        "Description: ",
        {"damage": 2400, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "CrossSansWeapon": new Item(
        "Cross Sans Weapon",
        "Description: ",
        {"damage": 3000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "NegataleSansBlaster": new Item(
        "Negatale Sans Blaster",
        "Description: ",
        {"damage": 3200, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "InkBrush": new Item(
        "Ink Brush",
        "Description: ",
        {"damage": 3750, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "HopeSword": new Item(
        "Hope Sword",
        "Description: ",
        {"damage": 4700, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "GasterHand": new Item(
        "Gaster Hand",
        "Description: ",
        {"damage": 5175, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "PapyrusBone": new Item(
        "Papyrus Bone",
        "Description: ",
        {"damage": 5550, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "BettyScythe": new Item(
        "Betty Scythe",
        "Description: Fear prowess",
        {"damage": 6000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "InkSansEye": new Item(
        "Ink Sans Eye",
        "Description: 3 is greater than 1.",
        {"damage": 2500, "cooldown": 1.5, "uses": 1, "hits": 3},
        []
    ),
    "OOF": new Item(
        "OOF",
        "Description: ",
        {"damage": 7000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "FatalErrorBone": new Item(
        "Fatal Error Bone",
        "Description: ",
        {"damage": 8000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "SoulKnife": new Item(
        "Soul Knife",
        "Description: ",
        {"damage": 7500, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "SanesGun": new Item(
        "Sanes Gun",
        "Description: SANESSS!!!!",
        {"damage": 9000, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "SoulTrident": new Item(
        "Soul Trident",
        "Description: ",
        {"damage": 10000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "ScytheXSoul": new Item(
        "Scythe XSoul",
        "Description: Sacred life",
        {"damage": 12000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "OrangeEye": new Item(
        "Orange Eye",
        "Description: Deals x2 DMG on non-moving bosses.",
        {"damage": 15000, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "LegendaryOrb": new Item(
        "Legendary Orb",
        "Description: ",
        {"damage": 21500, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "XGasterHand": new Item(
        "X Gaster Hand",
        "Description: ",
        {"damage": 22500, "cooldown": 3, "uses": 1, "hits": 1},
        []
    ),
    "GameMasterBlock": new Item(
        "Game Master Block",
        "Description: ",
        {"damage": 17000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "Temmie": new Item(
        "Temmie",
        "Description: ",
        {"damage": 21000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "TeslaKnife": new Item(
        "Tesla Knife",
        "Description: ",
        {"damage": 34000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "EpicBone": new Item(
        "Epic Bone",
        "Description: ",
        {"damage": 54000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "HardcoreKnife": new Item(
        "Hardcore Knife",
        "Description: ",
        {"damage": 69000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "SwitchBone": new Item(
        "Switch Bone",
        "Description: ",
        {"damage": 42500, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "BobSword": new Item(
        "Bob Sword.",
        "Description: ",
        {"damage": 50000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "HateKnife": new Item(
        "Hate Knife.",
        "Description: ",
        {"damage": 60000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "Gauntlet": new Item(
        "Gauntlet",
        "Description:",
        {"damage": 80000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "CODEWornDagger": new Item(
        "C.O.D.E Worn Dagger",
        "Description: ",
        {"damage": 85000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "HardcoreGameMasterBlock": new Item(
        "Hardcore Game Master Block",
        "Description: ",
        {"damage": 121000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "OOFBlaster": new Item(
        "OOF Blaster",
        "Description: Deals x3 more DMG if the target has 25% of hp or lower.",
        {"damage": 103330, "cooldown": 1.6, "uses": 1, "hits": 1},
        []
    ),
    "BiggerBlaster": new Item(
        "Bigger Blaster",
        "Description: ",
        {"damage": 150000, "cooldown": 4, "uses": 1, "hits": 1},
        []
    ),
    "CODEBettyScythe": new Item(
        "C.O.D.E Betty Scythe",
        "Description: ",
        {"damage": 155000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "FrogKnife": new Item(
        "Frog Knife",
        "Description: Croak",
        {"damage": 100000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "FasterBlaster": new Item(
        "Faster Blaster",
        "Description:",
        {"damage": 20000, "cooldown": 0.85, "uses": 1, "hits": 1},
        []
    ),
    "BraveryGauntlets": new Item(
        "Bravery Gauntlets",
        "Description:  Landing 10 Hits will enable Frenzy Mode: x2 Hit Speed.",
        {"damage": 50000, "cooldown": 0.75, "uses": 1, "hits": 1},
        [
            {
                name:"Frenzy Mode",
                damage:50000,
                hits:24,
                uses:1,
                cooldown:14
            }
        ],
        {AddSpecial:false, variables:{Upgraded:{
            type:"Bool",
            value:false,
            method(checked) {
                var eTitle = document.getElementById("Expanded Bravery Gauntlets").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "Bravery Gauntlets (upgraded)" : "Bravery Gauntlets");
                this.value = checked;

                UpdateStuff();
            }
        }}}
    ),
    "Chompy": new Item(
        "Chompy",
        "Description: Summons Chompy. Triggers an explosion if you re-activate it while being close to it (deals 25% more Damage).",
        {"damage": 365625, "cooldown": 6, "uses": 2, "hits": 1},
        [
            {
                name: "No Explosion",
                damage: 325000,
                hits: 1,
                uses: 1,
                cooldown: 3
            }    
        ],
        {hideDamage:true,AddSpecial:false}
    ),
    "UPDCODEWornDagger": new Item(
        "UPD C.O.D.E Worn Dagger",
        "Description: ",
        {"damage": 120000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "ErrorBlaster": new Item(
        "Error Blaster",
        "Description: ",
        {"damage": 150000, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "RealRealKnife": new Item(
        "Real Real Knife",
        "Description: real",
        {"damage": 70000, "cooldown": 0.25, "uses": 1, "hits": 1},
        []
    ),
    "UPDOOFBlaster": new Item(
        "UPD OOF Blaster",
        "Description: Deals x3 more DMG if the target has 25% of hp or lower.",
        {"damage": 138330, "cooldown": 1.6, "uses": 1, "hits": 1},
        []
    ),
    "OOFheadeye": new Item(
        "OOF head eye",
        "Description: A huge head provides a huge power (Deals x3 more DMG if EPICNESS is equipped and on use).",
        {"damage": 90000, "cooldown": 1.4, "uses": 1, "hits": 1},
        []
    ),
    "BerdlysMagic": new Item(
        "Berdly's Magic",
        "Description: Sends swirls with it's axe, and fires deadly projectiles with the spear.",
        {"damage": 150000, "cooldown": 2, "uses": 9, "hits": 1},
        [
            {
                name: "Only Special",
                damage: 50000,
                hits: 7,
                uses: 1,
                cooldown: 20
            }
        ]
    ),
    "CODESaber": new Item(
        "C.O.D.E Saber",
        "Description: ",
        {"damage": 230000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "DeadlyPan": new Item(
        "Deadly Pan",
        "Description: Damage is rather Deadly. Deadlier if held (2m Max).",
        {"damage": 400000, "cooldown": 1.9, "uses": 1, "hits": 1},
        [],
        {variables:{"Held Time":{
            type:"Float",
            min:0,
            max:1.5,
            value:0,
            method(val) {
                this.value = val;
                UpdateStuff();
            }
        }}}
    ),
    "Temmie'sStudy": new Item(
        "Temmie's Study",
        "Description: Temmie studies Rare Items. Event Items increase Damage by 25k and Range by 0.5.",
        {"damage": 350000, "cooldown": 2, "uses": 1, "hits": 1},
        [],
        {variables:{"Event items":{
            type:"Int",
            min:0,
            max:58,
            value:0,
            method(val) {
                this.value = val;
                UpdateStuff();
            }
        }}}
    ),
    "CODESaber": new Item(
        "C.O.D.E Saber",
        "Description: ",
        {"damage": 230000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "FortuneBlade": new Item(
        "Fortune Blade",
        "Description: Each hit increases your Luck 1% for 10 seconds.",
        {"damage": 100000, "cooldown": 0.6, "uses": 1, "hits": 1},
        []
    ),
    "Pizza": new Item(
        "Pizza",
        "Description: Weirdly enough, it doesn't seem to be for human consumption. Extra impact in hit target on Damage from any source.",
        {"damage": 225000, "cooldown": 3, "uses": 4, "hits": 1},
        [
            {
                name: "Cheese Blob",
                damage: 180000,
                hits: 5,
                uses: 1,
                cooldown: 15,
            }    
        ],
        {hideSpecial:true}
    ),
    "KingsSword": new Item(
        "King's Sword",
        "Description: Attacking while not moving will send x3 Projectiles instead.",
        {"damage": 240000, "cooldown": 0.9, "uses": 1, "hits": 1},
        [
            {
                name: "Projectile",
                damage: 240000,
                hits: 3,
                uses: 1,
                cooldown: 2.6
            }
        ],
        {AddSpecial:false}
    ),
    "KingPower": new Item(
        "King Power",
        "Description: King's prowess.",
        {"damage": 100000, "cooldown": 1.5, "uses": 1, "hits": 1},
        []
    ),
    "KillerKnife": new Item(
        "Killer Knife",
        "Description: Perfect for it's job...",
        {"damage": 115000, "cooldown": 1, "uses": 1, "hits": 1},
        [
            {
                name: "Laser",
                damage: 115000,
                hits: 1,
                uses: 0,
                cooldown: 1
            }
        ],
        {variables:{"C.O.D.E":{
            type:"Bool",
            value:false,
            method(checked) {
                var eTitle = document.getElementById("Expanded Killer Knife").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "C.O.D.E Killer Knife" : "Killer Knife");
                this.value = checked;

                UpdateStuff();
            }
        }}}
    ),
    "LegionHammer": new Item(
        "Legion Hammer",
        "Description: Summon a Hammer Zone (10 seconds CD)",
        {"damage": 150000, "cooldown": 1, "uses": 13, "hits": 1},
        [
            {
                name: "Special",
                damage: 150000,
                hits: 18,
                uses: 1,
                cooldown: 14
            }
        ]
    ),
    "DevilsKnife": new Item(
        "Devils Knife",
        "Description: ",
        {"damage": 300000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "PuppetScarf": new Item(
        "Puppet Scarf",
        "Description: Each consecutive hit reduces Cooldown by 0.1 seconds. Stacks up to 6 times, grants 100000 bonus Damage when fully stacked. Missing or waiting 3 seconds resets the stacks.",
        {"damage": 200000, "cooldown": 1.1, "uses": 1, "hits": 1},
        [],
        {variables:{"Boosted":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                UpdateStuff();
            }
        }}}
    ),
    "Rose": new Item(
        "Rose",
        "Description: Creates a Zone that damages Enemies inside of it.",
        {"damage": 225000, "cooldown": 1, "uses": 15, "hits": 1},
        [
            {
                name: "Special",
                damage: 225000,
                hits: 5,
                uses: 1,
                cooldown: 15
            }    
        ],
        {hideSpecial:false,variables:{"C.O.D.E":{
            type:"Bool",
            value:false,
            method(checked) {
                var eTitle = document.getElementById("Expanded Rose").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "C.O.D.E Rose" : "Rose");
                this.value = checked;

                UpdateStuff();
            }
        }}}
    ),
    "EndoHead": new Item(
        "Endo Head",
        "Description: Gives speed boost and Invincibility on hit, picking up the head will shorten it's Cooldown. \n(By 3 seconds)",
        {"damage": 525000, "cooldown": 5, "uses": 1, "hits": 3},
        [],
        {addHits:false,variables:{"Pickup Time":{
            type:"Int",
            value:3,
            min:0,
            max:3,
            method(val) {
                this.value = val;
                UpdateStuff();
            }
        }}}
    ),
    "MultiverseScythe": new Item(
        "Multiverse Scythe",
        "Description: Ink turned into a scythe :flushed:",
        {"damage": 345000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "BlackShard": new Item(
        "Black Shard",
        "Description: It shapes into a Weapon. You charge a swing, making your next attack have 2.5x(3.5x True Reset) range and 5.33(10.33x True Reset) AoE Damage (20 second CD).",
        {"damage": 300000, "cooldown":0.9,"uses":22,"hits":1},
        [
            {
                name:"Swoon",
                damage:300000*(5 + 1/3),
                hits:1,
                uses:1,
                cooldown:20,
            },
            {
                name:"Dagger",
                damage:0,
                hits:0.5,
                uses:1,
                cooldown:0.9,
            }
        ],
        {addAllSpecials:true,variables:{"Shard Black":{
            type:"Bool",
            value:false,
            method(checked) {
                var eTitle = document.getElementById("Expanded Black Shard").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "Black Shard (Shard Black)" : "Black Shard");
                this.value = checked;

                UpdateStuff();
            }
        }}}
    ),
    "EpicEye": new Item(
        "Epic Eye",
        "Description: what's 10+10?",
        {"damage": 45000, "cooldown": 12, "uses": 1, "hits": 20},
        []
    ),
    "AllBreaking": new Item(
        "All Breaking",
        "Description: Damage ignores 50% + 2 of Enemy's Defense and tags them. Hitting tagged enemies will deal bonus DMG.",
        {"damage": 3000000, "cooldown": 4.4, "uses": 6, "hits": 1.5},
        [],
        {hideDamage:true,addHits:false}
    ),
    "Cutter": new Item(
        "Cutter",
        "Description: Knife recharges every 1.5 seconds up to 6 times.",
        {"damage": 275000, "cooldown": 10.75, "uses": 7, "hits": 2},
        []
    ),
    "JusticeHammer": new Item(
        "Hammer of Justice",
        "Description: Using it while jumping will launch you upwards and preform a slam (15 seconds CD). All special slashes deal 1% of Target Max HP (Max is Base Damage)",
        {"damage": 350000, "cooldown":1.5,"uses":1,"hits":1},
        [
            {
                name: "combo",
                damage: 218750,
                hits: 4,
                uses: 2,
                cooldown: 4.5
            },
            {
                name: "Jump",
                damage: 700000,
                hits: 2,
                uses: 1,
                cooldown: 15
            },
        ],
        {hideFirstSpecial:true}
    ),
    "SnansBlade": new Item(
        "SnansBlade",
        "Description: ",
        {"damage": 355000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "UPDCODEBettyScythe": new Item(
        "UPD C.O.D.E Betty Scythe",
        "Description: ",
        {"damage": 355000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "SnatSansMinion": new Item(
        "SnatSansMinion",
        "Description: Snatcher's Gift: A Special Minion that was planned to be used in the fight against you. attaches to an enemy and spins against it, damaging 8 times. Doesn't let the enemy use shields during the spin. You're probably lucky he spared you from it.       (all 8 hits)",
        {"damage": 235000, "cooldown": 10, "uses": 1, "hits": 8},
        []
    ),
    "HorrorAxe": new Item(
        "Horror Axe",
        "Description: Slightly knockbacks hit Enemies. Sends a barrage of slashes(12s CD)",
        {"damage":400000, "cooldown":1, "uses":12,"hits":1},
        [
            {
                name: "barrage",
                damage: 25000,
                hits: 10,
                uses: 0,
                cooldown: 12
            }
        ]
    ),
    "Pyrokinesis": new Item(
        "Pyrokinesis",
        "Description: Sends a Fireball that on hit, deals tick Damage 3 times(Being near the enemy instantly sets them on fire). The third use will launch a Fire Fist instead (x3 Damage total)",
        {"damage": 250000, "cooldown": 18, "uses": 2, "hits": 3},
        [
            {
                name: "3x damage",
                damage: 750000,
                hits: 3,
                uses: 1,
                cooldown: 18
            }
        ],
        {hideSpecial:true}
    ),
    "DeityBlock": new Item(
        "Deity Block",
        "Description: ",
        {"damage": 435000, "cooldown": 1, "uses": 1, "hits": 0.9},
        []
    ),
    "EraserSaber": new Item(
        "EraserSaber",
        "Description: ",
        {"damage": 465000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "StringMaster": new Item(
        "String Master",
        "Description: Sends a string with each attack, landing them in an enemy will Damage them a little and restore 0.5% of your Max HP",
        {"damage": 600000, "cooldown": 1.2, "uses": 1, "hits": 1},
        [
            {
                name: "String",
                damage: 25000,
                hits: 2,
                uses: 0,
                cooldown: 1.2
            }
        ]
    ),
    "LONGSTICK": new Item(
        "LONGSTICK",
        "Description: ",
        {"damage": 350000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "KONGPOWER": new Item(
        "KONGPOWER",
        "Description: KING OF CHAOS SPECIAL ATTACK!!!",
        {"damage": 425000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "JOVILSCYTHE": new Item(
        "JOVILSCYTHE",
        "Description: ",
        {"damage": 750000, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "TheVoid": new Item(
        "The Void",
        "Description: ",
        {"damage": 766666, "cooldown": 1, "uses": 19, "hits": 1},
        [
            {
                name: "Void",
                damage:766666,
                cooldown:19,
                uses:1,
                hits:5,
            }
        ]
    ),
    "SansBoneSword": new Item(
        "SansBoneSword",
        "Description: LV increases the Damage by 20 (Max 6000 LV)",
        {"damage": 60, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "ErrorSansBoneSword": new Item(
        "ErrorSansBoneSword",
        "Description: LV increases the Damage by 25 (Max 6000 LV)",
        {"damage": 160, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "SoulBlaster": new Item(
        "SoulBlaster",
        "Description: LV increases the Damage by 42 (Max 6000 LV)",
        {"damage": 2000, "cooldown": 1.2, "uses": 1, "hits": 1},
        []
    ),
    "Doombringer": new Item(
        "Doombringer",
        "Description: Brings despair equal in power to it's user.",
        {"damage": 200000, "cooldown": 1.1, "uses": 13, "hits": 1},
        [
            {
                name: "Melee Special",
                damage: 240000,
                hits: 3,
                uses: 1,
                cooldown: 15
            },
            {
                name: "Ranged",
                damage: 660000/18,
                hits: 18,
                uses: 13,
                cooldown: 15
            }
        ],
    ), 
    "HammerofGratitude": new Item(
        "Hammer of Gratitude",
        "Description: Smash the ground, shocking caught Enemies. The Hammer grows bigger with every Gift.",
        {"damage": 25000, "cooldown": 2.5, "uses": 1, "hits": 1},
        [],
        {variables:{"Gifts":{
            type:"Int",
            value:1,
            min:1,
            max:1000000,
            method(val) {
                this.value = val;
                UpdateStuff();
            }
        }}}
    ),
    "DarkStick": new Item(
        "Dark Stick",
        "Description: Its dark is worse than its bite.",
        {"damage": 77777, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "Snowball": new Item(
        "Snowball",
        "Description: ",
        {"damage": 11000, "cooldown": 1.7, "uses": 1, "hits": 1},
        []
    ),
    "Toy": new Item(
        "Toy",
        "Description: ",
        {"damage": 7000, "cooldown": 0.8, "uses": 1, "hits": 1},
        []
    ),
    "AscentdentsStars": new Item(
        "Ascentdents Stars",
        "Description: ",
        {"damage": 25000, "cooldown": 3, "uses": 1, "hits": 4},
        []
    ),
    "ChristmasTree": new Item(
        "Christmas Tree",
        "Description: ",
        {"damage": 85000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "ChristmasSword": new Item(
        "Christmas Sword",
        "Description: ",
        {"damage": 270000, "cooldown": 0.9, "uses": 1, "hits": 1},
        []
    ),
    "AncientPumpblade": new Item(
        "Ancient Pumpblade",
        "Description: A blade that grows in strength with it's user. It was forged by the ancient blacksmiths of the Pump Kingdom.",
        {"damage": 15000, "cooldown": 2.7, "uses": 3, "hits": 1},
        [
            {
                name: "With Earth Slam",
                damage: 15000,
                hits: 4,
                uses: 0,
                cooldown: 3.6
            },
            {
                name: "With Pump Bomb",
                damage: 15000,
                hits: 4,
                uses: 0,
                cooldown: 3.6
            },
            {
                name: "With Pumpment Cut",
                damage: 15000,
                hits: 11,
                uses: 0,
                cooldown: 3.6
            }
        ],
        {hideDamage:true,AddSpecial:false,variables:{"Pumpkin Union":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                window.Items["DarkPumpblade"]["Pumpkin Union"].value = checked;
                UpdateStuff();
            }}, "Blades":{
            type:"Int",
            value:1,
            min:1,
            max:2,
            method(val) {
                this.value = val;
                window.Items["DarkPumpblade"]["Blades"].value = val;
                UpdateStuff();
            }}
        }}
    ),
    "DarkPumpblade": new Item(
        "Dark Pumpblade",
        "Description: An exact copy of the Ancient Pumpblade.",
        {"damage": 15000, "cooldown": 2.7, "uses": 3, "hits": 1},
        [
            {
                name: "With Earth Slam",
                damage: 15000,
                hits: 4,
                uses: 0,
                cooldown: 3.6
            },
            {
                name: "With Pump Bomb",
                damage: 15000,
                hits: 4,
                uses: 0,
                cooldown: 3.6
            },
            {
                name: "With Pumpment Cut",
                damage: 15000,
                hits: 12,
                uses: 0,
                cooldown: 3.6
            }
        ],
        {hideDamage:true,AddSpecial:false,variables:{"Pumpkin Union":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                window.Items["AncientPumpblade"]["Pumpkin Union"].value = checked;
                UpdateStuff();
            }}, "Blades":{
            type:"Int",
            value:1,
            min:1,
            max:2,
            method(val) {
                this.value = val;
                window.Items["AncientPumpblade"]["Blades"].value = val;
                UpdateStuff();
            }}
        }}
    ),
    "SteelFrost": new Item(
        "Steel Frost",
        "Description: Very Frosty. 30 extra Damage per LV(30K max) and 7500 extra Damage per Reset(300K Max). Throws a projectile that deals the same Damage as the Melee attack.",
        {"damage": 3000, "cooldown": 1, "uses": 1, "hits": 1},
        [
            {
                name: "Ranged",
                damage: 3000,
                hits: 1,
                uses: 0,
                cooldown: 1
            },
        ]
    ),
    "ChillingBlade": new Item(
        "Chilling Blade",
        "Description: Very Chill, so Chill, it gives 100 extra Damage per LV(100K Max) and 15000 extra Damage oer Reset(600K Max)",
        {"damage": 3000, "cooldown": 2, "uses": 1, "hits": 1},
        [
            {
                name: "Melee",
                damage: 3000,
                hits: 1,
                uses: 0,
                cooldown: 2
            },
        ]
    ),
    "MokeySword": new Item(
        "Mokey Sword",
        "Description: Executes near enemies. (execution Total Damage is how low the boss needs to be to be 1 tapped)",
        {"damage": 195000, "cooldown": 0.5, "uses": 1, "hits": 1},
        [
            {
                name:"Execution",
                "damage": 350000, 
                "cooldown": 1/0, 
                "uses": 0, 
                "hits": 1
            },
            
        ],
        {AddSpecial:false}
    ),
    "TwistedRoots": new Item(
        "Twisted Roots",
        "Description: Launch vines forward, stunning and damaging reached Enemies for 1.5 seconds. Jumping: Launch yourself at the nearest Enemy, hitting them if near enough. (Distance is just a estimate, likely not accurate)",
        {"damage": 17500, "cooldown": 24, "uses": 1, "hits": 1},
        [
            {
                name:"Air grapple",
                "damage": (17500/4 + 17500*1.6)/2, 
                "cooldown": 24, 
                "uses": 1, 
                "hits": 2
            },
            
        ],
        {AddSpecial:false, variables:{ "Distance":{
            type:"Float",
            value:50,
            min:4,
            max: 50,
            method(val) {
                this.value = val;
                UpdateStuff();
            }}, "Extra Roots":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                var eTitle = document.getElementById("Expanded Twisted Roots").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "Twisted Roots with extra roots" : "Twisted Roots");
                UpdateStuff();
            }
        }}}
    ),
    "RiftEssence": new Item(
        "Rift Essence",
        "Description: Getting the right patterns will trigger events. When Resetting, your extra TP is turned into LV's.",
        {"damage": 225000, "cooldown": 15, "uses": 1, "hits": 3},
        [
            {
                name:"Slashes",
                "damage": 225000, 
                "cooldown": 15, 
                "uses": 1, 
                "hits": 3
            },
            {
                name:"Explosion",
                "damage": 500000, 
                "cooldown": 15, 
                "uses": 1, 
                "hits": 1
            },
            {
                name:"Wires",
                "damage": 90000, 
                "cooldown": 15, 
                "uses": 1, 
                "hits": 6
            }
        ],
        {AddSpecial:false,showBase:false}
    ),
    "CounterBone": new Item(
        "Counter Bone",
        "Description: For 1.5 seconds, you will ignore the damage received and create a blast that deals 500k DMG up to 3 times.",
        {"damage": 500000, "cooldown": 10, "uses": 1, "hits": 3},
        [],
        {variables:{"Upgraded":{
            type:"Bool",
            value:false,
            method(checked) {
                var eTitle = document.getElementById("Expanded Counter Bone").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "Upgraded Counter Bone" : "Counter Bone");
                this.value = checked;
                UpdateStuff();
            }
        }}}
    ),
    "Kill": new Item(
        "Kill",
        "Description: Teleports behind nearest boss dealing 1M DMG and giving Invincibility during 3 seconds, doesn't give invincibility if you're out of range",
        {"damage": 1000000, "cooldown": 20, "uses": 1, "hits": 1},
        []
    ),
    "BearTrap": new Item(
        "Bear Trap",
        "Description: Place a trap for 11 seconds if it gets an Enemy the CD Resets to 2. You can undo it before it hits anything.",
        {"damage":250000,"cooldown":2,"uses":1,"hits":1},
        []
    ),
    "SnatKnife": new Item(
        "Snat Knife",
        "Description: IT'S NOT A RE_SKIL TRUST.",
        {"damage": 1000000, "cooldown": 20, "uses": 1, "hits": 1},
        []
    ),
    "Bike": new Item(
        "Bike",
        "Description: +10 Speed boost while it's equipped and extra 15 Speed boost when activated, it can hit multiple times and stun enemeies.",
        {"damage": 43750, "cooldown": 5, "uses": 1, "hits": 10},
        []
    ),
    "Bubble": new Item(
        "Bubble",
        "Description: Chant, wait 2.7 seconds... Bubble. Disables for 12 seconds when changing Combat. 60 second Global CD. Heals allies for 50% Max HP. Your Damage Resistance lowers by 50% for 5 seconds.",
        {"damage": 4000000, "cooldown": 60, "uses": 1, "hits": 1},
        []
    ),
    "Mask": new Item(
        "Mask",
        "Description: Hauriunt omnia",
        {"damage": 1400000, "cooldown": 15, "uses": 1, "hits": 1},
        [
            {
                name:"Hit2",
                "damage": 735000, 
                "cooldown": 42, 
                "uses": 0, 
                "hits": 3
            },
            {
                name:"Slam",
                "damage": 1400000, 
                "cooldown": 42, 
                "uses": 0, 
                "hits": 1
            }
        ],
        {hideSpecial:true,AddSpecial:false,addAllSpecials:true,variables:{"Upgraded":{
            type:"Bool",
            value:false,
            method(checked) {
                //change title and uses
                var eTitle = document.getElementById("Expanded Mask").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "Mask V2" : "Mask V1");
                eTitle.children[3].innerText = (checked ? "Used 4 times" : "Used 1 time");
                //change base damage, hit damage, and total damage
                var eDivs = document.getElementById("Expanded Mask").querySelectorAll(".EDivs");
                eDivs[0].children[0].innerText = (checked ? "Base Damage: " + window.convert(700000) : "Base Damage: " + window.convert(1400000));
                eDivs[0].children[1].innerText = (checked ? "Hit Damage: 9" : "Hit Damage: 1");
                eDivs[0].children[2].innerText = (checked ? "Total Damage: " + window.convert(7105000) : "Total Damage: " + window.convert(1400000));
                //change DPS
                eDivs[1].children[0].innerText = (checked ? "Base DPS: " + window.convert(7105000/42) : "Base DPS: " + window.convert(1400000/15));
                eDivs[1].children[1].innerText = (checked ? "Hit DPS: " + window.convert(9/42) : "Hit DPS: " + window.convert(1/15));
                this.value = checked;

                UpdateStuff();
            }
        }}}
    ),
    "AnormalBroom": new Item(
        "Anormal Broom",
        "Description: +10 Speed boost and damages nearby enemies while it's equipped. Activating it doubles Range and works while unequipped for 5 seconds.",
        {"damage": 43750, "cooldown": 10, "uses": 1, "hits": 10},
        [ 
            {
                name:"Shockwave",
                "damage": 100000, 
                "cooldown": 10, 
                "uses": 1, 
                "hits": 10
            }
        ], {AddSpecial:false,addAllSpecials:true}
    ),
    "Banana": new Item(
        "Banana",
        "Description: You place a spinning banana, after 4 seconds it explodes healing 40% of missing HP to nearby allies and dealing damage to nearby enemies",
        {"damage": 1000000, "cooldown": 30, "uses": 1, "hits": 1},
        []
    ),
    "CoolSkull": new Item(
        "Cool Skull",
        "You summon your Cool Friend, chomping Enemies on his path, increasing your Luck by 10%, and Attack by 2000 while it's active(Hitting at least one Enemy will increase the duration from 5 to 6.5)",
        {"damage": 300000, "cooldown": 42, "uses": 1, "hits": 6},
        []
    ),
    "TitanFountain": new Item(
        "Titan Fountain",
        "Description: Out of combat: Opens a Dark Fountain. In Combat: Opens a Titan Fountain, which can be activated. Spawns dark summons that target enemies. Jumping: Summons wings that increase your Damage Resistance while in range.",
        {"damage": 500000, "cooldown": 40, "uses": 1, "hits": 6},
        []
    ),
    "PocketCore": new Item(
        "Pocket Core",
        "Place a CORE Sentry, Damaging one target at a time with increasing Damage. True Reset will greatly increase Damage after 50 seconds. Taking damage will also wear down the Sewntry and getting out of it's range will destroy it as well.",
        {"damage": 25483356.5/119, "cooldown": 59.5, "uses": 1, "hits": 119},
        [],
        {hideDamage:true}
    ),
    "HackingPhone": new Item(
        "Hacking Phone",
        "Description: You gain Immunity for 3 seconds and slowly elevate, damaging Enemies in range.",
        {"damage": 366666, "cooldown": 20, "uses": 1, "hits": 6},
        []
    ),
    "DeathBeam": new Item(
        "Death Beam",
        "Description: Shoot a beam that takes your HP as long as it's active.",
        {"damage": 125000, "cooldown": 0.25, "uses": 1, "hits": 1},
        [],
        {variables:{"Beam Mark":{
            type:"Bool",
            value:false,
            method(checked) {
                var eTitle = document.getElementById("Expanded Death Beam").querySelector(".ETitle");
                eTitle.children[1].innerText = (checked ? "Death Beam (Beam Mark)" : "Death Beam");
                this.value = checked;
                UpdateStuff();
            }
        }}}
    ),
    "SanssHat": new Item(
        "Sans's Hat",
        "Description: The hat starts gathering a storm, which later explosion causes all nearby enemies to Freeze.",
        {"damage": 75000, "cooldown": 25, "uses": 1, "hits": 10},
        []
    ),
    "HeadThrow": new Item(
        "Head Throw",
        "Description: You throw your head away as a bomb which periodically increases size for 1 second and making it roll in the floor, taking 10% of your current HP. The base damage will depend on the HP that is taken away x3.",
        {"damage": 18, "cooldown": 10, "uses": 1, "hits": 1},
        [],
        {variables:{"Health":{
            type:"Int",
            min:100,
            max:Number.MAX_VALUE,
            value:100,
            method(val) {
                this.value = val;
                UpdateStuff(); 
            }
        }}}
    ),
    "FlamingStallion": new Item(
        "Flaming Stallion",
        "Description: +11 Speed boost and Jump Power while it's equipped and extra 75 Speed boost and Jump Power when activated, it can hit multiple times and stun enemies.",
        {"damage": 100000, "cooldown": 5, "uses": 1, "hits": 12},
        []
    ),
    "TorchingStallion": new Item(
        "Torching Stallion",
        "Description: +11 Speed boost and Jump Power while it's equipped spawns Flames when activated. (Assumes flames stay on enemy)",
        {"damage": 75000, "cooldown": 10.4, "uses": 1, "hits": 10},
        [
            {
                name: "Flames",
                "damage": 100000,
                "cooldown":10,
                "uses":0,
                "hits":22
            }
        ],
        {AddSpecial:false}
    ),
    "FOOLSCONTENT": new Item(
        "FOOL'S CONTENT",
        "Description: Gain 100 WalkSpeed and after 5 seconds, you explod dealing Damage to nearby enemies and get back to your original position with your HP prior activation(If the position is too far away, you won't get tped back unless out of combat)",
        {"damage": 1000000, "cooldown": 30, "uses": 1, "hits": 1},
        []
    ),
    "SantasBag": new Item(
        "Santa's Bag",
        "Description: Sends a Gift that Damages enemies for 1 LV = 120 Damage (1.2M Max) dashing backwards and giving you Immunity for a second. If it hits a Player, they will be attached to the gift until it opens, healing them for 10% of your Max HP(Receiver gets 20% of their Max HP at most) and also gain 1 second Immunity.",
        {"damage": 120, "cooldown": 5, "uses": 1, "hits": 1},
        []
    ),
    "Reindeer": new Item(
        "Reindeer",
        "Description: +12 Speed boost and +20 Jump Power while it's equipped and extra 45 Speed boost and Jump Power when activated, it can hit multiple times and stun enemies. Free fall is active while in mounted (Max 2.5 seconds).",
        {"damage": 50000, "cooldown": 12, "uses": 1, "hits": 14},
        []
    ),
    "Firecracker": new Item(
        "Firecracker",
        "Description: Launch Fireworks, detonating early if it hits an enemy. Deals AOE Damage and Hits 5 times.",
        {"damage": 25000, "cooldown": 14, "uses": 1, "hits": 1},
        [
            {
                name:"explosion",
                "damage": 25000, 
                "cooldown": 14, 
                "uses": 0, 
                "hits": 4
            }
        ],
        {hideSpecial:true}
    ),
    "Granite": new Item(
        "Granitè",
        "Description: Charge a beam, burning enemies hit by it. You're unable to die during the beam. First second of charge gives Invulnerability, afterwards you get 50% Damage Resistance instead.",
        {"damage": 125000, "cooldown": 22, "uses": 1, "hits": 10},
        [],
        {variables:{"Charge Time":{
            type:"Float",
            value:0,
            min:0,
            max: 4.5,
            method(val) {
                this.value = val;
                var eDivs = document.getElementById("Expanded Granitè").querySelectorAll(".EDivs");
                eDivs[0].children[1].innerText = ("Hit Damage: " + Math.round(2.45 * val + 9.5));
                eDivs[1].children[1].innerText = ("Hit DPS: " + window.convert(Math.round(2.45 * val + 9.5)/22));
                UpdateStuff();
            }
        }}}
    ),
    "Heartsun": new Item(
        "Heartsun",
        "Description: While in combat, Damage a nearby Enemy (15 Studs Range) every second. Armor's LV upgrades the Damage.",
        {"damage": 25000, "cooldown": 1, "uses": 1, "hits": 1},
        [],
        {variables:{"Level":{
            type:"Int",
            value:1,
            min:1,
            max:3,
            method(val) {
                this.value = val;
                UpdateStuff();
            }
        }}}
    ),
    "WintersCurse": new Item(
        "Winter's Curse",
        "Description: Cold.. so cold.. no one can survive, not even the light... Every 10 seconds, a hand will grip the nearest enemy.",
        {"damage": 400300, "cooldown": 10, "uses": 1, "hits": 1},
        []
    ),
    "ShockBand": new Item(
        "Shock Band",
        "Description: Enemies in a 20 radius range will be shocked. (20s CD)",
        {"damage": 500000, "cooldown": 10, "uses": 1, "hits": 1},
        []
    ),
    "JackPumpkin": new Item(
        "Jack Pumpkin",
        "Description: Spawns a Yummy pimpkin, but if you take too long to eat it, it will start to chase you instead, biting on the first thing it catches.",
        {"damage": 20000, "cooldown": 60, "uses": 1, "hits": 10},
        []
    ),

    "GrilledCheeseSandwich": new Item(
        "Grilled Cheese Sandwich",
        "Description: {grilled sandwich link} from {grilled sandwich trello link}",
        {"damage": jokeDMG, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "DEEZBONESWORD": new Item(
        "DEEZ BONE SWORD",
        "Description: {deez link} from {deez trello link}",
        {"damage": jokeDMG, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
    "LancelotsGun": new Item(
        "Lancelot's Gun",
        "Description: {lancelot link} from {lancelot trello link}",
        {"damage": jokeDMG, "cooldown": 1, "uses": 1, "hits": 1},
        []
    ),
}

//Skills
window.Skills = {
    Froggit: new Item(
        "Froggit",
        "Description: Jumps and creates a shockwave on landing.",
        {
            damage: 450000,
            cooldown:25,
            hits:1,
            uses:1
        }
    ),
    Flowey: new Item(
        "Flowey",
        "Description: Creates vines around you that leech off enemies, damaging them and healing a portion of your HP.",
        {
            damage: 75000,
            cooldown:40,
            hits:1,
            uses:1
        },
        [
            {
                name:"extra",
                damage:45000,
                cooldown:40,
                hits:6,
                uses:0,
            },

        ],
        {AddSpecial:true,hideSpecial:true}
    ),
    Flower: new Item(
        "Flower",
        "Description: The more Flowers you have, the more abilities you gain. (Add up the dps, really depends on what you do)",
        {
            damage: 300000/1.1,
            cooldown:13,
            hits:1,
            uses:1
        },
        [
            {
                name:"Aqua",
                damage:2500/1.1,
                cooldown:12,
                hits:10,
                uses:0,
            },
            {
                name:"Orange",
                damage:100000/1.1,
                cooldown:8,
                hits:1,
                uses:0,
            },
            {
                name:"Yellow",
                damage:75000/1.1,
                cooldown:4,
                hits:1,
                uses:0,
            },

        ],
        {variables:{"Flowery Fused":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                UpdateSkills();
            }
        },"Upgrades":{
            type:"Int",
            min:0,
            max:6,
            value:0,
            method(val) {
                this.value = val;
                UpdateSkills();
            }
        }}}
    ),
    Papyrus: new Item(
        "Papyrus",
        "Description: Reduces the Speed of enemies in range, dealing DMG.",
        {
            damage: 125000,
            cooldown:35,
            hits:5,
            uses:1
        }
    ),
    Undyne: new Item(
        "Undyne",
        "Description: Propels you in the air, then teleports to any Enemy in range dealing DMG. When you reach 0 HP, you will enter Undying mode boosting your Skill DMG x2 and getting all your HP back while slowly getting your HP drained.",
        {
            damage: 670000,
            cooldown:35,
            hits:1,
            uses:1
        }
    ),
    Gerson: new Item(
        "Gerson",
        "Description: ",
        {
            damage: 250000,
            cooldown:40,
            hits:4,
            uses:1
        },
        [
            {
                name:"Charged",
                damage:125000,
                cooldown:42.5,
                hits:4,
                uses:1,
            },
            {
                name:"Jump",
                damage:1000000,
                cooldown:40,
                hits:2,
                uses:1,
            }
        ],
        {AddSpecial:false}
    ),
    Mettaton: new Item(
        "Mettaton",
        "Description: Boosts Speed and gives Invincibility for 2 seconds, creating 8 shockwaves for 2 second.",
        {
            damage: 100000,
            cooldown:35,
            hits:8,
            uses:1
        }
    ),
    Asgore: new Item(
        "Asgore",
        "Description: Creates a blast after a slight charge-up. The blast increases its size every 0.05 seconds 9 times, boosting the blast and burning DMG by 10% every time its size increases. Passive: burning DMG increases if the target is not moving, and it lowers if the target is fast.",
        {
            damage: 500000,
            cooldown:35,
            hits:1,
            uses:1
        },
        [
            {
                name:"Burn",
                damage:100000,
                hits:5,
                uses:0,
                cooldown:35
            },
            {
                name:"Ranged",
                damage:298571.428571,
                hits:6,
                uses:0,
                cooldown:35
            }
        ],
        {hideFirstSpecial:true}
    ),
    Noelle: new Item(
        "Noelle",
        "Description: Targets nearest Enemy.",
        {
            damage: 400000,
            cooldown:20,
            hits:1,
            uses:1
        }
    ),
    SNoelle: new Item(
        "SNoelle",
        "Description: Targets nearest Enemy.",
        {
            damage: 210000,
            cooldown:40,
            hits:10,
            uses:1
        }
    ),
    Sans: new Item(
        "Sans",
        "Description: Teleports above enemy in range and creates a Gaster Blaster dealing DMG.",
        {
            damage: 1500000,
            cooldown:45,
            hits:1,
            uses:1
        }
    ),
    Chara: new Item(
        "Chara",
        "Description: Deals DMG multiple times after one second, stunning the Enemy.",
        {
            damage: 150000,
            cooldown:35,
            hits:7,
            uses:1
        }
    ),
    Betty: new Item(
        "Betty",
        "Description: Deals 300000 DMG plus 5% of the current Enemy's Health and gives Invincibility for 5 seconds (If it lands). If a nearby Enemy is executable the CD is refreshed and killing a boss will give you 25% extra XP.",
        {
            damage: 300000,
            cooldown:35,
            hits:1,
            uses:1
        }
    ),
    Gaster: new Item(
        "Gaster",
        "Description: ",
        {
            damage: 100000,
            cooldown:30,
            hits:10,
            uses:1
        },
        [
            {
                name:"Explosion",
                damage:200000,
                cooldown:30,
                hits:1,
                uses:0,
            }
        ],
        {hideSpecial:true}
    ),
    RoaringKnight: new Item(
        "Roaring Knight",
        "Description: ",
        {
            damage: 250000,
            cooldown:40,
            hits:11,
            uses:1
        },
        [
            {
                name:"Aerial",
                damage:212500,
                cooldown:40,
                hits:10,
                uses:1,
            }
        ],
        {AddSpecial:false}
    ),
    Flowery: new Item(
        "Flowery",
        "Description: While in the air, Create a path of Flowers depending on your WalkSpeed. During Combat: Jarona. If far from the Enemy, combo. (Omega form assumes you attempt to get it as fast as possible using flowery and do not get hit. To determine your own DPS, take the total damage and divide by the time it takes you to get omega form.)",
        {
            damage: 1000000/1.1,
            cooldown:5,
            hits:1,
            uses:1
        },
        [
            {
                name:"Combo",
                damage:1000000/1.1*0.233,
                cooldown:12,
                hits:10,
                uses:1,
            },
            {
                name:"Aerial",
                damage:800000/1.1,
                cooldown:13,
                hits:1,
                uses:1,
            }
        ],
        {AddSpecial:false, variables:{"Flower Fused":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                UpdateSkills();
            }
        },"Omega Form":{
            type:"Bool",
            value:false,
            method(checked) {
                this.value = checked;
                var eDivs = document.getElementById("Expanded Flowery").querySelectorAll(".EDivs");
                (Skills.Flowery["Omega Form"].value) ? eDivs[1].children[5].innerText = "Aerial Hit DPS: " + window.convert(20/2.5) : eDivs[1].children[5].innerText = "Aerial Hit DPS: " + window.convert(1/Skills.Flowery["Aerial time between hits"].value);
                UpdateSkills();
            }
        },"Aerial Hit Interval":{
            type:"Int",
            min:1,
            max:12,
            value:12,
            method(val) {
                this.value = val;
                var eDivs = document.getElementById("Expanded Flowery").querySelectorAll(".EDivs");
                if (!Skills.Flowery["Omega Form"].value) eDivs[1].children[5].innerText = "Aerial Hit DPS: " + window.convert(1/this.value);
                UpdateSkills();
            }
        }}}
    ),
    FallenOne: new Item(
        "Fallen One",
        "Description: You rise above all and make the sky fall.",
        {
            damage: 500000,
            cooldown:60,
            hits:14,
            uses:1
        }
    ),
    MagicBlast: new Item(
        "Magic Blast",
        "Description: Launches a high damaging blast.",
        {
            damage: 500000,
            cooldown:35,
            hits:1,
            uses:1
        }
    ),
    MagicRush: new Item(
        "Magic Rush",
        "Description: Launches 5 magic projectiles.",
        {
            damage: 100000,
            cooldown:35,
            hits:5,
            uses:1
        }
    ),
    RocketFist: new Item(
        "Rocket Fist",
        "Description: Launches a fist at high speeds that can collide with anything.",
        {
            damage: 625000,
            cooldown:35,
            hits:1,
            uses:1
        }
    ),
}