let modInfo = {
	name: "1 Million Zeroes NG- Tree",
	id: "mymod",
	author: "unpingabot#0245 & The Nefarious DDT#7391",
	pointsName: "Zeroes",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

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

function softcapStart() {
  return new Decimal(10000)
}

function softcapPower() {
  return new Decimal(1)
}
// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  gain = gain.mul(buyableEffect("tree-tab", 11))
  gain = gain.mul(buyableEffect("tree-tab", 12))
  gain = gain.mul(buyableEffect("tree-tab", 21))
  gain = gain.mul(hasUpgrade("o", 11) ? 2 : 1)
  gain = gain.mul(hasAchievement("a", 14) ? 3 : 1)
  gain = gain.mul(hasAchievement("a", 15) ? 3 : 1)
  if (gain.gte(10000)) gain = gain.pow(new Decimal(0.5).pow(softcapPower())).times(softcapStart().pow(new Decimal(1).sub(new Decimal(0.5).pow(softcapPower()))))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
  function() {if (isNerdMode()) {return "Nerd Mode Active"}}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

var controlDown = false
var shiftDown = false

window.addEventListener('keydown', function(event) {
	if (event.keyCode == 16) shiftDown = true;
	if (event.keyCode == 17) controlDown = true;
}, false);

window.addEventListener('keyup', function(event) {
	if (event.keyCode == 16) shiftDown = false;
	if (event.keyCode == 17) controlDown = false;
}, false);

function isNerdMode() {
  return shiftDown || player.nerdMode
}
