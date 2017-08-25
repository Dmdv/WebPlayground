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
    }, o.prototype.Color = function() {
        var o = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
        document.getElementById("about").style.color = o;
    }, o;
}();

window.onload = function() {
    console.log("loaded"), new ColorRandomizer().Start();
};