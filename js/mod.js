let modInfo = {
	name: "Create Incremental",
	id: "nhug dkjldgsgrcinhgrv",
	author: "BanaCubed (Coding), and many people (Concepts)",
	pointsName: "$",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1024,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.2",
	name: "Rebirth of Buyables",
}

let changelog = `<h1>Changelog:</h1><br>
	check the forum thread Create Incremental at [galaxy.click/forum/thread/255] to see what is coming next<br><br>
	<h3>I will not make a changelog</h3><br>
		galaxy gives you the ability to view past updates so look there (if you aren't on galaxy go to [galaxy.click])`

let winText = `You are win! Congratulations on wasting your time! (Keep save for future updates)`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)


	// $ Layer
	if (hasUpgrade('U', 11)) gain = gain.add(1)

	if (hasUpgrade('U', 12)) gain = gain.times(4)
	if (hasUpgrade('U', 13) === true && hasUpgrade('U', 23) === false) gain = gain.times(player.points.add(5).log(5))
	if (hasUpgrade('U', 13) === true && hasUpgrade('U', 23) === true) gain = gain.times(player.points.add(3).log(3))
	if (hasUpgrade('U', 14)) gain = gain.times(2)
	if (hasUpgrade('U', 22)) gain = gain.times(player.points.pow(2).add(8).log(8).pow(0.5))
	if (hasUpgrade('U', 24)) gain = gain.times(1.5)
	if (hasUpgrade('U', 31)) gain = gain.times(player.points.add(10).log(10).pow(0.5))
	if (hasUpgrade('U', 41)) gain = gain.times(10)

	// The Machine
	if (getClickableState('U', 11)) gain = gain.times(4)
	if (getClickableState('U', 12)) gain = gain.times(3)
	if (getClickableState('U', 13)) gain = gain.times(2)

	if (hasUpgrade('U', 21)) gain = gain.pow(1.25)


	// R Layer
	gain = gain.times(player.R.effect)
	if (hasUpgrade('R', 11)) gain = gain.times(5)
	if (hasUpgrade('R', 14)) gain = gain.times(2)

	// Dunno were else to put this
	setLayerCurrencyToPoints("U");

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.R.points.gte(new Decimal("1e9"))
}

function setLayerCurrencyToPoints(layer) {
    let points = player.points;
    
    player[layer].points = new Decimal(points);
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}