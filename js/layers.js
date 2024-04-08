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
                    if(hasAchievement('A', 33)) return "Your bonuses to The Machine are multiplying $ and RP gain by " + coolDynamicFormat(machineBonuses(), 2)
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
        51: {
            title: "Tesla Coils",
            description: "Multiply $ gain by Power",
            cost: new Decimal("1e95"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasMilestone('P', 6)
            },
            effectDisplay() { return "x" + coolDynamicFormat(player.P.points, 2)}
        },
        52: {
            title: "Heavenly Batteries",
            description: "Multiply RP gain based on Power",
            cost: new Decimal("1e130"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            tooltip: "log3(Power + 3)",
            unlocked() {
                return hasMilestone('P', 6)
            },
            effectDisplay() { return "x" + coolDynamicFormat(player.P.points.add(3).log(3), 2)}
        },
        53: {
            title: "Maybe too much inflation",
            description: "Unlock another challenge<br>The challenge is permanently unlocked after buying this upgrade",
            cost: new Decimal("1e134"),
            currencyDisplayName: "$",
            currencyInternalName: "points",
            unlocked() {
                return hasMilestone('P', 6)
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
            tooltip: "Base effect: +1.1^x<br>Base cost: 1,000,000*(10^x)",
            unlocked() { return hasMilestone('SR', 2) }
        },
    },
    doReset(resetlayer) {
        if(resetlayer == 'R') {
            if(!hasMilestone('SR', 5)) player.U.upgrades = []
            if(!inChallenge('SR', 21)) {
                if(hasMilestone('SR', 0)) player.U.upgrades.push(11, 12, 13, 14, 21, 22, 23, 24)
                if(hasMilestone('SR', 1)) player.U.upgrades.push(31, 32, 33)
                if(hasUpgrade('R', 21)) player.U.upgrades.push(34)
                if(hasMilestone('SR', 5)) player.U.upgrades.push(34, 41, 42, 43, 44)
            }
            if(inChallenge('SR', 21)) player.U.upgrades = []
        };
        if(resetlayer == 'SR') {
            if(!hasMilestone('SR', 5)) player.U.upgrades = []
            if(!inChallenge('SR', 21)) {
                if(hasMilestone('SR', 0)) player.U.upgrades.push(11, 12, 13, 14, 21, 22, 23, 24)
                if(hasMilestone('SR', 1)) player.U.upgrades.push(31, 32, 33)
                if(!hasMilestone('SR', 3)) setBuyableAmount('U', 11, new Decimal(0))
                if(hasMilestone('SR', 5)) player.U.upgrades.push(34, 41, 42, 43, 44)
            }
            if(inChallenge('SR', 21)) player.U.upgrades = []
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
    automate() {
        player.U.points = player.points
        if(!inChallenge('SR', 21)) {
            if(hasUpgrade('R', 12) || hasAchievement('A', 43)) {
                buyUpgrade('U', 11)
                buyUpgrade('U', 12)
                buyUpgrade('U', 13)
                buyUpgrade('U', 14)
                buyUpgrade('U', 21)
                buyUpgrade('U', 22)
                buyUpgrade('U', 23)
                buyUpgrade('U', 24)
            };
            if(hasAchievement('A', 31)) {
                buyUpgrade('U', 31)
            };
            if(hasAchievement('A', 33)) {
                buyUpgrade('U', 32)
                buyUpgrade('U', 33)
                buyUpgrade('U', 34)
            };
            if(layers.U.buyables[11].canAfford() && hasMilestone('SR', 7)) {
                player.U.points = player.U.points.sub(layers.U.buyables[11].cost())
                setBuyableAmount('U', 11, getBuyableAmount('U', 11).add(1))
            }
        }
        
        if(!hasUpgrade('U', 34)) {
            setClickableState('U', 11, false)
            setClickableState('U', 12, false)
            setClickableState('U', 13, false)
        };
        if(hasUpgrade('R', 32)) {
            setClickableState('U', 11, true)
            setClickableState('U', 12, true)
            setClickableState('U', 13, true)
        };
    }
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
    tabFormat: {
        "Achievements": {
            content: [
                "achievements"
            ]
        },
        "Secrets": {
            content: [
                ["layer-proxy", ["SA", [
                    ["display-text", "Secret Achievements only say what to do to get them after obtaining them<br>Most Secret Achievements will become impossible if too much progression is made before unlocking them<br>Each Secret Achievement will also eventually have its own exclusive visual theme (available in options) once I figure out how to do that<br>There will be a surprise for getting all of them once there are enough of them for it to be interesting"],
                    ["display-text", "<br>There is currently 1 Secret Achievement<br>Every Secret Achievement has a hint when hovering over them to make them possible to obtain without searching up the answers (you'll do it anyways)"],
                    "h-line",
                    "achievements"]]]
            ]
        }
    },
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
            name: "The Ninth Milestone is a Lie",
            tooltip: "Get Super Rebirth Milestone 8",
            done() {
                if (hasMilestone('SR', 7)) return true
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
            name: "Powerful",
            tooltip: "Unlock Power",
            done() {
                if (hasMilestone('SR', 8)) return true
            },
        },
        53: {
            name: "Megawatt",
            tooltip: "Reach 1,000,000 Power",
            done() {
                if (player.P.points.gte(1000000)) return true
            },
        },
        54: {
            name: "Googology",
            tooltip: "Reach e100 $",
            done() {
                if (player.points.gte("1e100")) return true
            },
        },
        55: {
            name: "The Seventh Pylon is a Lie",
            tooltip: "Buy a PPyF",
            done() {
                if (player.P.pylobF.gte(1)) return true
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
        let requirement = new Decimal(0)
        if(!inChallenge('SR', 11)) requirement = requirement.add(100000)
        if(inChallenge('SR', 11)) requirement = requirement.add("eeeeeeeee10")
        if(hasChallenge('SR', 12)) requirement = requirement.div(10)
        if(inChallenge('SR', 12)) requirement = requirement.times(10)
        return requirement
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
        remult = remult.times(layers.P.effect())
        if (hasUpgrade('U', 52)) remult = remult.times(player.P.points.add(3).log(3))
        return remult
    },
    exponent() {
        if (hasUpgrade('U', 32)) return new Decimal(0.7)
        if (!hasUpgrade('U', 32)) return new Decimal(0.5)
    },
    color: "#ba0022",
    branches: ['U'],
    effect() {
        let power = 0.6
        if (hasUpgrade('U', 33)) power = power + 0.1
        if (hasUpgrade('U', 42)) power = power + 0.1
        if (hasUpgrade('R', 33)) power = power + 0.2
        return player.R.points.pow(power).add(1)
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
        33: {
            title: "Rebirth Empowerment",
            description: "Boost RP effect, again",
            cost: new Decimal("1e23"),
            unlocked() {
                return hasMilestone('SR', 6)
            },
            tooltip: "^0.8 -> ^1",
        },
        34: {
            title: "Super Rebirth Empowerment",
            description: "Boost SRP's boost to Cash",
            cost: new Decimal("1e25"),
            unlocked() {
                return hasMilestone('SR', 6)
            },
            tooltip: "1.5x -> 1.5(x^2)",
        },
    },
    buyables: {
        11: {
            cost(x) {
                scalar = 2
                if(hasChallenge('SR', 21)) scalar = scalar - 0.5
                return new Decimal(20000).times(new Decimal(1.2).pow(new Decimal(x).pow(scalar)))
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
                scalar = 2
                if(hasChallenge('SR', 21)) scalar = scalar - 0.25
                return new Decimal(1000000).times(new Decimal(3).pow(new Decimal(x).pow(scalar)))
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
    doReset(resetlayer) {
        if(resetlayer == 'SR') {
            player.R.points = new Decimal(0)
            if(!hasMilestone('SR', 5)) player.R.upgrades = []
            if(!inChallenge('SR', 21)) {
                if(hasMilestone('SR', 1)) player.R.upgrades.push(11, 12, 13, 14)
                if(hasMilestone('SR', 3)) player.R.upgrades.push(22, 23)
                if(!hasMilestone('SR', 3)) setBuyableAmount('R', 11, new Decimal(0))
                if(!hasMilestone('SR', 3)) setBuyableAmount('R', 12, new Decimal(0))
            }
            if(inChallenge('SR', 21)) player.R.upgrades = []
        }
    },
    passiveGeneration() {
        let passive = new Decimal(0)
        if(hasChallenge('SR', 11)) passive = passive.add(0.2)
        if(hasChallenge('SR', 21)) passive = passive.times(10)
        return passive
    },
    automate() {
        if(!inChallenge('SR', 21)) {
            if(layers.R.buyables[11].canAfford() && hasMilestone('SR', 7)) {
                if(!hasMilestone('SR', 0)) player.R.points = player.R.points.sub(layers.R.buyables[11].cost())
                setBuyableAmount('R', 11, getBuyableAmount('R', 11).add(1))
            }
            if(layers.R.buyables[12].canAfford() && hasMilestone('SR', 7)) {
                if(!hasMilestone('SR', 0)) player.R.points = player.R.points.sub(layers.R.buyables[12].cost())
                setBuyableAmount('R', 12, getBuyableAmount('R', 12).add(1))
            }
        }
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
                "upgrades",
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
        let pow = 1
        if (hasUpgrade('R', 34)) pow = pow + 1
        return [player.SR.points.pow(pow).times(1.5).add(1),
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
            effectDescription: "ALL buyables are kept on Super Rebirth resets, keep RP upgrade 6 and 7, boost the $ buyable, and unlock the first challenge",
            done() {
                return player.SR.points.gte(5)
            },
            tooltip: "$ buyable boost: 1.1^x -> 1.3^x"
        },
        4: {
            requirementDescription: "8 SRP",
            effectDescription: "Raise $ gain ^1.1",
            done() {
                return player.SR.points.gte(8)
            },
        },
        5: {
            requirementDescription: "12 SRP",
            effectDescription: "Keep ALL $ and RP upgrades on Rebirth and Super Rebirth, and unlock another challenge",
            done() {
                return player.SR.points.gte(12)
            },
        },
        6: {
            requirementDescription: "18 SRP",
            effectDescription: "Unlock more upgrades (above milestone affects them)",
            done() {
                return player.SR.points.gte(18)
            },
        },
        7: {
            requirementDescription: "20 SRP",
            effectDescription: "Automate all currently unlocked buyables",
            done() {
                return player.SR.points.gte(20)
            },
        },
        8: {
            requirementDescription: "25 SRP",
            effectDescription: "Unlock Power",
            done() {
                return player.SR.points.gte(25)
            },
        },
        9: {
            requirementDescription: "100 SRP",
            effectDescription: "Every bought upgrade before Super Rebirth increases $ gain by 40% (exponential)",
            done() {
                return player.SR.points.gte(100)
            },
            effect() {
                let upgs = new Decimal(1)

                if(hasUpgrade('U', 11)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 12)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 13)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 14)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 21)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 22)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 23)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 24)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 31)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 32)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 33)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 34)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 41)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 42)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 43)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 44)) upgs = upgs.times(1.4)

                if(hasUpgrade('U', 51)) upgs = upgs.times(1.4)
                if(hasUpgrade('U', 52)) upgs = upgs.times(1.4)

                
                if(hasUpgrade('R', 11)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 12)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 13)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 14)) upgs = upgs.times(1.4)

                if(hasUpgrade('R', 21)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 22)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 23)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 24)) upgs = upgs.times(1.4)

                if(hasUpgrade('R', 31)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 32)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 33)) upgs = upgs.times(1.4)
                if(hasUpgrade('R', 34)) upgs = upgs.times(1.4)

                return upgs
            },
            tooltip() {
                return "Currently: x" + coolDynamicFormat(this.effect(), 2)
            }
        },
        10: {
            requirementDescription: "Unlock the Fourth Challenge",
            effectDescription: "Keep the fourth challenge unlocked even when $ Upgrade 5:3 is locked or removed",
            done() {
                return hasUpgrade('U', 53)
            },
            unlocked() { return hasUpgrade('U', 53) }
        }
    },
    challenges: {
        11: {
            name: "Betrayed Gods",
            challengeDescription: "You cannot Rebirth",
            canComplete() { return player.points.gte(30000000) },
            unlocked() { return hasMilestone(this.layer, 3) },
            rewardDescription: "Gain 20% of RP gain every second",
            goalDescription: "Reach 30,000,000 $"
        },
        12: {
            name: "A Low Income Family<br>in the Midst of<br>Inflation",
            challengeDescription: "$ gain ^0.5 and Rebirth requirement x10,000",
            canComplete() { return player.R.points.gte("1e15") },
            unlocked() { return hasMilestone(this.layer, 3) },
            rewardDescription: "Rebirth Requirement /10",
            goalDescription: "Reach 1e15 RP"
        },
        21: {
            name: "Clicking Simulator<br>202X",
            challengeDescription: "Nothing is kept on any resets and all automation is disabled",
            canComplete() { return player.R.points.gte("1e20") },
            unlocked() { return hasMilestone('P', 1) },
            rewardDescription: "Multiply automatic RP gain by 10 and also reduce RP buyables scaling",
            goalDescription: "Reach 1e20 RP",
            onEnter() {
                player.U.upgrades = []
                player.R.upgrades = []
                setBuyableAmount('U', 11, new Decimal(0))
                setBuyableAmount('R', 11, new Decimal(0))
                setBuyableAmount('R', 12, new Decimal(0))
            }
        },
    },
    position: 0,
})

