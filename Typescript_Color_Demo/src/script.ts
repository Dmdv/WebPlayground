import * as $ from "jquery";

class ColorsBox {

	readonly timeout = 1000;
	readonly warningId = "#warning";
	readonly successId = "#success";
	readonly textId = "#colors";
	readonly tipId = "#tip";

	private edit = $(this.textId);
	private warning = $(this.warningId);
	private success = $(this.successId);
	private tip = $(this.tipId);

	private colorText = new ColorRandomizer();

	Init() {

		this.warning.hide();
		this.success.hide();

		var needInvoke = true;
		let timer : any;

		this.edit.on('keyup', () => {
			clearTimeout(timer);
			timer = setTimeout(() => {				
				this.UpdateText();
			}, this.timeout);
		});

		this.edit.on('keydown', () => {
			clearTimeout(timer);
		});

		// throttling

		// this.edit.on('input', () => {

		// 	if (!needInvoke){
		// 		return;
		// 	}

		// 	needInvoke = false;

		// 	timer = setTimeout(() => {

		// 		clearTimeout(timer);
		// 		timer = null;
		// 		needInvoke = true;

		// 		this.UpdateText();

		// 	}, this.timeout);
		// });
	}

	get colors():string {

		let value = this.edit.val().toString();
		if (value === ''){
			value = 'black';
		}
        return value;
    }

	private UpdateText() {

		console.log(this.colors);

		this.colorText.Paint(this.colors);

		let colors = this.colorText.Errors;

		if (colors.length > 0) {
			this.ShowWarning(colors.join(","));
			
		}
		else {
			this.HideWarning();
		}

		//this.ShowSuccess();
	}

	private HideWarning() {
		this.warning.fadeOut(this.timeout, 'swing');
		this.edit.toggleClass('alert-warning', false);
	}

	private ShowWarning(color:string) {
		let str =
		"<strong>Warning!</strong> The color you've entered: '" + color + 
		"' doesn't exist. Ignoring..."
		this.warning.html(str);
		this.warning.fadeIn(this.timeout, 'swing');
		this.edit.toggleClass('alert-warning', true);
	}

	private ShowSuccess() {
		this.tip.hide();
		this.success.fadeIn(this.timeout, 'swing');
		this.success.fadeOut(this.timeout, 'swing', () => {this.Tip(true)});
	}

	private Tip(show:boolean) {
		if (show) {
			this.tip.fadeIn(this.timeout, 'swing');
		}
		else {
			this.tip.fadeOut(this.timeout + 500, 'swing');
		}
	}
}

class Color {

	ok : boolean;
	value : string;

	constructor(value?: string) {
		this.parse(value);
	};

	parse(value: string) : this {

		if(typeof value == 'undefined' || value == null || value.length == 0) {
			this.ok = false;
			this.value = value;
			return this;
		};

		this.ok = Color.hasNamedColor(value);
		this.value = Color.getColor(value);

		return this;
	}

