let modInfo = {
	name: "The Umbrella Tree",
	id: "TUAT",
	author: "Five Hargreeves#9676 and Holy Broly#0530",
	pointsName: "Power Points",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "3.0",
	name: "Allisons Rumour",
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

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if (hasUpgrade("s", 11)) gain = gain.times(3);
	if (hasUpgrade("s", 14)) gain = gain.times(upgradeEffect("s", 14));
	if (hasUpgrade("a", 12)) gain = gain.times(upgradeEffect("a", 12));
  if (hasUpgrade("a", 22)) gain = gain.pow(2);
  if (hasUpgrade("r", 12)) gain = gain.times(upgradeEffect("r", 12));
  if (hasUpgrade("r", 13)) gain = gain.times(upgradeEffect("r", 13));
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
	return
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}