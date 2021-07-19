let modInfo = {
	name: "The Illion Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.2.1",
	name: "The Balancing Update",
}

let changelog = `
                    <h1>Changelog:</h1><br><br>
	            v0.1.2.1 -- The Balancing Update<br>
		    - Balanced the illion upgrade 3<br>
		    - Balanced the G layer first milestone<br><br>
		    <h4>v0.1.2</h4><br>
		    - Fixed G layer cost a bit<br><br>
                    <h4>v0.1.1 - Upgrading Update</h4><br>
                    - Added 2 more illions upgrade<br>
		    - Added 4 types of googol milestones<br><br>
	            <h3>v0.1 - Basic Illions</h3><br>
		            - Added illions<br>
                    - Added types of googol<br>
                    - Added first illion upgrade
                `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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

	let gain = new Decimal(1)
	if (hasUpgrade('i', 11)) gain = gain.times(upgradeEffect('i', 11))
	if (hasUpgrade('i', 12)) gain = gain.cube(upgradeEffect('i', 12))
	if (hasUpgrade('i', 13)) gain = gain.cube(upgradeEffect('i', 13))
	if (hasMilestone("g", 0)) gain = gain.times(Math.sqrt(Math.log2(player.i.points + 3)))
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
	return player.g.points.gte(new Decimal(10))
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
