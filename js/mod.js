let modInfo = {
	name: "Click n Win",
	id: "mymod",
	author: "TheGreatHoho",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.02",
	name: "First Update",
}

let changelog = `<h1>Changelog:</h1><br>
         <br><br>
         <h3>v0.02</h3><br>
		- Added 3 more upgrades.<br>
		- Added one more milestone.<br>
		- Added one more challenge. (They all work now)<br>
		<br><br>
		<h3>v0.01</h3><br>
		- Added the main 9 upgrades.<br>
		- Added 4 win milestones.<br>
		- Added magical field, a place where you can buy items.<br>
		- Added 3 challenges. (2nd one may not be doable at the moment.)<br>
		- Added two and a half rows of achievements.`

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
	if (hasUpgrade('w', 14)) gain = gain.times(upgradeEffect('w',14))
	if (hasUpgrade('w', 11)) gain = gain.times(upgradeEffect('w',11))
	if (hasUpgrade('w', 21)) gain = gain.times(4)
	if (hasUpgrade('w', 31)) gain = gain.times(8)
	if (hasUpgrade('w', 12)) gain = gain.times(upgradeEffect('w', 12))
	if (hasUpgrade('w', 22)) gain = gain.times(upgradeEffect('w', 22))
	if (hasUpgrade('w', 32)) gain = gain.times(upgradeEffect('w', 32))
	if (hasAchievement('A',23)) gain = gain.times(achievementEffect('A',23))
	if (hasChallenge("m",21)) gain = gain.pow(1.08)
	if (inChallenge("m",21)) gain = gain.pow(0.1)
	if (inChallenge("m",21)) gain = gain.mul(Math.sin(player.w.points)).add(1)
	if (inChallenge("m",13)) {
		if(hasUpgrade("w",11))gain = gain.div(100)	
		if(hasUpgrade("w",12))gain = gain.div(100)
		if(hasUpgrade("w",13))gain = gain.div(100)
		if(hasUpgrade("w",21))gain = gain.div(100)
		if(hasUpgrade("w",22))gain = gain.div(100)
		if(hasUpgrade("w",23))gain = gain.div(100)
		if(hasUpgrade("w",31))gain = gain.div(100)
		if(hasUpgrade("w",32))gain = gain.div(100)
		if(hasUpgrade("w",33))gain = gain.div(100)
	}
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

function calculatetimeplayed() {
	return Math.log10(Math.log10(Math.sqrt(player.timePlayed)) + 10) 
}

