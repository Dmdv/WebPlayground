class ColorSample{
	
}

class ColorRandomizer{

    Start() {
    	//this.Color();
        setInterval(() => { this.Color(); }, 1000);
    };

    RandomColor(){

    	return "rgb("
    		+ Math.floor(Math.random() * 255) + ","
        	+ Math.floor(Math.random() * 255) + ","
            + Math.floor(Math.random() * 255) +
        ")";
    };

    Color(){

        let about = document.getElementById("about");

        let text = about.innerText;

        while (about.firstChild) {
        	about.removeChild(about.firstChild);
        }

        var prevColor = this.RandomColor();

        for (var i = 0; i < text.length; i++){

        	let color : string;

        	while (color == prevColor){
        		color = this.RandomColor();
        	}

        	prevColor = color;

        	let ch = text.charAt(i);
        	let el = document.createElement("span");

        	el.innerHTML = ch;
        	el.style.color = color;

        	about.appendChild(el);
        }
    }
}


window.onload = () =>
{
	console.log("loaded");

    var obj = new ColorRandomizer();
    obj.Start();
};