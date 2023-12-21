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
        image: "youwin.png"
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
      tooltip: "Buy five different types of item from the shop.",
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
                  <h5>Reward: You gain an extremely small boost to point generation based on time played.<h5>` + "Currently: x" + format(calculatetimeplayed())
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
        effect() {
          return calculatetimeplayed()
        }
    },
    24: {
      name: "I am BETTER!",
      tooltip: "Make the accelerator stronger than super and ultra accelerators.",
      done() {
        if (getBuyableAmount('m', 12) > 10)
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
      tooltip() {
        return `Beat challenge 'Desperation'<br>
                <h5>Reward: You gain 2 times more magical shards.<h5>` 
      },
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
    31: {
      name: "Who needs boosters?",
      tooltip: "Reach 1000 wins without any boosters.",
      done() {
          if (!hasUpgrade("w",11)){
            if(!hasUpgrade("w",21)) {
              if(!hasUpgrade("w",31)) {
                return player.w.points.gte(1000)
              }
            }
          }

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
    32: {
      name: "What am I gonna do with all of these?",
      tooltip: "Reach 10k wins.",
      done() {
        
        return player.w.points.gte(10000)
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
    33: {
      name: "Who is desperate now?",
      tooltip() {
        return `Reach 666 wins in 'Desperation'<br>
                <h5>Reward: Your base point production is doubled in challenges.<h5>` 
      },
      done() {
        if (inChallenge('m',11)) {
          return player.w.points.gte(666)
        } else {
          return player.w.points.gte("e9999999")
        }
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
    34: {
      name: "Nothing can hold me back",
      tooltip() {
        return `Reach 6666 wins in 'Placeholder 2'<br>
                <h5>Reward: Your base point production is doubled in challenges. (I know, it's really original.)<h5>` 
      },
      done() {
        if (inChallenge('m',22)) {
          return player.w.points.gte(6666)
        } else {
          return player.w.points.gte("e9999999")
        }
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
    35: {
      name: "A bit closer to heaven",
      tooltip: "Coming soon",
      done() {
        
        return player.w.points.gte(112313123120)
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
    92: {
      name: "Do you even know how this works?",
      goalTooltip: "???",
      doneTooltip: "Go below 0 points per second",
      done() {
        if (getPointGen() < 0) {
          return player.points.gte(0)
        }
        
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
          ["achievements","123"]


        ],

    },
    "Secret Achievements": {
        content: [
          ["achievements","9"]
        
        ],
    }   
},
}




),

