addLayer("i", {
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#226b80",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "illions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for illions", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
	    11: {
		    title: "More Points",
                    description: "Triple your point gain.",
                    cost: new Decimal(1),
		    effect() {
                        return new Decimal(3)
		    },
	    },
	    12: {
		    title: "More and More Points",
                    description: "Cube your point gain by 3.",
                    cost: new Decimal(5),
		    effect() {
                        return new Decimal(3)
		    },
	    },
	    13: {
		    title: "More and More Points Again?",
                    description: "Cube your point gain by 2.",
                    cost: new Decimal(20),
		    effect() {
                        return new Decimal(2)
		    },
	    }
    }
})

addLayer("g", {
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["i"],
    startData() { return {
        unlocked: layers.i.points >= 100,
		points: new Decimal(0),
    }},
    color: "#1291b5",
    requires: new Decimal(32), // Can be a function that takes requirement increases into account
    resource: "types of googol", // Name of prestige currency
    baseResource: "illions", // Name of resource prestige is based on
    baseAmount() {return player.i.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: new Decimal(10) * player[this.layer].points,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for types of googol", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {},
    milestones: {
        0: {
            requirementDescription: "1 type of googol (Googol)",
            effectDescription: "Nothing currently.",
            done() { return player.g.points.gte(1) }
        },
	1: {
            requirementDescription: "2 types of googol (Googolchime)",
            effectDescription: "Nothing currently.",
            done() { return player.g.points.gte(2) }
        },
	2: {
            requirementDescription: "3 types of googol (Googoltoll)",
            effectDescription: "Nothing currently.",
            done() { return player.g.points.gte(3) }
        },
	3: {
            requirementDescription: "4 types of googol (Googolgong)",
            effectDescription: "Nothing currently.",
            done() { return player.g.points.gte(4) }
        }
    }
})

