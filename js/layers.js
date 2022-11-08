addLayer("c", {
    name: "cycle", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires() {
        if(player[this.layer].points.lt(1))
            return new Decimal(1) 
        else if(player[this.layer].points.eq(1))
            return new Decimal(1e6)
    } , // Can be a function that takes requirement increases into account
    resource: "Performed Cycles", // Name of prestige currency
    baseResource: "Cycles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Performed Cycles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Why is this so slow?",
            description: "Double your Cycles gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "What the fudge?",
            description: "Let's try scalling based on unspent Performed Cycles.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "How can I ever afford this?",
            description: "Performed Cycles boost Cycles",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "What the duce?",
            description: "Secret Performance Boost",
            cost: new Decimal(1),
            unlocked() { if(player.points > 5 || hasUpgrade('c', 14)) return 1},
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },




    },
    layerShown(){return true}
})
