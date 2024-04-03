addLayer("U", {
    name: "upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#44FF44",
    resource: "$",
    type: "none",
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
            description: "Raise $ gain by 1.25 (applied after multipliers)",
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

addLayer("Ach", {
    name: "achievements",
    symbol: "ACH",
    row: "side",
    type: "none",
    resource: "achievements",
    color: "#FFDD00",
    startData() { return {
        unlocked: true,
    }},
    achievements: {
        11: {
            name: "The Start",
            tooltip: "Start producing $",
            done() {
                if (hasUpgrade('U', 11)) return true
            },
        },
        12: {
            name: "100 antima- I mean cash is a lot",
            tooltip: "Get 100 $ <br>(no, that is not a typo)",
            done() {
                if (player.points.gte(100)) return true
            },
        },
        13: {
            name: "We couldn't afford 9",
            tooltip: "Get the 8th $ upgrade <br>Reward: Unlock Rebirth",
            done() {
                if (hasUpgrade('U', 24)) return true
            },
        },
        14: {
            name: "Millionaire",
            tooltip: "Get 1,000,000 $",
            done() {
                if (player.points.gte(1000000)) return true
            },
        },
        15: {
            name: "Very Rich Person",
            tooltip: "Get 5e11 $",
            done() {
                if (player.points.gte("5e11")) return true
            },
        },
        21: {
            name: "Reincarnated",
            tooltip: "Rebirth",
            done() {
                if (false) return true
            },
        },
        22: {
            name: "Re-Reincarnated",
            tooltip: "Rebirth twice",
            done() {
                if (false) return true
            },
        },
        23: {
            name: "We COULD afford 9",
            tooltip: "Get the 9th $ upgrade",
            done() {
                if (false) return true
            },
        },
        24: {
            name: "Life and Death",
            tooltip: "Get the 5th Rebirth upgrade",
            done() {
                if (false) return true
            },
        },
        25: {
            name: "Endless Cycle",
            tooltip: "Get 1000 Rebirth Points",
            done() {
                if (false) return true
            },
        },
    }
})

addLayer("R", {
    name: "rebirth",
    symbol: "R",
    row: "1",
    type: "normal",
    baseResource: "$",
    baseAmount() { return player.points },
    requires: new Decimal(100000),
    exponent: new Decimal(0.5),
    color: "#DE1212",
    unlocked: hasAchievement("Ach", 13),
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
})