	static namedColors = {
		'transparent':'rgba(0, 0, 0, 0)',
		'yellow':'#ffff00',
		'aliceblue':'#F0F8FF','antiquewhite':'#FAEBD7','aqua':'#00FFFF','aquamarine':'#7FFFD4',
		'azure':'#F0FFFF','beige':'#F5F5DC','bisque':'#FFE4C4','black':'#000000','blanchedalmond':'#FFEBCD','blue':'#0000FF','blueviolet':'#8A2BE2',
		'brown':'#A52A2A','burlywood':'#DEB887','cadetblue':'#5F9EA0','chartreuse':'#7FFF00','chocolate':'#D2691E','coral':'#FF7F50',
		'cornflowerblue':'#6495ED','cornsilk':'#FFF8DC','crimson':'#DC143C','cyan':'#00FFFF','darkblue':'#00008B','darkcyan':'#008B8B','darkgoldenrod':'#B8860B',
		'darkgray':'#A9A9A9','darkgrey':'#A9A9A9','darkgreen':'#006400','darkkhaki':'#BDB76B','darkmagenta':'#8B008B','darkolivegreen':'#556B2F',
		'darkorange':'#FF8C00','darkorchid':'#9932CC','darkred':'#8B0000','darksalmon':'#E9967A','darkseagreen':'#8FBC8F','darkslateblue':'#483D8B',
		'darkslategray':'#2F4F4F','darkslategrey':'#2F4F4F','darkturquoise':'#00CED1','darkviolet':'#9400D3','deeppink':'#FF1493','deepskyblue':'#00BFFF',
		'dimgray':'#696969','dimgrey':'#696969','dodgerblue':'#1E90FF','firebrick':'#B22222','floralwhite':'#FFFAF0','forestgreen':'#228B22',
		'fuchsia':'#FF00FF','gainsboro':'#DCDCDC','ghostwhite':'#F8F8FF','gold':'#FFD700','goldenrod':'#DAA520','gray':'#808080','grey':'#808080',
		'green':'#008000','greenyellow':'#ADFF2F','honeydew':'#F0FFF0','hotpink':'#FF69B4','indianred':'#CD5C5C','indigo':'#4B0082','ivory':'#FFFFF0',
		'khaki':'#F0E68C','lavender':'#E6E6FA','lavenderblush':'#FFF0F5','lawngreen':'#7CFC00','lemonchiffon':'#FFFACD','lightblue':'#ADD8E6',
		'lightcoral':'#F08080','lightcyan':'#E0FFFF','lightgoldenrodyellow':'#FAFAD2','lightgray':'#D3D3D3','lightgrey':'#D3D3D3','lightgreen':'#90EE90',
		'lightpink':'#FFB6C1','lightsalmon':'#FFA07A','lightseagreen':'#20B2AA','lightskyblue':'#87CEFA','lightslategray':'#778899',
		'lightslategrey':'#778899','lightsteelblue':'#B0C4DE','lightyellow':'#FFFFE0','lime':'#00FF00','limegreen':'#32CD32','linen':'#FAF0E6',
		'magenta':'#FF00FF','maroon':'#800000','mediumaquamarine':'#66CDAA','mediumblue':'#0000CD','mediumorchid':'#BA55D3','mediumpurple':'#9370D8',
		'mediumseagreen':'#3CB371','mediumslateblue':'#7B68EE','mediumspringgreen':'#00FA9A','mediumturquoise':'#48D1CC','mediumvioletred':'#C71585',
		'midnightblue':'#191970','mintcream':'#F5FFFA','mistyrose':'#FFE4E1','moccasin':'#FFE4B5','navajowhite':'#FFDEAD','navy':'#000080','oldlace':'#FDF5E6',
		'olive':'#808000','olivedrab':'#6B8E23','orange':'#FFA500','orangered':'#FF4500','orchid':'#DA70D6','palegoldenrod':'#EEE8AA',
		'palegreen':'#98FB98','paleturquoise':'#AFEEEE','palevioletred':'#D87093','papayawhip':'#FFEFD5','peachpuff':'#FFDAB9','peru':'#CD853F',
		'pink':'#FFC0CB','plum':'#DDA0DD','powderblue':'#B0E0E6','purple':'#800080','red':'#FF0000','rosybrown':'#BC8F8F','royalblue':'#4169E1',
		'saddlebrown':'#8B4513','salmon':'#FA8072','sandybrown':'#F4A460','seagreen':'#2E8B57','seashell':'#FFF5EE','sienna':'#A0522D','silver':'#C0C0C0',
		'skyblue':'#87CEEB','slateblue':'#6A5ACD','slategray':'#708090','slategrey':'#708090','snow':'#FFFAFA','springgreen':'#00FF7F',
		'steelblue':'#4682B4','tan':'#D2B48C','teal':'#008080','thistle':'#D8BFD8','tomato':'#FF6347','turquoise':'#40E0D0','violet':'#EE82EE','white':'#FFFFFF'
	};

	static getColor(key: any): string {
		var lc = ('' + key).toLowerCase();
		return Color.hasNamedColor(lc)
			? (Color.namedColors as any)[lc]
			: key;
	};

	static hasNamedColor(key: any): boolean {
		var lc = ('' + key).toLowerCase();
		return Color.namedColors.hasOwnProperty(lc);
	};
}

class ColorRandomizer {

	private readonly textId = "about";
	
	private colors : string;
	private colorArray : Array<string>;
	private errorsArray : Array<string>;

	get Errors() : Array<string> {
		return this.errorsArray;
	}

    Paint(colors : string) {
		this.colors = colors;
		this.InitColors();
        this.PaintText();
	};
	
	InitColors() {

		this.errorsArray = new Array<string>();
		let array = this.colors.split(/[\s,;]+/);

		array = array
			.filter(x => x !== '')
			.filter(x => x.trim());
		
		this.colorArray = array.filter(str => {

			let color : Color = new Color(str);
			if (color.ok) {
				return color.value;
			}
			else {			
				this.errorsArray.push(color.value);
				console.log('Invaid color: ' + color.value);
			}
		});
	}

    PaintText() {

        let about = document.getElementById(this.textId);

        let text = about.innerText;

        while (about.firstChild) {
        	about.removeChild(about.firstChild);
        }

        let prevColor : string = '';

        for (var i = 0; i < text.length; i++){

        	let color : string = '';

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

    RandomColor(): string {
		return this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
    };
}


window.onload = () =>
{
	console.log("loaded");

	var box = new ColorsBox();
	box.Init();
};