addLayer("w", {
displayRow: 2,
autoUpgrade() {

  if (player.w.auto == true)
  return true
   
},

canBuyMax() {
  if(hasMilestone(this.layer,4)) return true
},
milestones: {
    1: {
        requirementDescription: "Win the game total of 200 times.",
        effectDescription: "You start with the second row of upgrades available for purchase.",
        done() { return player.w.points.gte(200) },
        style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 
    },
    2: {
      requirementDescription: "Win the game total of 600 times.",
      effectDescription: "Make the ultra accelerator upgrade 50 wins cheaper.",
      done() { return player.w.points.gte(600) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 

    },
    3: {
      requirementDescription: "Win the game total of 700 times.",
      effectDescription: "You unlock an autobuyer for win upgrades.",
      done() { return player.w.points.gte(700) },
      toggles: [["w","auto"]
      ],
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 

    },
    4: {
      requirementDescription: "Win the game total of 900 times.",
      effectDescription: "Unlock the ability to max win.",
      done() { return player.w.points.gte(900) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
      } 

    },
    5: {
      requirementDescription: "Win the game total of 10000 times.",
      effectDescription: "Unlock passive magical shard generation.",
      done() { return player.w.points.gte(10000) },
      style(){
        if (hasMilestone(this.layer,this.id)) {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white",
          "background-color": "#a66c00"
        }
        }
         else {
          return {"width": "450px",
          "height": " 105px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "white"}
          
        }
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
    name: "win", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    auto: false,
    color: "#FFC436",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "wins", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6,// Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('w', 13)) mult = mult.divide(upgradeEffect('w', 13))
        if (hasUpgrade('w', 23)) mult = mult.divide(upgradeEffect('w', 23))
        if (hasUpgrade('w', 33)) mult = mult.divide(upgradeEffect('w', 33))
        if (hasChallenge('m',23)) mult = mult.divide(challengeEffect('m',23))
        if (!inChallenge("m",13) && !inChallenge("m",12) && !inChallenge("m",11) && !inChallenge("m",21) && !inChallenge("m",22) && !inChallenge("m",23) && !inChallenge("m",31)) {if (hasChallenge("m", 12) == 1) mult = mult.divide(challengeEffect("m",12))}
        if (inChallenge('m',23)) mult = mult.divide(Math.pow(upgradeEffect('w', 11),4.6))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (inChallenge('m',23)) exp=exp.divide(50)
        if (inChallenge('m',31)) exp=exp.divide(1.2)
        
        return exp

    },
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Win the game!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    infoboxes: {
      Firstbox: {
          title: "Strange Yet Familliar...",
          body() { return "You find yourself in middle of nothingness. You are filled with a strange yet familliar feeling. In front of you there is a button, glowing in the darkness. 'Click n Win' it says. You hesitate but can't help yourself from clicking it. A yellow text appears in the sky(even though it's hard to tell if it's the sky.) Finally, you decide to keep clicking this button until you figure out a way to escape this place." },
          
      },
      EndlessVoid: {
        title: "Endless Void",
        body() { return "You are currently travelling through the endless void. Boosters and accelerators are disabled. Winning requirement increases rapidly. Maybe if you travel enough you'll find a way out of this place." },
        unlocked() { 
          if (inChallenge('m',31)) {
            return true
          } else {
            return false
          }
        },
        style: {"border-color": "purple","color": "grey"},
        titleStyle: {"border-color": "purple","color": "black"},
        bodyStyle: {"border-color": "purple"}
    },
    },
    tabFormat: {
      "Main": {
          content: [
            ["infobox",["Firstbox"]],
            ["infobox",["EndlessVoid"]],
            "blank",
            "main-display",
            "prestige-button",
            "blank",
            "blank",
            "upgrades",

          ],

      },
      "Win Milestones": {
          content: [
            "main-display",
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
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                if (getBuyableAmount('m',11) > 0 ) { 
                  return "Boosts your production by " + upgradeEffect(this.layer,this.id) + "x"
                  
              } else {
                  return "Doubles your point gain." 
              }
              }
                
            
            },
            cost() {
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999999999")
                
              } else {
                return new Decimal(1)
              }
            },
            
            style() {
               if (hasUpgrade('w',11)) return {background: "#ECF8F9"}
              },
            effect() {
              return format(buyableEffect('m',11).mul(2))
            },

  
            
        },
        12: {
            
            title: "Accelerator",
            description () {
              if (inChallenge("m", 12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Provides a boost based on how many wins you have." 
            }
            },
            cost() {
              if (inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999999999")
                
              } else {
                return new Decimal(3)
              }
            },
            effect() {
              if (getBuyableAmount("m",12) > 0) {
                return player[this.layer].points.add(1).pow(getBuyableAmount("m",12).divide(11).add(0.5)).mul(upgradeEffect(this.layer,24))
                
              } else {
                return player[this.layer].points.add(1).pow(0.5).mul(upgradeEffect(this.layer,24))
              }
                
            },
            effectDisplay() {
              if (inChallenge("m",12)) {
                return "No effect"
              } else {
                return format(upgradeEffect(this.layer, this.id))+"x" // Add formatting to the effect 
              }
            },
            style() {
                if (hasUpgrade('w',12)) return {background: "#068DA9"}
               }
            },
            
        13: {
            title: "Divisor",
            description: "Makes it easier to win. (Based on how many points you have)",
            cost: new Decimal(5),
            effect() {
                return Math.log10(Math.sqrt(Math.sqrt(player.points.add(1)))) + 1 + +upgradeEffect(this.layer,34)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷"},
            style() {
              if (hasUpgrade('w',13)) return {background: "#E55807"}
             }
        },
        
        14: {
          title: "Empowerer",
          description: "Empowers your production based on your magical shards.",
          cost: new Decimal(15),
          effect() {
            if (hasUpgrade(this.layer,this.id)) {
              return Math.log(player.m.points)
            }
            else {
              return 0
            }
          },
          effectDisplay(){ return format(upgradeEffect(this.layer, this.id)) + "x"},
          unlocked() {
            if (hasChallenge("m",13)) {
               return true
              } else {
               return false
            }
         },
         style() {
          if (hasUpgrade('w',14)) return {background: "#7E1717"}
         }
         
         
        },
        21: {
            title: "Super Booster",
            description () {
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Quadruples your point gain." 
            }
            },
            cost() { 
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {
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
                if (hasUpgrade('w',21)) return {background: "#ECF8F9"}
               }
            
        },
        22: {
            title: "Super Accelerator",
            description () {
              if (inChallenge("m", 12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Accelerator but simply better." 
            }
            },
            cost() {
              if (inChallenge("m", 12)||inChallenge("m",31)) {
                return new Decimal("e999999999")
              } else {
                if (getBuyableAmount('m',21) > 0 ) {
                  return new Decimal(20).minus(buyableEffect('m',21))
              } else {
                  return new Decimal(20)  
              }
              }
                
            },
            effect() {
                return player[this.layer].points.add(1).pow(0.8).mul(upgradeEffect(this.layer,24))
            },
            effectDisplay() {
              if (inChallenge("m",12)||inChallenge("m",31)) {
                return "No effect"
              } else {
                return format(upgradeEffect(this.layer, this.id))+"x" // Add formatting to the effect 
              }
            },
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
                if (hasUpgrade('w',22)) return {background: "#068DA9"}
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
                return Math.log10(player.points.add(1)) + 1 + +upgradeEffect(this.layer,34)
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
            style() {
              if (hasUpgrade('w',23)) return {background: "#E55807"}
             }
        },
        24: {
          title: "Mighty Empowerer",
          description: "Empowers your accelerators based on your wins.",
          cost() {
            return new Decimal(80)
        },
          effect() {
            if (hasUpgrade(this.layer,this.id)) {
              return (player.w.points).pow(0.3)
            }
            else {
              return 1
            }
          },
          effectDisplay() { return "" + format(upgradeEffect(this.layer, this.id)) + "x"},
          unlocked() {
            if (hasChallenge("m",13)) {
               return true
              } else {
               return false
            }
         },
         style() {
          if (hasUpgrade('w',24)) return {background: "#7E1717"}
         }
        
        },
        31: {
            title: "Ultra Booster",
            description () {
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {          
                return "This upgrade cannot be bought inside of this challenge."
              } else {
                return "Octuples your point gain." 
            }
            },
            cost() {
              if (inChallenge("m", 11)||inChallenge("m",12)||inChallenge("m",31)) {
                return new Decimal("e999999999")
                
              } else {
                return new Decimal(70)
              }
            },
            unlocked() {
                return hasUpgrade('w', 23)
            },
            style() {
                if (hasUpgrade('w',31)) return {background: "#ECF8F9"}
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
                return player[this.layer].points.add(1).pow(1.45).mul(upgradeEffect(this.layer,24))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked() {
                return hasUpgrade('w', 31)
            },
            style() {
                if (hasUpgrade('w',32)) return {background: "#068DA9"}
               }
        },
        33: {
            title: "Ultra Divisor",
            description: "Winning has never been this easy before.",
            cost: new Decimal(500),
            effect() {
                return Math.log10(player.points.add(1).pow(1.15)) + 1.5 + +upgradeEffect(this.layer,34)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "÷" },
            unlocked() {
                return hasUpgrade('w', 32)
            },
            style() {
              if (hasUpgrade('w',33)) return {background: "#E55807"}
             }
        },
        34: {
          title: "True Empowerer",
          description: "Empowers your divisors based on your points.",
          cost: new Decimal(1500),
          effect() {
            if (hasUpgrade(this.layer,this.id)) {
              return (player.points).pow(0.2)
            }
            else {
              return 0
            }
          },
          effectDisplay() { return "Adding +" + format(upgradeEffect(this.layer, this.id)) + " power to your divisors."},
          unlocked() {
            if (hasChallenge("m",13)) {
              if (hasUpgrade("w",33)) {
                return true
              } else {
                return false
              }
              
            }
         },
         style() {
          if (hasUpgrade('w',34)) return {background: "#7E1717"}
         }

        },
        
        
        
        
    },
    
})

addLayer("m", {
  infoboxes: {
    lore: {
        title: "blah",
        body() { return "I'll write something here when I'm not lazy" },
    },
    
},
    tabFormat: {
      "Shop": {
          content: [
            
            ["infobox", "lore"],
            "main-display",
            "prestige-button",
            "blank",
            "resource-display",
            "buyables",
            "blank",     
            
          ],

      },
    
      "Challenges": {
          content: [
            ["display-text",
            function() { return 'Challenges may be too hard if attempted too early.<br>Lower rows are harder than higher rows.<br>'},
            { "color": "grey", "font-size": "13px"}],
            "blank",
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
    passiveGeneration() {return hasMilestone('w',5) ? 0.1 : 0},
    color: "#5941A9",
    requires : new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "magical shards", // Name of prestige currency
    baseResource: "wins", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      exponent = new Decimal(1)
      if (hasChallenge(this.layer,22)){exponent=exponent.add(1)}
      return exponent
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1.5)
        if (getBuyableAmount("m",62) > 0); mult = mult.mul(buyableEffect("m",62))
        if (challengeCompletions("m", 11) == 1) mult = mult.mul(challengeEffect("m",11))
        if (hasAchievement("A",25)) mult = mult.mul(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        exp = exp.mul(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){
        return true
    },
    roundUpCost: true,
    challenges: {
      11: {
        name: "Desperation",
        challengeDescription: "You can not buy any boosters.",
        canComplete: function() {return player.w.points.gte(100)},
        goalDescription: "Reach 100 wins to complete the challenge.",
        rewardDescription: "Boosters effect the magical shard gain with heavily reduced effect.",
        rewardEffect() {
          let effect = new Decimal(1)
          if (hasUpgrade("w",11)) effect = effect.mul(upgradeEffect("w",11))
          if (hasUpgrade("w",21)) effect = effect.mul(4)
          if (hasUpgrade("w",31)) effect = effect.mul(8) // Upgradelerin effectleri yok diye böyle yaptım ileride değiştirmen gerekebilir.
          effect = effect.pow(0.1)
          return effect
        },
        rewardDisplay() {
          return format(challengeEffect(this.layer,"11")) + "x"
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",

        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
        
        
    },
      12: {
        name: "Dismay",
        challengeDescription: "You can not buy any boosters or accelerators.",
        canComplete: function() {return player.w.points.gte(80)},
        goalDescription: "Reach 80 wins to complete the challenge.",
        rewardDescription: "Magical shards make winning easier. (Only works outside of challenges.)",
        rewardEffect() {
          let effect = new Decimal(1)
          effect = effect.add(Math.sqrt((player.m.points)))
          if (effect < 50000000) {
            return effect
          } else {
            return 50000000
          }
          
          
          
        },
        rewardDisplay() {
          if (challengeEffect(this.layer,"12") > 49999999) {
            return format(challengeEffect(this.layer,"12")) + "÷ (Capped)"
          } else {
            return format(challengeEffect(this.layer,"12")) + "÷"
          }
            

          
        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",

        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      13: {
        name: "Appallment",
        challengeDescription: "Buying an upgrade divides your point production by 100.",
        canComplete: function() {return player.w.points.gte(250)},
        goalDescription: "Reach 250 wins to complete the challenge.",
        rewardDescription: "Unlock new upgrades.",
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",

        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      21: {
        name: "Placeholder 1",
        challengeDescription: "Point production is raised to the power of 0.1. Also your wins multiply your production based on their value in sin function. Tip: You may want to use a calculator.",
        canComplete: function() {return player.w.points.gte(101)},
        goalDescription: "Reach 101 wins to complete the challenge.",
        rewardDescription: "Point generation is increased to the power of 1.08",
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",

        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      22: {
        name: "Placeholder 2",
        challengeDescription: "Your wins divide point production.",
        canComplete: function() {return player.w.points.gte(2700)},
        goalDescription: "Reach 2700 wins to complete the challenge.",
        rewardDescription: "Improve the magical shard gain formula.<br>(I don't know the formula lol, but it works trust me.)",
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",

        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
      },
      23: {
        name: "Placeholder 3",
        canComplete: function() {return player.w.points.gte(50)},
        fullDisplay()
        {return `Winning is extremely nerfed but your booster weakens this nerf.<br>
        Goal: Reach 50 wins to complete the challenge.<br>
        Reward: The boosters' effect on winning works outside of this challenge with reduced effect.<br>
        Currently: ${format(challengeEffect(this.layer,this.id))}÷`
        },
        unlocked() {
          if (hasChallenge(this.layer, 11)) {
            return true
            
          } else {
            return false
          }
          
        },
        rewardEffect() {
          let effect = new Decimal(1)
          if (hasUpgrade('w',11)) {
            effect = effect.add(Math.pow(upgradeEffect('w', 11),0.95))
            return effect
          } else {
            return effect
          }
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",

        "text-shadow": "0px 0px 10px white",
        "color":"white"},
        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          }
        
      },
      31: {
        name: "Endless Void",
        challengeDescription: "",
        goal() {
          let x = new Decimal(challengeCompletions(this.layer, this.id)).sub(1)
          x = x.add(1)
          let base = new Decimal(70)
          let power = new Decimal(30)
          let calc = new Decimal(base).add(power.mul(x))
          return calc;
         },
        canComplete() {
        var sc = tmp[this.layer].challenges[this.id]
         
        let threshold = player.w.points.gte(sc.goal) // add any currency here
        return threshold 
        },
        fullDisplay()
        {if (challengeCompletions(this.layer,this.id) > 0) {
          return `There's nothing left. You tried everything, bought every upgrade, every item, travelled for days yet the void seems endless. Maybe there is something else you need to do.<br>
        Goal: ${(Math.round(challengeCompletions(this.layer,this.id)*30 + 70))} wins<br>
        Completions: ${Math.round(challengeCompletions(this.layer,this.id))} <br>
        <h5>Reward for first completion: Unlock a new item in the shop. <br>
        Reward: The 'pointless' and ? sharp items are cheaper based on completions. </h5>
        `
        } else {
          return `There's nothing left. You tried everything, bought every upgrade, every item, travelled for days yet the void seems endless. Maybe there is something else you need to do.<br>
          Goal: Only <p9>god</p9> knows.<br>
          `
        }
        },
        rewardDescription: "idk",
        completionLimit: 100,
        unlocked() {
          if (hasChallenge(this.layer, 23)) {
            return true
            
          } else {
            return false
          }
        },
        style: {"backgroundColor": "#392467","width": "250px",

        "border-radius": "20px",
        "text-shadow": "0px 0px 10px white",
        "color":"white"},

        enterButtonStyle: {
          "glow":"0px 0px 10px black",
          "color":"white",
          "background-color": "#132043",
          "border-radius": "10px"
          
          }
        

      },
        
      },
      
    buyables: {
        11: {
            purchaseLimit:999,
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
              let PowerI = new Decimal(2.1)
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
        <br> ${format(getBuyableAmount('m',11))} /999 Bought`
          },
          canAfford() {
            return player[this.layer].points.gte(this.cost())
          },
          style() {
            if (this.canAfford()||getBuyableAmount("m",11) == 99) return {
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#5941A9"}
            if (!this.canAfford()) return {
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#77567F"
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
            if (getBuyableAmount(this.layer,this.id) == 15) {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#6A3076"}
              } else{
            if (this.canAfford()||getBuyableAmount("m",12) == 15) return {
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#5941A9"}
            if (!this.canAfford()) return {
              "width": "250px",
              "height": " 125px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#FFFFFF",
              "background-color": "#77567F"
            }
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
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',21))} /3 Bought`
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            style() {
            if (getBuyableAmount(this.layer,this.id) == 3) {
              return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#6A3076"}
            } else {
              if (this.canAfford()||getBuyableAmount("m",21) == 3) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#5941A9"}
              if (!this.canAfford()) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#77567F"
              }
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
          22: {
            purchaseLimit: 999,
            title: "Shard of the Void",
            cost(x) {
              let Calculation = new Decimal("e15")
              if (x < 30) {
                let PowerI = new Decimal(5)
                Calculation = new Decimal("e15").mul(Decimal.pow(PowerI, x.pow(1)))
              } else {
                let PowerI = new Decimal(6)
                Calculation = new Decimal("e15").mul(Decimal.pow(PowerI, x.pow(1)))
              }
              if (getBuyableAmount('m',61) > 0) {
                Calculation = Calculation.divide(buyableEffect('m',61))
                return Calculation
              } else {
                return Calculation 
              }
          },
            display() {
              return `Wins provide a boost to the point production.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} to Point Production</b><br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Magical Shards</h2>
          <br> ${format(getBuyableAmount('m',22))} /999 Bought`
            },
            canAfford() {
              return player.m.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",62) == 999) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#5941A9"}
              if (!this.canAfford()) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#77567F"
              }
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
              let Effect = new Decimal(1).add(Math.log(player.w.points + 10)*(Math.pow(1.5,x)))
              return Effect;
            },
            unlocked() {
              if (challengeCompletions('m',31) > 0) {
                return true
              } else {
                return false
              }
              
            }
          },
          61: {
            purchaseLimit: 999,
            title: "'Point'less Shard",
            cost(x) {
              let PowerI = new Decimal(10)
              
              let Calculation = new Decimal(1).mul(Math.pow(PowerI,(x.add(x.add(12)))))
              if (challengeCompletions(this.layer,31) > 0) {
                Calculation = Calculation.divide(Math.pow(200,challengeCompletions(this.layer,31)))
                return Calculation
              } else {
                return Calculation
              }
              
            },
            display() {
              return `Makes items that cost magical shard cheaper.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} Cheaper </b><br>
          <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
          <br> ${format(getBuyableAmount('m',61))} /999 Bought`
            },
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",61) == 15) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#5941A9"}
              if (!this.canAfford()) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#77567F"
              }
            },
            buy() {
              player.points = player.points.sub(this.cost())
              setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
              let Effect = new Decimal(1.1).pow(x)
              return Effect;
            },
            unlocked() {
              return true
            }
          },
          62: {
            purchaseLimit: 999,
            title: "? Shard",
            cost(x) {
              let PowerI = new Decimal(10)
              
              let Calculation = new Decimal(1).mul(Math.pow(PowerI,(x.add(x.add(12))))).mul(x.mul(2).add(1))
              if (challengeCompletions(this.layer,31) > 0) {
                Calculation = Calculation.divide(Math.pow(200,challengeCompletions(this.layer,31)))
                return Calculation
              } else {
                return Calculation
              }
              
            },
            display() {
              return `Increases magical shard gain.<br>
              x${format(tmp[this.layer].buyables[this.id].effect)} to Magical Shard Gain </b><br>
          <h1>${format(tmp[this.layer].buyables[this.id].cost)} Points</h1>
          <br> ${format(getBuyableAmount('m',62))} /999 Bought`
            },
            canAfford() {
              return player.points.gte(this.cost())
            },
            style() {
              if (this.canAfford()||getBuyableAmount("m",62) == 15) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#5941A9"}
              if (!this.canAfford()) return {
                "width": "250px",
                "height": " 125px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#FFFFFF",
                "background-color": "#77567F"
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


