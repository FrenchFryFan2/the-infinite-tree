let modInfo = {
	name: "Create Incremental",
	id: "DidYouKnowThatBulbasaurIsAPokemon",
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
	num: "1",
	name: "Money",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1</h3><br>
		- Added everything up to Hyper Rebirth (check the forum thread Create Incremental at [galaxy.click/forum/thread/255])`

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
	if (hasUpgrade('U', 11)) gain = gain.add(1)
	if (hasUpgrade('U', 12)) gain = gain.times(4)
	if (hasUpgrade('U', 13) === true && hasUpgrade('U', 23) === false) gain = gain.times(player.points.add(5).log(5))
	if (hasUpgrade('U', 13) === true && hasUpgrade('U', 23) === true) gain = gain.times(player.points.add(3).log(3))
	if (hasUpgrade('U', 14)) gain = gain.times(2)
	if (hasUpgrade('U', 21)) gain = gain.pow(1.25)
	if (hasUpgrade('U', 22)) gain = gain.times(player.points.pow(2).add(8).log(8))
	if (hasUpgrade('U', 24)) gain = gain.add(1)
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
	return player.points.gte(new Decimal("e280000000"))
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