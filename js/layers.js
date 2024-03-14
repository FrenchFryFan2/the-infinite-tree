addLayer("p", {
    name: "expansion", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "e", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFE88F",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "energy", // Name of prestige currency
    baseResource: "virtual particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "quantum fluctuations",
            description: "doubles virtual particle output",
            cost: new Decimal(5),
        },
        12: {
            title: "increased quantum foam density",
            description: "increases virtual particle gain by space gain",
            cost: new Decimal(10),  
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        13: {
            title: "antimatter matter annihilations",
            description: "reduced space cost using virtual particles",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x" },
        },

        15: {
            title: "light atomic fission",
            description: "increases virtual particle gain by virtual particles",
            cost: new Decimal(10000),
            effect() {
                return player.points.add(0).pow(0.075)
            },
            effectDisplay() {return format(upgradeEffect(this.layer, this.id))+"x" },
        },

        14: {
            title: "proton and nuetron formation"
        }

    },

    layerShown(){return true}
})
