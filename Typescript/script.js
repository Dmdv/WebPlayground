var ColorSample = function() {
    function o() {}
    return o;
}(), ColorRandomizer = function() {
    function o() {}
    return o.prototype.Start = function() {
        var o = this;
        setInterval(function() {
            o.Color();
        }, 1e3);
    }, o.prototype.RandomColor = function() {
        return "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
    }, o.prototype.Color = function() {
        for (var o = document.getElementById("about"), r = o.innerText; o.firstChild; ) o.removeChild(o.firstChild);
        for (var t = this.RandomColor(), n = 0; n < r.length; n++) {
            for (var e = void 0; e == t; ) e = this.RandomColor();
            t = e;
            var a = r.charAt(n), l = document.createElement("span");
            l.innerHTML = a, l.style.color = e, o.appendChild(l);
        }
    }, o;
}();

window.onload = function() {
    console.log("loaded"), new ColorRandomizer().Start();
};