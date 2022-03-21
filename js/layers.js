addLayer("d", {
    name: "dirt", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    passiveGeneration() {
        if (hasMilestone('g', 1)) return 1
        else return 0
    },
    color: "#25100e",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "dirt", // Name of prestige currency
    baseResource: "power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('d', 12)) mult = mult.times(upgradeEffect('d', 12))
        if (hasUpgrade('d', 14)) mult = mult.times(upgradeEffect('d', 14))
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        if (hasUpgrade('s', 11)) mult = mult.times(upgradeEffect('s', 11))
        if (hasUpgrade('st', 11)) mult = mult.times(upgradeEffect('st', 11))
        if (hasMilestone('st', 2)) mult = mult.times(1.70)
        if (hasMilestone('st', 3)) mult = mult.times(1.35)
        if (hasMilestone('go', 1)) mult = mult.times(30)
        if (hasMilestone('c', 1)) mult = mult.times(12)
        if (hasMilestone('i', 1)) mult = mult.times(19)
        return mult
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            savedUpgrades = []
            if (hasMilestone('c', 1) || (hasMilestone('i', 1)) || (hasMilestone('go', 1)) && ['g', 's', 'st', 'i', 'c', 'go'].includes(resettingLayer)) {
                if (hasUpgrade(this.layer, 11)) {savedUpgrades.push(11)}
                if (hasUpgrade(this.layer, 12)) {savedUpgrades.push(12)}
                if (hasUpgrade(this.layer, 13)) {savedUpgrades.push(13)}
                if (hasUpgrade(this.layer, 14)) {savedUpgrades.push(14)}
            }
            let keep = []
if (hasMilestone('c', 3)) keep.push('milestones')
layerDataReset(this.layer, keep)
            player[this.layer].upgrades = savedUpgrades
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for dirt", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
        upgrades: {
            11: {
                title: "THE POWER!",
                description: "Get more power based on how much dirt you have.",
                cost: new Decimal(2),
                effect() {
                    return player[this.layer].points.add(2).pow(0.2)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            12: {
                title: "How the hell does dirt gro-",
                description: "Get more dirt based on how much dirt you have.",
                cost: new Decimal(5),
                effect() {
                    return player[this.layer].points.add(2).pow(0.3)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            13: {
                title: "How does dirt relate to this???",
                description: "Get more power based on how much power you have.",
                cost: new Decimal(20),
                effect() {
                    return player.points.add(1).pow(0.17)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            14: {
                title: "I mean that makes sense a tiny bit...",
                description: "Get more dirt based on how much power you have.",
                cost: new Decimal(50),
                effect() {
                    return player.points.add(1).pow(0.08)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            }
        }
})

addLayer("s", {
    name: "sand", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    passiveGeneration() {
        if (hasMilestone('g', 2)) return 0.5
        else return 0
    },
    color: "Yellow",
    requires: new Decimal(250), // Can be a function that takes requirement increases into account
    resource: "sand", // Name of prestige currency
    baseResource: "power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 12)) mult = mult.times(upgradeEffect('g', 12))
        if (hasMilestone('st', 1)) mult = mult.times(1.15)
        if (hasUpgrade('st', 12)) mult = mult.times(upgradeEffect('st', 12))
        if (hasMilestone('st', 3)) mult = mult.times(1.35)
        if (hasUpgrade('st', 13)) mult = mult.times(upgradeEffect('st', 13))
        return mult
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            savedUpgrades = []
            if (hasMilestone('c', 1) || (hasMilestone('i', 1)) || (hasMilestone('go', 1)) && ['st', 'i', 'c', 'go'].includes(resettingLayer)) {
                if (hasUpgrade(this.layer, 11)) {savedUpgrades.push(11)}
                if (hasUpgrade(this.layer, 12)) {savedUpgrades.push(12)}
            }
            let keep = []
if (hasMilestone('c', 3)) keep.push('milestones')
layerDataReset(this.layer, keep)
            player[this.layer].upgrades = savedUpgrades
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for sand", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["d"],
    upgrades: {
        11: {
            title: "Makes sense...",
            description: "You get more dirt based on how much sand you have.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(16).pow(0.31)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "wow more babies?",
            description: "You get more grass based on how much sand you have.",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(10).pow(0.44)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
})

addLayer("g", {
    name: "grass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    passiveGeneration() {
        if (hasMilestone('g', 2)) return 0.5
        else return 0
    },
    color: "Green",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "grass", // Name of prestige currency
    baseResource: "dirt", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.48, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12))
        if (hasMilestone('st', 1)) mult = mult.times(1.15)
        if (hasUpgrade('st', 12)) mult = mult.times(upgradeEffect('st', 12))
        if (hasMilestone('st', 3)) mult = mult.times(1.35)
        if (hasUpgrade('st', 13)) mult = mult.times(upgradeEffect('st', 13))
        return mult
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            savedUpgrades = []
            if (hasMilestone('c', 1) || (hasMilestone('i', 1)) || (hasMilestone('go', 1)) && ['st', 'i', 'c', 'go'].includes(resettingLayer)) {
                if (hasUpgrade(this.layer, 11)) {savedUpgrades.push(11)}
                if (hasUpgrade(this.layer, 12)) {savedUpgrades.push(12)}
            }
            let keep = []
if (hasMilestone('c', 3)) keep.push('milestones')
layerDataReset(this.layer, keep)
            player[this.layer].upgrades = savedUpgrades
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for grass", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["d"],
    upgrades: {
        11: {
            title: "Oh hell no no no-",
            description: "You get more dirt based on how much grass you have.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(20).pow(0.26)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "what",
            description: "You get more sand based on how much grass you have.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(10).pow(0.42)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    milestones: {
        1: {
            requirementDescription: "50 Grass",
            effectDescription: "You gain 100% of dirt every second.",
            done() { return player.g.points.gte(50) }
        },
        2: {
            requirementDescription: "1500 Grass",
            effectDescription: "You gain 50% of grass and sand every second.",
            done() { return player.g.points.gte('1500') }
        }
    }
}),
addLayer("st", {
    name: "stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "St", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1,
    canBuyMax() {return hasMilestone('st', 4) || (hasMilestone('c', 1)) || (hasMilestone('i', 1)) || (hasMilestone('go', 1))},
    autoPrestige() {return hasMilestone('st', 5) || (hasMilestone('go', 2)) || (hasMilestone('i', 2)) || (hasMilestone('c', 2))},
    resetsNothing() {return hasMilestone('st', 5) || (hasMilestone('go', 2)) || (hasMilestone('i', 2)) || (hasMilestone('c', 2))},
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "Gray",
    requires: new Decimal("100000"), // Can be a function that takes requirement increases into account
    resource: "stone", // Name of prestige currency
    baseResource: "power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            savedUpgrades = []
            if (hasMilestone('c', 1) || (hasMilestone('i', 1)) || (hasMilestone('go', 1)) && ['i', 'c', 'go'].includes(resettingLayer)) {
                if (hasUpgrade(this.layer, 11)) {savedUpgrades.push(11)}
                if (hasUpgrade(this.layer, 12)) {savedUpgrades.push(12)}
                if (hasUpgrade(this.layer, 13)) {savedUpgrades.push(13)}
            }
            let keep = []
if (hasMilestone('c', 3)) keep.push('milestones')
layerDataReset(this.layer, keep)
            player[this.layer].upgrades = savedUpgrades
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for stone", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.points.gte(50000) || (hasUpgrade('st', 11)) || player.st.points.gte(1)},
    branches: ["g", "s"],
    upgrades: {
        11: {
            title: "Omg so unexpected",
            description: "You get more dirt based on how much stone you have.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(10).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "cool",
            description: "You get more sand and grass based on how much stone you have.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('st', 11)},
            effect() {
                return player[this.layer].points.add(10).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "woah i didnt think of this before",
            description: "You get more sand and grass based on how much dirt you have.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('st', 12)},
            effect() {
                return player.d.points.add(1).pow(0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    milestones: {
        1: {
            requirementDescription: "2 total stone",
            effectDescription: "You get 15% more grass and sand.",
            done() { return player.st.total.gte(2) }
        },
        2: {
            requirementDescription: "4 total stone",
            effectDescription: "You get 70% more dirt.",
            done() { return player.st.total.gte(4) }
        },
        3: {
            requirementDescription: "5 total stone",
            effectDescription: "You get 35% more dirt, sand and grass.",
            done() { return player.st.total.gte(5) }
        },
        4: {
            requirementDescription: "7 total stone",
            effectDescription: "You can buy max stone. (very slow part starts)",
            done() { return player.st.total.gte(7) }
        },
        5: {
            requirementDescription: "100 stone",
            effectDescription: "Stone buys automatically and it resets nothing, and multiply power gain by 5x.",
            done() { return player.st.points.gte(100) }
        }
    }
}),

addLayer("i", {
    name: "iron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#99845b",
    requires: new Decimal("150"), // Can be a function that takes requirement increases into account
    resource: "iron", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 12)) mult = mult.times(upgradeEffect('i', 12))
        if (hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for iron", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.st.points.gte(100) || (hasUpgrade('i', 11)) || player.i.points.gte(1)},
    branches: ["st"],
    upgrades: {
        11: {
            title: "repetitive+",
            description: "Get more dirt based on how much iron you have.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(5).pow(0.34)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "selfbooster",
            description: "Get more iron based on how much iron you have.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('i', 11)},
            effect() {
                return player[this.layer].points.add(10).pow(0.7)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "wow",
            description: "Get more gold based on how much iron you have.",
            cost: new Decimal(350),
            unlocked() {return hasUpgrade('i', 12)},
            effect() {
                return player[this.layer].points.add(10).pow(0.26)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    milestones: {
        1: {
            requirementDescription: "1 iron",
            effectDescription: "You keep row 1-3 upgrades, you can buy max stone and you get 19x more dirt.",
            done() { return player.i.points.gte(1) }
        },
        2: {
            requirementDescription: "4 iron",
            effectDescription: "Stone buys automatically and it resets nothing.",
            done() { return player.i.points.gte(4) }
        }
    },
}),
addLayer("c", {
    name: "coal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#242424",
    requires: new Decimal("100"), // Can be a function that takes requirement increases into account
    resource: "coal", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 12)) mult = mult.times(upgradeEffect('c', 12))
        if (hasUpgrade('go', 13)) mult = mult.times(upgradeEffect('go', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for coal", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.st.points.gte(100) || (hasUpgrade('c', 11)) || player.c.points.gte(1)},
    branches: ["st"],
    upgrades: {
        11: {
            title: "repetitive",
            description: "Get more dirt based on how much coal you have.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(5).pow(0.28)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "selfbooster",
            description: "Get more coal based on how much coal you have.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('c', 11)},
            effect() {
                return player[this.layer].points.add(10).pow(0.8)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "wow",
            description: "Get more iron based on how much coal you have.",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('c', 12)},
            effect() {
                return player[this.layer].points.add(10).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    milestones: {
        1: {
            requirementDescription: "1 coal",
            effectDescription: "You keep row 1-3 upgrades you can buy max stone and you get 12x more dirt.",
            done() { return player.c.points.gte(1) }
        },
        2: {
            requirementDescription: "4 coal",
            effectDescription: "Stone buys automatically and it resets nothing.",
            done() { return player.c.points.gte(4) }
        },
        3: {
            requirementDescription: "10 coal",
            effectDescription: "You keep row 1-3 milestones.",
            done() { return player.c.points.gte(10) }
        }
    },

}),
addLayer("go", {
    name: "gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Go", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "Gold",
    requires: new Decimal("200"), // Can be a function that takes requirement increases into account
    resource: "gold", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() {return player.st.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('go', 12)) mult = mult.times(upgradeEffect('go', 12))
        if (hasUpgrade('i', 13)) mult = mult.times(upgradeEffect('i', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for gold", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.st.points.gte(100) || (hasUpgrade('go', 11)) || player.go.points.gte(1)},
    branches: ["st"],
    upgrades: {
        11: {
            title: "repetitive++",
            description: "Get more dirt based on how much gold you have.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(5).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "selfbooster",
            description: "Get more gold based on how much gold you have.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('go', 11)},
            effect() {
                return player[this.layer].points.add(10).pow(0.6)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "wow",
            description: "Get more coal based on how much gold you have.",
            cost: new Decimal(25),
            unlocked() {return hasUpgrade('go', 12)},
            effect() {
                return player[this.layer].points.add(10).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    milestones: {
        1: {
            requirementDescription: "1 gold",
            effectDescription: "You keep row 1-3 upgrades, you can buy max stone and you get 30x more dirt.",
            done() { return player.go.points.gte(1) }
        },
        2: {
            requirementDescription: "4 gold",
            effectDescription: "Stone buys automatically and it resets nothing.",
            done() { return player.go.points.gte(4) }
        }
    },

})
