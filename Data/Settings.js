window.Settings = {
    default: {
        clicker:"Jevil",
        volume:50,
        precision:3,
    },

    current: {},

    load: function() {
        this.current = structuredClone(this.default);

        var save = localStorage.getItem("SiteSettings");
        if (!save) return;

        try {
            var parsed = JSON.parse(save);
            Object.assign(this.current, parsed);
        } catch (err) {
            console.log("Failed to load data :pensive:", err)
        }
    },

    save: function() {
        try {
            localStorage.setItem("SiteSettings",JSON.stringify(this.current));
        } catch (err) {
            console.log("Failed to save data :pensive:", err);
        }
    },

    get: function(key) {
        return this.current[key];
    },
    set: function(key, val) {
        this.current[key] = val;
        this.save()
    },
    reset() {
        this.current = structuredClone(this.default);
        this.save();
    }
}

window.Settings.load();