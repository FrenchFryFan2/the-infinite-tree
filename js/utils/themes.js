// ************ Themes ************
var themes = ["default", "aqua", "verdant", "pyro", "arcane", "light", "void"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	pyro: {
		1: "#ffbfbf",
		2: "#bf8f8f",
		3: "#7f5f5f",
		color: "#ffbfbf",
		points: "#ffdfdf",
		locked: "#c4a7a7",
		background: "#3f0000",
		background_tooltip: "rgba(31, 0, 0, 0.75)",
	},
	arcane: {
		1: "#dfbfff",
		2: "#a78fbf",
		3: "#6f5f7f",
		color: "#dfbfff",
		points: "#efdfff",
		locked: "#b3a7c4",
		background: "#1f003f",
		background_tooltip: "rgba(31, 0, 31, 0.75)",
	},
	verdant: {
		1: "#bfffbf",
		2: "#8fbf8f",
		3: "#5f7f5f",
		color: "#bfffbf",
		points: "#dfffdf",
		locked: "#a7c4a7",
		background: "#003f00",
		background_tooltip: "rgba(0, 31, 0, 0.75)",
	},
	void: {
		1: "#888888",
		2: "#777777",
		3: "#666666",
		color: "#777777",
		points: "#888888",
		locked: "#886666",
		background: "#000000",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	light: {
		1: "#000000",
		2: "#404040",
		3: "#808080",
		color: "#505050",
		points: "#000000",
		locked: "#a07070",
		background: "#e0e0e0",
		background_tooltip: "rgba(255, 255, 255, 0.75)",
	},
}
function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
