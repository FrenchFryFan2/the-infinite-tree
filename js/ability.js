addLayer("a", {
  name: "Ability", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      best: new Decimal(0)
    };
  },
  nodeStyle: {
    background: "linear-gradient(to bottom right, #e8bab3, white", // red, orange, yellow, green, blue, indigo, violet
    "background-origin": "border-box"
  },
  tabFormat: {
    Upgrades: {
      content: [
        "main-display",
        [
          "prestige-button",
          "",
          function() {
            return hasUpgrade("a", 21) ? { display: "none" } : {};
          }
        ],
        "blank",
        "upgrades",
        "milestones"
      ]
    },

    Buyables: {
      unlocked() {
        return hasUpgrade("a", 14);
      },
      content: [
        "main-display",
        [
          "prestige-button",
          "",
          function() {
            return hasUpgrade("a", 21) ? { display: "none" } : {};
          }
        ],
        "blank",
        "buyables"
      ]
    },
    Challenges: {
      unlocked() {
        return hasUpgrade("a", 25);
      },
      content: [
        "main-display",
        [
          "prestige-button",
          "",
          function() {
            return hasUpgrade("a", 21) ? { display: "none" } : {};
          }
        ],
        "blank",
        "challenges"
      ]
    }
  },
  effect() {
    return new Decimal(player.a.points)
      .add(1)
      .log(7)
      .times(2);
  },
  effectDescription() {
    return (
      "This is boosting Point Gain by " + format(layers[this.layer].effect())
    );
  },
  passiveGeneration() {
    let gain = 0;
    if (hasUpgrade("a", 17)) {
      gain = 1;
    } else if (hasUpgrade("a", 15)) {
      gain = 0.5;
    }
    return gain;
  },
  color: "#e8bab3",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Abilities", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (hasUpgrade("a", 11)) mult = mult.times(upgradeEffect("a", 12));
    mult = mult.mul(buyableEffect(this.layer, 11));
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  challenges: {
    rows: 1,
    cols: 1,
    11: {
      name: "Endgame V1",
      challengeDescription: "Point gain is tetrated ^0.5",
      goal: new Decimal(200000),
      doReset: true,
      rewardDescription: "Point Gain is Raised ^1.2",
      unlocked() {
        return hasUpgrade("a", 25);
      }
    }
  },
  upgrades: {
    rows: 2,
    cols: 5,
    11: {
      title: "A",
      description: "Multiply Point Gain by Point Gain",
      cost: new Decimal(1),
      effect() {
        if (hasUpgrade("a", 24))
          return player.points
            .add(1)
            .log(10)
            .pow(2)
            .max(1);
        else
          return player.points
            .add(1)
            .log(10)
            .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    12: {
      title: "At",
      description: "Multiply Ability Gain by Point Gain",
      cost: new Decimal(5),
      effect() {
        if (hasUpgrade("a", 23))
          return player.points
            .add(1)
            .log(10)
            .max(1);
        else
          return player.points
            .add(1)
            .log(6)
            .times(1.5)
            .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    13: {
      title: "After",
      description: "Multiply Point Gain Based on Upgrades Bought",
      cost: new Decimal(10),
      effect() {
        return new Decimal(player.a.upgrades.length).add(1).root(1.5);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    14: {
      title: "All",
      description: "Unlock the First Buyable",
      cost: new Decimal(50)
    },
    15: {
      title: "And",
      description: "Gain 50% of Ability Gain Per Second",
      cost: new Decimal(100)
    },
    21: {
      title: "App",
      description:
        "Lose the Ability to Prestige, but Gain 100% of Ability Gain Per Second",
      cost: new Decimal(10000),
      unlocked() {
        return hasUpgrade("a", 15);
      }
    },
    22: {
      title: "Alt",
      description: "Make <b>Are</b>'s Cost Scale Slower",
      cost: new Decimal(20000),
      unlocked() {
        return hasUpgrade("a", 21);
      }
    },
    23: {
      title: "Ask",
      description: "<b>At</b> Uses a Better Formula and Unlock a New Buyable.",
      cost: new Decimal(50000),
      unlocked() {
        return hasUpgrade("a", 22);
      }
    },
    24: {
      title: "About",
      description: "Square <b>A</b> Exponant",
      cost: new Decimal(250000),
      unlocked() {
        return hasUpgrade("a", 23);
      }
    },
    25: {
      title: "An",
      description: "Unlock Challenges",
      cost: new Decimal(1000000),
      unlocked() {
        return hasUpgrade("a", 24);
      }
    }
  },
  buyables: {
    rows: 2,
    cols: 2,
    11: {
      title: "<b>Are</b><br>",
      cost() {
        if (hasUpgrade("a", 22))
          return new Decimal(8).pow(getBuyableAmount(this.layer, 11)).times(10);
        else
          return new Decimal(9).pow(getBuyableAmount(this.layer, 11)).times(13);
      },
      canAfford() {
        return new Decimal(player.a.points).gte(this.cost());
      },
      unlocked() {
        return hasUpgrade("a", 14);
      },
      display() {
        return `<b>Multiply your Point gain\n Cost:</b> ${this.cost().round()} Abilities\n <b>Amount:</b> ${getBuyableAmount(
          this.layer,
          11
        )}\n <b>Effect:</b> x${this.effect().round()} Points`;
      },
      buy() {
        player.a.points = new Decimal(player.a.points).sub(this.cost());
        setBuyableAmount(
          this.layer,
          11,
          new Decimal(getBuyableAmount(this.layer, 11)).add(1)
        );
      },
      effect() {
        return new Decimal(2).pow(getBuyableAmount(this.layer, 11));
      }
    },
    12: {
      title: "<b>Air</b><br>",
      cost() {
        return new Decimal(8).pow(getBuyableAmount(this.layer, 12)).times(15);
      },
      canAfford() {
        return new Decimal(player.a.points).gte(this.cost());
      },
      unlocked() {
        return hasUpgrade("a", 23);
      },
      display() {
        return `<b>Multiply your Ability gain\n Cost:</b> ${this.cost().round()} Abilities\n <b>Amount:</b> ${getBuyableAmount(
          this.layer,
          12
        )}\n <b>Effect:</b> x${this.effect().round()} Abilities`;
      },
      buy() {
        player.a.points = new Decimal(player.a.points).sub(this.cost());
        setBuyableAmount(
          this.layer,
          12,
          new Decimal(getBuyableAmount(this.layer, 12)).add(1)
        );
      },
      effect() {
        return new Decimal(1.5).pow(getBuyableAmount(this.layer, 12));
      }
    }
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "a",
      description: "a: Reset for Ability points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      }
    }
  ],
  layerShown() {
    return true;
  }
});
