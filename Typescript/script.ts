class ColorSample{
	
}

class ColorRandomizer{

    Start()
    {
        setInterval(() => { this.Color(); }, 1000);
    }

    Color()
    {
        var color =

        "rgb("	+ Math.floor(Math.random() * 255) + ","
        	  	+ Math.floor(Math.random() * 255) + ","
              	+ Math.floor(Math.random() * 255) + 
            ")";

        document.getElementById("about").style.color = color;
    }
}


window.onload = () =>
{
	console.log("loaded");

    var obj = new ColorRandomizer();
    obj.Start();
};