addLayer("SA", {
    name: "secret-achievements",
    symbol: "🔮",
    // row: "side",
    type: "none",
    resource: "secretachievements",
    color: "#9966BB",
    tooltip: "SecretAchievements",
    tabFormat: [
        ["display-text", "Secret Achievements are only visible once completed<br>Most Secret Achievements will become impossible if too much progression is made before unlocking them<br>Each Secret Achievement will also eventually have its own exclusive visual theme (available in options) once I figure out how to do that<br>There will be a surprise for getting all of them once there are enough of them for it to be interesting"],
        ["display-text", "<br>There is currently 1 Secret Achievement<br>Every Secret Achievement has a hint when hovering over them to make them possible to obtain without searching up the answers (you'll do it anyways)"],
        "h-line",
        "achievements"
    ],
    unlocked: true,
    achievements: {
        11: {
            name: "Out of Order",
            tooltip() { if(!hasAchievement(this.layer, this.id)) return "That's not going to do anything"; else return "Buy $ Upgrade 7 before $ Upgrade 3<br>That's not going to do anything"},
            unlocked() { return true },
            done() { return !hasUpgrade('U', 13) && hasUpgrade('U', 23) }
        },
    },
})

addLayer("P", {
    name: "power",
    symbol: "P",
    row: "2",
    resource: "Power",
    color: "#d6c611",
    unlocked() { return hasAchievement('A', 52) },
    type: "none",
    branches: [['SR', 2]],
    layerShown() { return hasAchievement('A', 52) },
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            pylonA: new Decimal(1),
            pylonB: new Decimal(0),
            pylonC: new Decimal(0),
            pylonD: new Decimal(0),
            pylonE: new Decimal(0),
            pylonF: new Decimal(0),
            pylobA: new Decimal(0),
            pylobB: new Decimal(0),
            pylobC: new Decimal(0),
            pylobD: new Decimal(0),
            pylobE: new Decimal(0),
            pylobF: new Decimal(0),
        }
    },
    update(diff) {
        if (hasMilestone('SR', 8)) player.P.points = player.P.points.add(layers.P.clickables[11].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonA = player.P.pylonA.add(layers.P.clickables[12].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonB = player.P.pylonB.add(layers.P.clickables[13].effect().times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonC = player.P.pylonC.add(player.P.pylonD.div(10).times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonD = player.P.pylonD.add(player.P.pylonE.div(10).times(diff))
        if (hasMilestone('SR', 8)) player.P.pylonE = player.P.pylonE.add(player.P.pylonF.div(10).times(diff))
    },
    effect() {
        return player.P.points.div(100).add(1)
    },
    effectDescription() {
        return "boosting The Machine by x" + coolDynamicFormat(layers.P.effect(), 3)
    },
    position: 1,
    milestones: {
        0: {
            requirementDescription: "1 Power",
            effectDescription: "Unlock Power Pylons",
            done() {
                return player.P.points.gte(1)
            }
        },
        1: {
            requirementDescription: "2 Power Pylon A (PPyA)",
            effectDescription: "Unlock another challenge",
            done() {
                return player.P.pylobA.gte(2)
            }
        },
        2: {
            requirementDescription: "20 Power",
            effectDescription: "Unlock Power Pylon B (PPyB)",
            done() {
                return player.P.points.gte(20)
            }
        },
        3: {
            requirementDescription: "5 PPyB",
            effectDescription: "Each manually bought PPy boosts its own type by x1.15 (exponential)",
            done() {
                return player.P.pylobB.gte(5)
            }
        },
        4: {
            requirementDescription: "50,000,000 Power",
            effectDescription: "Boost PPyA's effect by x5",
            done() {
                return player.P.points.gte(50000000)
            }
        },
        5: {
            requirementDescription: "500,000,000 Power",
            effectDescription: "Unlock Power Pylon C",
            done() {
                return player.P.points.gte(500000000)
            }
        },
        6: {
            requirementDescription: "1e9 Power",
            effectDescription: "Slightly reduce Power Pylon Costs, unlock some more upgrades",
            done() {
                return player.P.points.gte("1e9")
            }
        },
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "milestones",
                "upgrades",
            ]
        },
        "Power Pylons": {
            content: [
                "main-display",
                "clickables",
            ]
        },
    },
    clickables: {
        11: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon A",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " Power"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonA, 2) + " [" + coolDynamicFormat(player.P.pylobA, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " Power/s"
            },
            canClick() { return player[this.layer].points.gte(this.cost()) },
            onClick() {
                player[this.layer].points = player[this.layer].points.sub(this.cost());
                player.P.pylonA = player.P.pylonA.add(1)
                player.P.pylobA = player.P.pylobA.add(1)
            },
            unlocked() {
                return hasMilestone('P', 0)
            },
            effect() {
                let effect = player.P.pylonA.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobA))
                if(hasMilestone('P', 4)) effect = effect.times(5)
                return effect
            },
            cost() {
                let expo = new Decimal(1.5)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                return expo.pow(player.P.pylobA)
            }
        },
        12: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon B",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyA"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonB, 2) + " [" + coolDynamicFormat(player.P.pylobB, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyA/s"
            },
            canClick() { return player[this.layer].pylonA.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonA = player[this.layer].pylonA.sub(this.cost());
                player.P.pylonB = player.P.pylonB.add(1)
                player.P.pylobB = player.P.pylobB.add(1)
            },
            unlocked() {
                return hasMilestone('P', 2)
            },
            effect() {
                let effect = player.P.pylonB.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobB))
                return effect
            },
            cost() {
                let expo = new Decimal(2)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                return expo.pow(player.P.pylobB)
            }
        },
        13: {
            style: {
                height: '100px',
                width: '200px'
            },
            title: "Power Pylon C",
            display() {
                return "Cost: " + coolDynamicFormat(this.cost(), 2) + " PPyB"
                + "<br>Count: " + coolDynamicFormat(player.P.pylonC, 2) + " [" + coolDynamicFormat(player.P.pylobC, 0) + "]"
                + "<br>Producing +" + coolDynamicFormat(this.effect(), 3) + " PPyB/s"
            },
            canClick() { return player[this.layer].pylonB.gte(this.cost()) },
            onClick() {
                player[this.layer].pylonB = player[this.layer].pylonB.sub(this.cost());
                player.P.pylonC = player.P.pylonC.add(1)
                player.P.pylobC = player.P.pylobC.add(1)
            },
            unlocked() {
                return hasMilestone('P', 5)
            },
            effect() {
                let effect = player.P.pylonC.div(10)
                if(hasMilestone('P', 3)) effect = effect.times(new Decimal(1.15).pow(player.P.pylobC))
                return effect
            },
            cost() {
                let expo = new Decimal(2.5)
                if(hasMilestone('P', 6)) expo = expo.sub(0.05)
                return expo.pow(player.P.pylobC)
            }
        },
    },
})