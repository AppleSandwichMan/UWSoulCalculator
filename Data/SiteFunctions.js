var config = window.Settings;

window.convert = function(n) {
    if (n === -2.5e238) return n;
    if (config.get("precision") === "Max") return Number(n).toLocaleString();
    
    const g = Math.round(n * 100) / 100;
    
    const intDigits = x =>
        (x === 0 ? 1 : Math.floor(Math.log10(Math.abs(Math.trunc(x)))) + 1);
    
    if (config.get("precision") >= intDigits(n)) {
        return g.toLocaleString();
    }
    
    const abs = Math.abs(g);
    if (abs < 1000) return g.toLocaleString();
    
    const suffixes = ["", "k", "m", "b", "t","q","Q"];
    const idx = Math.min(Math.floor(Math.log10(abs) / 3), suffixes.length - 1);
    
    const scaled = abs / Math.pow(1000, idx);
    
    const p = Math.max(1, Math.min(9, config.get("precision") | 0));
    let sig = Number(scaled.toPrecision(p));
    let formatSig = sig >= 1000 ? sig.toLocaleString() : sig;
    
    return (g < 0 ? "-" : "") + formatSig + suffixes[idx];
};
window.goBack = function() {
    const s = new Audio('./Sounds/Select.mp3').cloneNode();
    s.volume = config.get("volume") / 100;
    s.play();
    setTimeout(() => {
        window.location.href = "./Hub.html";
    }, 250);
}