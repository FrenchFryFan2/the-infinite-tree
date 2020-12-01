addLayer("r", {
  name: "Allisons Rumours", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      unlocked2: new Decimal(0),
      points: new Decimal(0),
      best: new Decimal(0)
    };
  },
  tabFormat: [
    "main-display",
    ["infobox", "luther"],
    [
      "prestige-button",
      "",
      function() {
        return hasMilestone("r", 0) ? { display: "none" } : {};
      }
    ],
    "milestones",
    "upgrades"
  ],
  resetsNothing() {
    return hasMilestone("r", 0);
  },
  color: "#d9ba23",
  requires: new Decimal(250000), // Can be a function that takes requirement increases into account
  resource: "Allisons Rumours", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (hasUpgrade("r", 11)) mult = mult.times(3);
    if (hasUpgrade("r", 23)) mult = mult.times(upgradeEffect("r", 23));
    if (hasUpgrade("r", 22)) mult = mult.pow(2.2);
    return mult;
  },
  update(diff) {
    if (hasMilestone("r", 0))
      addPoints("r", new Decimal(diff).times(tmp.r.resetGain).mul(0.01 * 10));
    if (hasMilestone("r", 1))
      addPoints("r", new Decimal(diff).times(tmp.r.resetGain).mul(0.01 * 15));
    if (hasMilestone("r", 2))
      addPoints("r", new Decimal(diff).times(tmp.r.resetGain).mul(0.01 * 25));
    if (hasMilestone("r", 3))
      addPoints("r", new Decimal(diff).times(tmp.r.resetGain).mul(0.01 * 25));
    if (hasMilestone("r", 4))
      addPoints("r", new Decimal(diff).times(tmp.r.resetGain).mul(0.01 * 25));
  },
  milestones: {
    0: {
      requirementDescription: "1 Rumour",
      effectDescription:
        "Lose the ability to prestige, but gain 10% of Rumour Gain per second.",
      done() {
        return player.r.best.gte(1);
      }
    },
    1: {
      requirementDescription: "25 Rumour",
      effectDescription:
        "Lose the ability to prestige, but gain 25% of Rumour Gain per second.",
      done() {
        return player.r.best.gte(25);
      }
    },
    2: {
      requirementDescription: "1,000 Rumour",
      effectDescription:
        "Lose the ability to prestige, but gain 50% of Rumour Gain per second.",
      done() {
        return player.r.best.gte(1000);
      }
    },
    3: {
      requirementDescription: "25,000 Rumour",
      effectDescription:
        "Lose the ability to prestige, but gain 75% of Rumour Gain per second.",
      done() {
        return player.r.best.gte(25000);
      }
    },
    4: {
      requirementDescription: "50,000 Rumour",
      effectDescription:
        "Lose the ability to prestige, but gain 100% of Rumour Gain per second.",
      done() {
        return player.r.best.gte(50000);
      }
    }
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  upgrades: {
    rows: 2,
    cols: 4,
    11: {
      title: "Rumoured",
      description: "Multiply Rumours by x3",
      cost: new Decimal(1)
    },
    12: {
      title: "Child",
      description: "Multiply Point Gain based on Rumours.",
      cost: new Decimal(5),
      effect() {
        return player.r.points
          .add(1)
          .log(10)
          .div(1.5)
          .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    13: {
      title: "Persuasion",
      description: "Multiply Point Gain based on Point Gain.",
      cost: new Decimal(25),
      effect() {
        if (hasUpgrade("r", 21))
          return new Decimal(getPointGen().mag)
            .log(5)
            .div(1)
            .max(1);
        else
          return new Decimal(getPointGen().mag)
            .log(10)
            .div(1.25)
            .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    14: {
      title: "Lover Boy",
      description: "Luthers Strength boosts Allisons Rumours.",
      cost: new Decimal(150),
      effect() {
        return player.s.points
          .add(1)
          .log(10)
          .div(1.25)
          .max(1);
      }
    },
    21: {
      title: "Extra Persuasion",
      description: "Persuasions Formula is Stronger.",
      cost: new Decimal(500)
    },

    22: {
      title: "Squared Rumours",
      description: "Raise Rumour Gain to the Power of 2.2",
      cost: new Decimal(1500)
    },
    23: {
      title: "Rumour Your Rumours",
      description: "Boost Rumours based on Rumours.",
      cost: new Decimal(5000),
      effect() {
        return player.r.points
          .add(1)
          .log(10)
          .div(1.5)
          .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    24: {
      title: "Restore Powers",
      description: "Restore Allisons Powers and Start Gaining Klaus' Power!",
      cost: new Decimal(50000)
    }
  },
  infoboxes: {
    luther: {
      title: "Allison",
      body: `Hey, I'm Allison, i am Number 3, the most powerful (in my opinion) in The Umbrella Academy! <br>
      Anyways as you know we have all lost our powers, I need you to regain my powers back, all you need to do is grind and get me enough strength to restore my power, please do this for me or i can't see my child!`
    }
  },
  row: 2, // Row the layer is in on the tree (0 is the first row)
  layerShown() {
    return player.r.unlocked2 >= 1;
  }
});
