addLayer("U", {
    name: "upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#157307",
    resource: "$",
    type: "none",
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "upgrades"
            ],
        },
        "The Machine": {
            content: [
                "main-display",
                "clickables"
            ]
        },
    },
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
            effectDisplay() {
                if (hasUpgrade('U', 23) === false) return 'x' + regularFormat(player.points.add(5).log(5), 2)
                if (hasUpgrade('U', 23) === true) return 'x' + regularFormat(player.points.add(3).log(3), 2)
            },
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
            effectDisplay() {
                return 'x' + regularFormat(player.points.pow(2).add(8).log(8).pow(0.5), 2)
            },
        },
        23: {
            title: "Super-Superinflation",
            description: "Change Superinflations effect to log3($ + 3)",
            cost: new Decimal(15000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        24: {
            title: "Yet Another Money Printer",
            description: "Multiply $ gain by 1.5",
            cost: new Decimal(30000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
        },
        31: {
            title: "Gigainflation",
            description: "Multiply $ gain by sqrt(log($ + 10))",
            cost: new Decimal(25000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
            effectDisplay() {
                return 'x' + regularFormat(player.points.add(10).log(10).pow(0.5), 2)
            },
        },
        32: {
            title: "Certainly a concept",
            description: "Reduce RP gain scaling",
            cost: new Decimal(80000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
        33: {
            title: "Blessing from the gods",
            description: "Increase RP's effect",
            cost: new Decimal(250000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
        34: {
            title: "THE MACHINE",
            description: "Unlock The Machine",
            cost: new Decimal("1e9"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
    },
    layerShown(){return true},
    automate() {
        if(hasUpgrade('R', 12)) {
            buyUpgrade('U', 11)
            buyUpgrade('U', 12)
            buyUpgrade('U', 13)
            buyUpgrade('U', 14)
            buyUpgrade('U', 21)
            buyUpgrade('U', 22)
            buyUpgrade('U', 23)
            buyUpgrade('U', 24)
        };
    },
})

addLayer("A", {
    name: "achievements",
    symbol: "🏆",
    row: "side",
    type: "none",
    resource: "achievements",
    color: "#FFEE88",
    tooltip: "Achievements",
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
            tooltip: "Get the 8th $ upgrade",
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
                if (player.R.points.gte(1)) return true
            },
        },
        22: {
            name: "Wow, more upgrades...",
            tooltip: "Buy a Rebirth Upgrade",
            done() {
                if (hasUpgrade('R', 11)) return true
            },
        },
        23: {
            name: "We COULD afford 9",
            tooltip: "Get the 9th $ upgrade",
            done() {
                if (hasUpgrade('U', 31)) return true
            },
        },
        24: {
            name: "Life and Death",
            tooltip: "Get the 5th Rebirth upgrade",
            done() {
                if (hasUpgrade('R', 15)) return true
            },
        },
        25: {
            name: "Endless Cycle",
            tooltip: "Get 100,000 Rebirth Points",
            done() {
                if (player.R.points.gte(100000)) return true
            },
        },
        31: {
            name: "Mechanical Mechanic",
            tooltip: "Unlock The Machine",
            done() {
                if (hasUpgrade('U', 34)) return true
            },
        },
        32: {
            name: "Secondary Choice",
            tooltip: "Use two of the Machine's modes at once",
            done() {
                if (false) return true
            },
        },
        33: {
            name: "No thoughts required",
            tooltip: "Use all of the Machine's modes at once",
            done() {
                if (false) return true
            },
        },
        34: {
            name: "Now with technically infinite upgrades!",
            tooltip: "Purchase the first RP buyable",
            done() {
                if (false) return true
            },
        },
        35: {
            name: "Perfectly Balanced",
            tooltip: "Purchase the second RP buyable",
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
    resource: "Rebirth Points",
    baseAmount() { return player.points },
    requires: new Decimal(100000),
    exponent() {
        if (hasUpgrade('U', 32)) return new Decimal(0.7)
        if (!hasUpgrade('U', 32)) return new Decimal(0.5)
    },
    color: "#ba0022",
    branches: ['U'],
    effect() {
        player.R.points.pow(0.5).add(1)
    },
    layerShown() { return hasAchievement('A', 12) },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    effectDescription() {
        if (!hasUpgrade('U', 32)) return "multiplying $ gain by " + regularFormat(player.R.points.pow(0.5).add(1), 2)
        if (hasUpgrade('U', 32)) return "multiplying $ gain by " + regularFormat(player.R.points.pow(0.7).add(1), 2)
    },
    upgrades: {
        11: {
            title: "$$$$$",
            description: "Multiply $ gain by 5",
            cost: new Decimal(1),
        },
        12: {
            title: "Moneybots",
            description: "Automate $ upgrades 1-8",
            cost: new Decimal(15),
        },
        13: {
            title: "I need more!",
            description: "Unlock another row of $ upgrades",
            cost: new Decimal(25),
        },
        14: {
            title: "Underwhelming",
            description: "Double $ gain",
            cost: new Decimal(100),
        },
    },
})