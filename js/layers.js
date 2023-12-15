addLayer("A", {
  row: "side",
  name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  points: new Decimal(0),
  color: "#54626F",
  layerShown: true,
  type: "none",
  tooltip() {
    return "Achievements"
  },

  achievements: {
    11: {
        name: "You Win!",
        tooltip: "Win the game.",
        done() {
          return player.w.points.gte(1)
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
    12: {
      name: "Boosting to the Max!",
      tooltip: "Buy a super booster.",
      done() {
        return hasUpgrade("w",21)
      },
      style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "10px",
            "margin": "0.5px"
          }
        },
  },
    13: {
        name: "Nice",
        tooltip: "Win 69 times.",
        done() {
          return player.w.points.gte(69)
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
    14: {
      name: "What is the point?",
      tooltip: "Reach 1 million points.",
      done() {
        return player.points.gte(1000000)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
  },
    15: {
      name: "100 is a lot",
      tooltip: "Win 100 times.",
      done() {
        return player.w.points.gte(100)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    21: {
      name: "Spending Spree",
      tooltip: "Buy each magical item at least once.",
      done() {
        if (getBuyableAmount("m",11) > 0 && getBuyableAmount("m",12) > 0 && getBuyableAmount("m",21) > 0 && getBuyableAmount("m",61) > 0 && getBuyableAmount("m",62) > 0)
        return player.points.gte(0)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    22: {
      name: "Hey, when does these upgrades end?",
      tooltip: "Buy an ultra accelerator.",
      done() {
        return hasUpgrade("w",32)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
    23: {
        name: "There is no turning back",
        tooltip() {
          return `Play for 1 hour.<br>
                  <h5>You gain a extremely small boost to point generation based on time played.<h5>` + "Currently: x" + format(calculatetimeplayed())
        },
        done() {
          if (player.timePlayed > 3600)
          return player.points.gte(0)
        },
        style() {
          return {
            "width": "110px",
            "height": " 110px",
            "border-radius": "20px",
            "border": "100px",
            "margin": "0.5px"
          }
        },
    },
    24: {
      name: "I am BETTER!",
      tooltip: "Make the accelerator stronger than super and ultra accelerators.",
      done() {
        if (getBuyableAmount("m",21) > 10)
        return player.points.gte(0)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px",
        }
      },
    },
    25: {
      name: "Hmmm maybe this will work",
      tooltip: "Beat challenge 'Desperation'.",
      done() {
        if (challengeCompletions("m",11) > 0)
        return player.w.points.gte(0)
      },
      style() {
        return {
          "width": "110px",
          "height": " 110px",
          "border-radius": "20px",
          "border": "100px",
          "margin": "0.5px"
        }
      },
    },
  
    
    
},
  tabFormat: {
    "Normal Achievements": {
        content: [
          "achievements"


        ],

    },
    "Secret Achievements": {
        content: [
        
        ],
    }   
},
}




),
addLayer("w", {
Max() {
  if (hasMilestone(this.layer,5))  {return true}
},
milestones: {
    1: {
        requirementDescription: "Win the game total of 200 times.",
        effectDescription: "You start with the second row of upgrades available for purchase.",
        done() { return player.w.points.gte(200) },
        style: { "width": "450px",
        "height": " 105px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "white",
      } 

    },
    2: {
      requirementDescription: "Win the game total of 300 times.",
      effectDescription: "Make the ultra accelerator upgrade 50 wins cheaper.",
      done() { return player.w.points.gte(300) },
      style: { "width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
    
      } 

    },
    3: {
      requirementDescription: "Win the game total of 400 times.",
      effectDescription: "You unlock an autobuyer for the first two rows of upgrades.",
      done() { return player.w.points.gte(400) },
      style: { "width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
    
    } 

    },
    4: {
      requirementDescription: "Win the game total of 500 times.",
      effectDescription: "Autobuyer now works for the third row of upgrades.",
      done() { return player.w.points.gte(500) },
      style: { "width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
    
    } 

    },
    5: {
      requirementDescription: "Win the game total of 850 times.",
      effectDescription: "Unlock the ability to max win.",
      done() { return player.w.points.gte(850) },
      style: { "width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
    
    } 

    },
    6: {
      requirementDescription: "Win the game total of ??? times.",
      effectDescription: "Unlock auto-win.",
      done() { return player.w.points.gte(999) },
      style: { "width": "450px",
      "height": " 105px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "white",
    
    } 

    }
},

doReset(w) {
  // Stage 1, almost always needed, makes resetting this layer not delete your progress
  if (layers[w].row <= this.row) return;

  // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
  let keptUpgrades = []
  if (layer == "w" && hasMilestone(w,3)) keptUpgrades.push()
  let keptMilestones = []
  if (hasMilestone("w", 1)) keptMilestones.push(1)

  // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
  let keep = [];
  if (hasMilestone("w",1)) keep.push("milestones"),
  keep.push("best")
  


  // Stage 4, do the actual data reset
  layerDataReset(this.layer, keep);

  // Stage 5, add back in the specific subfeatures you saved earlier
  player[this.layer].upgrades.push(keptUpgrades)
},
automate(){
  if (hasMilestone("w",3)) {
    buyUpgrade(this.layer,"11"), buyUpgrade(this.layer,"12"),  buyUpgrade(this.layer,"13"),  buyUpgrade(this.layer,"21"),  buyUpgrade(this.layer,"22"),  buyUpgrade(this.layer,"23")
  };
  if (hasMilestone("w",4)) {
    buyUpgrade(this.layer,"31"), buyUpgrade(this.layer,"32"),  buyUpgrade(this.layer,"33")
  }

},
    name: "win", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "yellow",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "wins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6,// Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (inChallenge('m',21)) mult = mult.pow(2)
        if (hasUpgrade('w', 13)) mult = mult.divide(upgradeEffect('w', 13))
        if (hasUpgrade('w', 23)) mult = mult.divide(upgradeEffect('w', 23))
        if (hasUpgrade('w', 33)) mult = mult.divide(upgradeEffect('w', 33))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Win the game!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
      "Main": {
          content: [
            "main-display",
            "prestige-button",
            "blank",
            "blank",
            "upgrades",

          ],

      },
      "Win Milestones": {
          content: [
            "resource-display",
            "blank",
            "milestones"
          ],
          unlocked() {
            if (hasMilestone("w",1)) {
              return true
            }
            else {
              return false
            }
          }
        
      },
      
  },
    
    upgrades: {
        11: {
            title: "Booster",
            description () {
              if (inChallenge("m", 11)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                if (getBuyableAmount('m',11) > 0 ) { 
                  return "Boosts your production by " + format(buyableEffect('m',11).mul(2)) + "x"
                  
              } else {
                  return "Doubles your point gain." 
              }
              }
                
            
            },
            cost() {
              if (inChallenge("m", 11)) {
                return new Decimal("e999999999")
                
              } else {
                return new Decimal(1)
              }
            },
            
            style() {
               if (hasUpgrade('w',11)) return {background: "#FFFFFF"}
              },
            effect() {
                return format(buyableEffect('m',11).mul(2))
            },

  
            
        },
        12: {
            
            title: "Accelerator",
            description: "Provides a boost based on how many wins you have.",
            cost: new Decimal(3),
            effect() {
              if (getBuyableAmount("m",12) > 0) {
                return player[this.layer].points.add(1).pow(getBuyableAmount("m",12).divide(11).add(0.5))
                
              } else {
                return player[this.layer].points.add(1).pow(0.5)
              }
                
            },
            effectDisplay() {
               return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style() {
                if (hasUpgrade('w',12)) return {background: "#62BBC1"}
               }
            },
            
        13: {
            title: "Divisor",
            description: "Makes it easier to win. (Based on how many points you have)",
            cost: new Decimal(5),
            effect() {
                return Math.log10(Math.sqrt(Math.sqrt(player.points.add(1)))) + 1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷"},
        },
        21: {
            title: "Super Booster",
            description () {
              if (inChallenge("m", 11)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Quadruples your point gain." 
            }
            },
            cost() { 
              if (inChallenge("m", 11)) {
                return new Decimal("e999999999")
              }
              
              else {
                if (getBuyableAmount('m',21) > 0 ) {
                  return new Decimal(10).minus(buyableEffect('m',21))
              } else {
                  return new Decimal(10)  
              }
              }
            },
            unlocked() {
              if (hasMilestone(this.layer, 1)) {
                return true
              } else {
                if (hasUpgrade("w",13)) {
                  return true
                  
                } else {
                  return false
                }
              }
                
            },
            style() {
                if (hasUpgrade('w',21)) return {background: "#FFFFFF"}
               }
            
        },
        22: {
            title: "Super Accelerator",
            description: "Accelerator but simply better.",
            cost() {
                if (getBuyableAmount('m',21) > 0 ) {
                    return new Decimal(20).minus(buyableEffect('m',21))
                } else {
                    return new Decimal(20)  
                }
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.8)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
              if (hasMilestone(this.layer, 1)) {
                return true
              } else {
                if (hasUpgrade("w",21)) {
                  return true
                  
                } else {
                  return false
                }
              }
                
            },
            style() {
                if (hasUpgrade('w',22)) return {background: "#62BBC1"}
               }
        },
        23: {
            title: "Super Divisor",
            description: "What, you want even easier wins? Sure, you can have it.",
            cost() {
                if (getBuyableAmount('m',21) > 0 ) {
                    return new Decimal(55).minus(buyableEffect('m',21))
                } else {
                    return new Decimal(55)  
                }
            },
            effect() {
                return Math.log10(player.points.add(1)) + 1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷" },
            unlocked() {
              if (hasMilestone(this.layer, 1)) {
                return true
              } else {
                if (hasUpgrade("w",22)) {
                  return true
                  
                } else {
                  return false
                }
              }
                
            },
        },
        31: {
            title: "Ultra Booster",
            description () {
              if (inChallenge("m", 11)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Octuples your point gain." 
            }
            },
            cost() {
              if (inChallenge("m", 11)) {
                return new Decimal("e999999999")
                
              } else {
                return new Decimal(70)
              }
            },
            unlocked() {
                return hasUpgrade('w', 23)
            },
            style() {
                if (hasUpgrade('w',31)) return {background: "#FFFFFF"}
               }
        },
        32: {
            title: "Ultra Accelerator",
            description: "Other accelerators are jealous of this one.",
            cost(){
              if (hasMilestone("w",2)) {
                return new Decimal(150)
              } else {
                return new Decimal(200)
              }
              
            },
            effect() {
                return player[this.layer].points.add(1).pow(1.45)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                return hasUpgrade('w', 31)
            },
            style() {
                if (hasUpgrade('w',32)) return {background: "#62BBC1"}
               }
        },
        33: {
            title: "Ultra Divisor",
            description: "Winning has never been this easy before.",
            cost: new Decimal(500),
            effect() {
                return Math.log10(player.points.add(1).pow(1.15)) + 1.5
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷" },
            unlocked() {
                return hasUpgrade('w', 32)
            }
        },
        
        
        
    },
})

addLayer("m", {
  infoboxes: {
    lore: {
        title: "Who are you?",
        body() { return "You encounter a stranger." },
        
    },
    
},
    tabFormat: {
      "Shop": {
          content: [
            "main-display",
            "prestige-button",
            "blank",
            "resource-display",
            "buyables",
            "blank",
            ["infobox",["lore"]],
          ],

      },
      "Mystic Field": {
          content: [
            "challenges"
          ],

        
      },
      
    },
    name: "magical field", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#5941A9",
    requires : new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "magical shards", // Name of prestige currency
    baseResource: "wins", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1.5)
        if (getBuyableAmount("m",62) > 0); mult = mult.mul(buyableEffect("m",62))
        if (challengeCompletions("m", 11) == 1) mult = mult.mul(challengeEffect("m",11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){
        return true
    },
    roundUpCost: true,
    challenges: {
      11: {
        name: "Desperation",
        challengeDescription: "You try to get rid of your boosters to reach the voice.",
        canComplete: function() {return player.w.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "Boosters effect the magical shard gain with a heavily reduced effect.",
        rewardEffect() {
          let effect = new Decimal(1)
          if (hasUpgrade("w",11)) effect = effect.mul(upgradeEffect("w",11))
          if (hasUpgrade("w",21)) effect = effect.mul(4)
          if (hasUpgrade("w",31)) effect = effect.mul(8) // Upgradelerin effectleri yok diye böyle yaptım ileride değiştirmen gerekebilir.
          effect = effect.pow(0.1)
          return effect
        },
        rewardDisplay() {
          return "x" + format(challengeEffect(this.layer,"11"))
        },
        
    },
      12: {
        name: "idk",
        challengeDescription: "All accelerator types are disabled.",
        canComplete: function() {return player.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "idk",
        unlocked() {
          return false
        }
      },
      13: {
        name: "idk",
        challengeDescription: "All divisor types are disabled.",
        canComplete: function() {return player.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "idk",
        unlocked() {
          return false
        }
      },
      21: {
        name: "idk",
        challengeDescription: "Winning requirement is raised to the power of 2",
        canComplete: function() {return player.w.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "idk",
        unlocked() {
          return false
        }
      },
    },
    buyables: {
        11: {
            purchaseLimit:99,
            title: "Powered Shard",
          cost(x) {
            if (x < 5) {
              let PowerI = new Decimal(2)
              let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              if (getBuyableAmount('m',61) > 0) {
                Calculation = Calculation.divide(buyableEffect('m',61))
                return Calculation
              } else {
                return Calculation 
              }
              
            }
            else {
              let PowerI = new Decimal(1.8)
              let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              if (getBuyableAmount('m',61) > 0) {
                Calculation = Calculation.divide(buyableEffect('m',61))
                return Calculation
              } else {
                return Calculation 
              }
            }
          },
          display() {
            return `Triples your first booster power for each purchase.<br>
            x${format(tmp[this.layer].buyables[this.id].effect)} Booster Power</b><br>
        <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
        <br> ${format(getBuyableAmount('m',11))} /99 Bought`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            return {
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              
            }
          },
          buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {        let PowerI = new Decimal(3)
            let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
            return Effect;
          },
          unlocked() {
            return true
          }
        },
        12: {
            title: "Energized Shard",
            purchaseLimit:15,   
            cost(x) {
                let PowerI = new Decimal(2)
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                if (getBuyableAmount('m',61) > 0) {
                  Calculation = Calculation.divide(buyableEffect('m',61))
                  return Calculation
                } else {
                  return Calculation 
                }
            },
            display() {
              return `Makes your first accelerator formula better.<br>
              Wins^0.5 => Wins^(0.5 + ${format(getBuyableAmount('m',12).divide(11))}) </b><br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',12))} /15 Bought`
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            style() {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                
              }
            },
            buy() {
              player[this.layer].points = player[this.layer].points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {        let PowerI = new Decimal(2)
              let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          21: {
            purchaseLimit: 3,
            title: "Sharp Shard",
            cost(x) {
              let PowerI = new Decimal(2)
              
              let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
              return Calculation;
            },
            display() {
              return `Makes your super upgrades 3 wins cheaper.<br>
              ${format(tmp[this.layer].buyables[this.id].effect)} Wins Cheaper</b><br>
          <h1>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h1>
          <br> ${format(getBuyableAmount('m',21))} /3 Bought`
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            style() {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
              }
            },
            buy() {
              player[this.layer].points = player[this.layer].points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {        let PowerI = new Decimal(3)
              let Effect = new Decimal(0).add(x).mul(3)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          61: {
            purchaseLimit: 15,
            title: "'Point'less Shard",
            cost(x) {
              let PowerI = new Decimal(10)
              
              let Calculation = new Decimal(1).mul(Math.pow(PowerI,(x.add(x.add(10)))))
              return Calculation;
            },
            display() {
              return `Makes items that cost magical sharp cheaper.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
          <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
          <br> ${format(getBuyableAmount('m',61))} /15 Bought`
            },
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
              }
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
              let Effect = x.mul(1.5)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          62: {
            purchaseLimit: 15,
            title: "? Shard",
            cost(x) {
              let PowerI = new Decimal(10)
              
              let Calculation = new Decimal(1).mul(Math.pow(PowerI,(x.add(x.add(10)))))
              return Calculation;
            },
            display() {
              return `Increases magical sharp gain.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Sharp Gain </b><br>
          <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
          <br> ${format(getBuyableAmount('m',61))} /15 Bought`
            },
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
              }
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
              let Effect = Math.pow(2,x)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          
    },
    




})


