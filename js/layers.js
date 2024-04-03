addLayer("U", {
    name: "upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UPG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "upgrades", // Name of prestige currency
    baseResource: "$", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
        11: {
            title: "Economic Inflation",
            description: "Start generating 1$ every second",
            cost: new Decimal(0),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        12: {
            title: "Money Printer",
            description: "Quadruple $ gain",
            cost: new Decimal(10),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        13: {
            title: "Superinflation",
            description: "Multiply $ gain by log5($ + 5)",
            cost: new Decimal(50),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        14: {
            title: "Another Money Printer",
            description: "Double $ gain",
            cost: new Decimal(200),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        21: {
            title: "Hyperinflation",
            description: "Raise $ gain by 1.25",
            cost: new Decimal(500),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        22: {
            title: "Ultrainflation",
            description: "Multiply $ gain by sqrt(log8($^1.5 + 8))",
            cost: new Decimal(2000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        23: {
            title: "Super-Superinflation",
            description: "Change Superinflations effect to log3($ + 3)",
            cost: new Decimal(20000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        24: {
            title: "Yet Another Money Printer",
            description: "Multiply $ gain by 1.5",
            cost: new Decimal(60000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
    },
    layerShown(){return true}
})
