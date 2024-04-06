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
                "buyables",
                "upgrades",
            ],
        },
        "The Machine": {
            content: [
                "main-display",
                ["display-text", function() {
                    if(hasUpgrade('U', 34) || hasUpgrade('R', 21)) return "The Machine can provide boosts to both $ and RP, but be aware that you can't change your selection once you make it.<br>Bonus is reset on Rebirth."; else return "The Machine is currently disabled because you don't have $ upgrade 12"
                }],
                "clickables",
                ["display-text", function() {
                    if(hasAchievement('A', 33)) return "Your bonuses to the Machine are multiplying $ and RP gain by " + coolDynamicFormat(machineBonuses(), 2)
                }],
            ],
            unlocked() {
                return hasAchievement('A', 31)
            }
        }
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
            description: "Multiply $ gain based on $",
            tooltip: "log5($ + 5)",
            cost: new Decimal(50),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            effectDisplay() {
                if (hasUpgrade('U', 23) === false) return 'x' + coolDynamicFormat(player.points.add(5).log(5), 2)
                if (hasUpgrade('U', 23) === true) return 'x' + coolDynamicFormat(player.points.add(3).log(3), 2)
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
            tooltip: "All exponents are applied after all multipliers in the same layer",
        },
        22: {
            title: "Ultrainflation",
            description: "Multiply $ gain based on $ again",
            tooltip: "sqrt(log8($^1.5 + 8))",
            cost: new Decimal(2000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            effectDisplay() {
                return 'x' + coolDynamicFormat(player.points.pow(2).add(8).log(8).pow(0.5), 2)
            },
        },
        23: {
            title: "Super-Superinflation",
            description: "Improve the above upgrades effect",
            tooltip: "log5 -> log3",
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
            description: "Multiply $ gain based on $ yet again",
            tooltip: "sqrt(log($ + 10))",
            cost: new Decimal(5000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
            effectDisplay() {
                return 'x' + coolDynamicFormat(player.points.add(10).log(10).pow(0.5), 2)
            },
        },
        32: {
            title: "Certainly a concept",
            description: "Reduce RP gain scaling",
            tooltip: "^0.5 -> ^0.7",
            cost: new Decimal(35000000),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 13)
            },
        },
        33: {
            title: "Blessing from the gods",
            description: "Increase RP's effect",
            tooltip: "^0.6 -> ^0.7",
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
        41: {
            title: "Payrise",
            description: "Multiply $ gain by 10",
            cost: new Decimal("1e13"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        42: {
            title: "Relativity",
            description: "Boost RP's effect again",
            tooltip: "^0.7 -> ^0.8",
            cost: new Decimal("5e14"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        43: {
            title: "Synergism",
            description: "RP and $ boost each other",
            tooltip: "RP*log(log($ + 10) + 10)<br>$*log(RP + 10)",
            cost: new Decimal("3e15"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasUpgrade('R', 24)
            },
            effectDisplay() {
                return 'RP x' + coolDynamicFormat(player.points.add(10).log(10).add(10).log(10), 2)
                + '<br>$ x' + coolDynamicFormat(player.R.points.add(10).log(10), 2)
            },
        },
        44: {
            title: "Reincarnativism",
            description: "Boost the second RP buyables effect slightly",
            cost: new Decimal("1e25"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            tooltip: "+0.05 to base",
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
    },
    layerShown(){return true},
    automate() {

    },
    clickables: {
        11: {
            title: "Money Mode",
            display() {
                if(!getClickableState(this.layer, this.id)) return "Quadruples $ gain<br>Doubles RP gain"; else return "Quadruples $ gain<br>Doubles RP gain<br>ACTIVE"
            },
            canClick() {
                if(hasUpgrade('R', 32)) return true;
                if(!hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 12) && !getClickableState(this.layer, 13)) return true; else return false
                }
                if(hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 12) || !getClickableState(this.layer, 13)) return true; else return false
                }
            },
            onClick() {
                setClickableState(this.layer, this.id, true)
            },
        },
        12: {
            title: "Neutral Mode",
            display() {
                if(!getClickableState(this.layer, this.id)) return "Triples $ gain<br>Triples RP gain"; else return "Triples $ gain<br>Triples RP gain<br>ACTIVE"
            },
            canClick() {
                if(hasUpgrade('R', 32)) return true;
                if(!hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) && !getClickableState(this.layer, 13)) return true; else return false
                }
                if(hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) || !getClickableState(this.layer, 13)) return true; else return false
                }
            },
            onClick() {
                setClickableState(this.layer, this.id, true)
            },
        },
        13: {
            title: "Rebirth Mode",
            display() {
                if(!getClickableState(this.layer, this.id)) return "Doubles $ gain<br>Quadruples RP gain"; else return "Doubles $ gain<br>Quadruples RP gain<br>ACTIVE"
            },
            canClick() {
                if(hasUpgrade('R', 32)) return true;
                if(!hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) && !getClickableState(this.layer, 12)) return true; else return false
                }
                if(hasUpgrade('R', 31)) {
                    if(!getClickableState(this.layer, 11) || !getClickableState(this.layer, 12)) return true; else return false
                }
            },
            onClick() {
                setClickableState(this.layer, this.id, true)
            },
        },
    },
    buyables: {
        11: {
            cost(x) {
                return new Decimal(1000000).times(new Decimal(10).pow(x))
            },
            title: "Pay to Win Afterlife",
            effect(x) {
                if(!hasMilestone('SR', 3)) return new Decimal(1.1).pow(x)
                if(hasMilestone('SR', 3)) return new Decimal(1.3).pow(x)
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() { return player.points.gte(this.cost()) },
            display() {
                return "Boost RP gain<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: x" + coolDynamicFormat(this.effect(), 2)
            },
            tooltip: "Base effect: +1.1^x<br>Base cost:1,000,000*(10^x)",
            unlocked() { return hasMilestone('SR', 2) }
        },
    },
    doReset(resetlayer) {
        player.U.upgrades = [];
        if(resetlayer == 'R') {
            if(hasMilestone('SR', 0)) player.U.upgrades.push(11, 12, 13, 14, 21, 22, 23, 24)
            if(hasMilestone('SR', 1)) player.U.upgrades.push(31, 32, 33)
            if(hasUpgrade('R', 21)) player.U.upgrades.push(34)
        };
        if(resetlayer == 'SR') {
            if(hasMilestone('SR', 0)) player.U.upgrades.push(11, 12, 13, 14, 21, 22, 23, 24)
            if(hasMilestone('SR', 1)) player.U.upgrades.push(31, 32, 33)
            if(!hasMilestone('SR', 3)) setBuyableAmount('U', 11, new Decimal(0))
        };
        if(!hasUpgrade('R', 32)) {
            setClickableState('U', 11, false)
            setClickableState('U', 12, false)
            setClickableState('U', 13, false)
        };
        if(hasUpgrade('R', 32)) {
            setClickableState('U', 11, true)
            setClickableState('U', 12, true)
            setClickableState('U', 13, true)
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
                if (hasUpgrade('R', 21)) return true
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
            tooltip: "Unlock The Machine<br>Reward: automate $ upgrade 9",
            done() {
                if (hasUpgrade('U', 34)) return true
            },
        },
        32: {
            name: "Secondary Choice",
            tooltip: "Unlock the ability to use two of The Machines modes at once",
            done() {
                if (achievement33()) return true
            },
        },
        33: {
            name: "No thoughts required",
            tooltip: "Use all of the Machine's modes at once<br>Reward: automate $ upgrades 10-12",
            done() {
                if (hasUpgrade('R', 32)) return true
            },
        },
        34: {
            name: "Now with technically infinite upgrades!",
            tooltip: "Purchase the first RP buyable",
            done() {
                if (getBuyableAmount('R', 11).gte(1)) return true
            },
        },
        35: {
            name: "Perfectly Balanced",
            tooltip: "Purchase the second RP buyable",
            done() {
                if (getBuyableAmount('R', 12).gte(1)) return true
            },
        },
        41: {
            name: "Wow, a content",
            tooltip: "Buy RP upgrade 8",
            done() {
                if (hasUpgrade('R', 24)) return true
            },
        },
        42: {
            name: "Super Duper Uber Rebirth",
            tooltip: "Reach 1e19 RP<br>Reward: retain all automation in future",
            done() {
                if (player.R.points.gte("1e19")) return true
            },
        },
        43: {
            name: "Can't wait for Hyper Rebirth",
            tooltip: "Perform a Super Rebirth reset",
            done() {
                if (player.SR.points.gte(1)) return true
            },
        },
        44: {
            name: "Monetary Incentive",
            tooltip: "Purchase the $ buyable",
            done() {
                if (getBuyableAmount('U', 11).gte(1)) return true
            },
        },
        45: {
            name: "Kilometrerock",
            tooltip: "Get all SRP milestones",
            done() {
                if (false) return true
            },
        },
        51: {
            name: "Unchallenged",
            tooltip: "Complete a challenge",
            done() {
                if (hasChallenge('SR', 11)) return true
            },
        },
        52: {
            name: "PLACEHOLDER",
            tooltip: "Unobtainable",
            done() {
                if (false) return true
            },
        },
        53: {
            name: "PLACEHOLDER",
            tooltip: "Unobtainable",
            done() {
                if (false) return true
            },
        },
        54: {
            name: "HOLDERPLACE",
            tooltip: "tainableUn",
            done() {
                if (false) return true
            },
        },
        55: {
            name: "PLACEHOLDER",
            tooltip: "Unobtainable",
            done() {
                if (false) return true
            },
        },
    }
})

addLayer("R", {
    name: "rebirth",
    softcap: new Decimal("1e17"),
    softcapPower: new Decimal(0.25),
    symbol: "R",
    row: "1",
    type: "normal",
    baseResource: "$",
    resource: "Rebirth Points",
    baseAmount() { return player.points },
    onPrestige() {

    },
    requires() {
        if(!inChallenge('SR', 11)) return new Decimal(100000)
        if(inChallenge('SR', 11)) return new Decimal("eeeeeeeee10")
    },
    gainMult() {
        let remult = new Decimal(1)
        if (getClickableState('U', 11)) remult = remult.times(2)
        if (getClickableState('U', 12)) remult = remult.times(3)
        if (getClickableState('U', 13)) remult = remult.times(4)
        if (hasUpgrade('U', 43)) remult = remult.times(player.points.add(10).log(10).add(10).log(10))
        remult = remult.times(layers.R.buyables[11].effect())
        if (hasUpgrade('R', 32)) remult = remult.times(1.3)
        remult = remult.times(layers.SR.effect()[0])
        remult = remult.times(layers.U.buyables[11].effect())
        return remult
    },
    exponent() {
        if (hasUpgrade('U', 32)) return new Decimal(0.7)
        if (!hasUpgrade('U', 32)) return new Decimal(0.5)
    },
    color: "#ba0022",
    branches: ['U'],
    effect() {
        if (!hasUpgrade('U', 33) && !hasUpgrade('U', 42)) return player.R.points.pow(0.6).add(1)
        if (hasUpgrade('U', 33) && hasUpgrade('U', 42)) return player.R.points.pow(0.8).add(1)
        if (hasUpgrade('U', 33) || hasUpgrade('U', 42)) return player.R.points.pow(0.7).add(1)
    },
    layerShown() { return hasAchievement('A', 12) },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    effectDescription() {
        return "multiplying $ gain by " + coolDynamicFormat(this.effect(), 2)
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
            cost: new Decimal(3),
        },
        13: {
            title: "I need more!",
            description: "Unlock another row of $ upgrades",
            cost: new Decimal(15),
        },
        14: {
            title: "Underwhelming",
            description: "Double $ gain",
            cost: new Decimal(100),
        },
        21: {
            title: "Mechanical Reconstruction",
            description: "The Machine starts unlocked",
            cost: new Decimal(10000),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        22: {
            title: "Repeated Costs",
            description: "Unlock a RP buyable",
            cost: new Decimal(50000),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        23: {
            title: "Repeated Repeated Costs",
            description: "Unlock a second RP buyable",
            cost: new Decimal(1000000),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        24: {
            title: "Upgrading Revival",
            description: "Unlock more upgrades (both RP and $)",
            cost: new Decimal("1e8"),
            unlocked() {
                return hasAchievement('A', 31)
            },
        },
        31: {
            title: "Doublatron 3000",
            description: "Allows use of two of The Machines modes at once",
            cost: new Decimal("1e16"),
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
        32: {
            title: "Machine automating Machine",
            description: "Automatically select all three modes of The Machine<br>The Machine also gets a buff",
            cost: new Decimal("1e18"),
            unlocked() {
                return hasUpgrade('R', 24)
            },
        },
    },
    buyables: {
        11: {
            cost(x) {
                return new Decimal(20000).times(new Decimal(1.2).pow(new Decimal(x).pow(2)))
            },
            title: "Rebirth Booster",
            tooltip: "Base effect: 1.5^x<br>Base cost:20,000*(1.2^x^2)",
            display() {
                return "Multiply RP gain<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: x" + coolDynamicFormat(this.effect(), 2)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(!hasMilestone('SR', 0)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('R', 22)
            },
            effect(x) {
                return new Decimal(1.5).add(layers.R.buyables[12].effect()).pow(x)
            },
        },
        12: {
            cost(x) {
                return new Decimal(1000000).times(new Decimal(3).pow(new Decimal(x).pow(2)))
            },
            title: "Rebirth Booster Booster",
            tooltip: "Base effect: +x/4<br>Base cost:1,000,000*(3^x^2)",
            display() {
                return "Boost the previous buyables power<br>Cost: " + coolDynamicFormat(this.cost(), 3)
                + "<br>Count: " + coolDynamicFormat(getBuyableAmount(this.layer, this.id), 0)
                + "<br>Effect: +" + coolDynamicFormat(this.effect(), 2)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(!hasMilestone('SR', 0)) player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('R', 23)
            },
            effect(x) {
                if (!hasUpgrade('U', 44)) return new Decimal(0.25).times(x)
                if (hasUpgrade('U', 44)) return new Decimal(0.3).times(x)
            },
        },
    },
    automate() {
        
    },
    doReset(resetlayer) {
        if(resetlayer == 'SR') {
            player.R.upgrades = []
            player.R.points = new Decimal(0)
            if(hasMilestone('SR', 1)) player.R.upgrades.push(11, 12, 13, 14)
            if(hasMilestone('SR', 3)) player.R.upgrades.push(22, 23)
            if(!hasMilestone('SR', 3)) setBuyableAmount('R', 11, new Decimal(0))
            if(!hasMilestone('SR', 3)) setBuyableAmount('R', 12, new Decimal(0))
        }
    },
    passiveGeneration() {
        let passive = new Decimal(0)
        if(hasChallenge('SR', 11)) passive = passive.add(0.2)
        return passive
    },
})

addLayer("SR", {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    row: "2",
    canBuyMax() {
        return hasMilestone(this.layer, 2)
    },
    color: "#eb1a3d",
    resource: "Super Rebirth Points",
    requires: new Decimal(1e19),
    type: "static",
    base: new Decimal(2),
    exponent: new Decimal(1),
    roundUpCost: true,
    baseResource: "RP",
    branches: ["R"],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "milestones",
                "upgrades"
            ]
        },
        "Challenges": {
            content: [
                ["display-text", "Entering a challenge forces a Super Rebirth reset<br>Whilst inside of a challenge, various nerfs are applied to you<br>A challenge can be completed after reaching its goal, which will vary between the challenges<br>After completing a challenge, a powerful upgrade is applied for free"],
                "blank",
                "h-line",
                "blank",
                "challenges",
            ]
        },
    },
    baseAmount() { return player.R.points },
    layerShown() {
        return hasAchievement('A', 41)
    },
    effect() {
        return [player.SR.points.times(1.5).add(1),
        player.SR.points.pow(0.5).add(1)]
    },
    effectDescription() {
        return "multiplying RP gain by " + coolDynamicFormat(this.effect()[1], 2)
        + " and $ gain by " + coolDynamicFormat(this.effect()[0], 2)
    },
    milestones: {
        0: {
            requirementDescription: "1 SRP",
            effectDescription: "$ upgrades 1-8 are kept on all resets, and RP buyables don't spend RP.",
            done() {
                return player.SR.points.gte(1)
            }
        },
        1: {
            requirementDescription: "2 SRP",
            effectDescription: "Keep first 4 RP upgrades on SRP reset, and keep $ upgrades 9-11 on all resets",
            done() {
                return player.SR.points.gte(2)
            }
        },
        2: {
            requirementDescription: "3 SRP",
            effectDescription: "Unlock a $ buyable (kept on Rebirths), and unlock the ability to buy max SRP",
            done() {
                return player.SR.points.gte(3)
            }
        },
        3: {
            requirementDescription: "5 SRP",
            effectDescription: "ALL buyables are kept on Super Rebirth resets, keep RP upgrade 5 and 6, and boost the $ buyable",
            done() {
                return player.SR.points.gte(5)
            },
            tooltip: "$ buyable boost: 1.1^x -> 1.3^x"
        },
    },
    upgrades: {
        11: {
            title: "Challenging",
            description: "Unlock the first challenge",
            cost: new Decimal(5),
        },
    },
    challenges: {
        11: {
            name: "Betrayed Gods",
            challengeDescription: "Drastically increase Rebirth requirement",
            canComplete() { return player.points.gte(100000000) },
            unlocked() { return hasUpgrade(this.layer, 11) },
            rewardDescription: "Gain 20% of RP gain every second",
            goalDescription: "Reach 100,000,000 $"
        },
    },
})

addLayer("SA", {
    name: "secret-achievements",
    symbol: "🔮",
    row: "side",
    type: "none",
    resource: "secret achievements",
    color: "#9966BB",
    tooltip: "Secret Achievements",
    tabFormat: [
        ["display-text", "Secret Achievements are only visible once completed<br>This tab is only visible once any Secret Achievement has been completed<br>Most Secret Achievements will become impossible if too much progression is made before unlocking them<br>Each Secret Achievement will also eventually have its own exclusive visual theme (available in options) once I figure out how to do that<br>There will be a surprise for getting all of them once there are enough of them for it to be interesting"],
        ["display-text", "<br>There is currently 1 Secret Achievement<br>Every Secret Achievement has hints hidden around the game to make them possible to obtain without searching up the answers (you'll do it anyways)"],
        "blank",
        "achievements"
    ],
    unlocked() {
        return hasAchievement('SA', 11)
    },
    achievements: {
        11: {
            name: "Out of Order",
            tooltip: "Buy $ upgrade 7 before $ upgrade 3",
            unlocked() { return hasAchievement('SA', 11) },
            done() { return !hasUpgrade('U', 13) && hasUpgrade('U', 23) }
        },
    },
})