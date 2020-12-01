addLayer("s", {
  branches: ["a"],
  name: "Luthers Strength", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
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
        return hasMilestone("s", 0) ? { display: "none" } : {};
      }
    ],
    "milestones",
    "upgrades"
  ],
  resetsNothing() {
    return hasMilestone("s", 0);
  },
  color: "#8a5a08",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Luthers Strength", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (hasUpgrade("s", 12)) mult = mult.times(3); // if(hasUpgrade("s", 13)) mult = mult.times(whatever you want)
    if (hasUpgrade("s", 13)) mult = mult.times(upgradeEffect("s", 13));
    if (hasUpgrade("s", 22)) mult = mult.pow(2);
    if (hasUpgrade("s", 23)) mult = mult.times(upgradeEffect("s", 23));
    if (hasUpgrade("a", 21)) mult = mult.times(upgradeEffect("a", 21));
    return mult;
  },
  update(diff) {
    if (hasMilestone("s", 0))
      addPoints("s", new Decimal(diff).times(tmp.s.resetGain).mul(0.01 * 10));
    if (hasMilestone("s", 1))
      addPoints("s", new Decimal(diff).times(tmp.s.resetGain).mul(0.01 * 15));
    if (hasMilestone("s", 2))
      addPoints("s", new Decimal(diff).times(tmp.s.resetGain).mul(0.01 * 25));
    if (hasMilestone("s", 3))
      addPoints("s", new Decimal(diff).times(tmp.s.resetGain).mul(0.01 * 25));
    if (hasMilestone("s", 4))
      addPoints("s", new Decimal(diff).times(tmp.s.resetGain).mul(0.01 * 25));
  },
  milestones: {
    0: {
      requirementDescription: "1 Strength",
      effectDescription:
        "Lose the ability to prestige, but gain 10% of Strength Gain per second.",
      done() {
        return player.s.best.gte(1);
      }
    },
    1: {
      requirementDescription: "25 Strength",
      effectDescription: "Gain 25% of Strength Gain per second.",
      done() {
        return player.s.best.gte(25);
      }
    },
    2: {
      requirementDescription: "1,000 Strength",
      effectDescription: "Gain 50% of Strength Gain per second",
      done() {
        return player.s.best.gte(1000);
      }
    },
    3: {
      requirementDescription: "25,000 Strength",
      effectDescription: "Gain 75% of Strength Gain per second",
      done() {
        return player.s.best.gte(25000);
      }
    },
    4: {
      requirementDescription: "50,000 Strength",
      effectDescription: "Gain 100% of Strength Gain per second",
      done() {
        return player.s.best.gte(50000);
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
      title: "Strength",
      description: "Multiply Point Gain by x3.",
      cost: new Decimal(1)
    },
    12: {
      title: "Rage",
      description: "Multiply Strength Gain by x3.",
      cost: new Decimal(5)
    },
    13: {
      title: "Angry Boost",
      description: "Boost Strength Gain based on Strength.",
      cost: new Decimal(50),
      effect() {
        return player.s.points
          .log(10)
          .div(1.5)
          .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    14: {
      title: "Gorilla Time",
      description: "Boost Point Gain based on Strength.",
      cost: new Decimal(100),
      effect() {
        if (hasUpgrade("s", 21))
          return player.s.points
            .log(6)
            .div(1.1)
            .max(1);
        else
          return player.s.points
            .log(10)
            .div(1.25)
            .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    21: {
      title: "I'm the Leader",
      description: '"Gorilla Time" uses a better Formula.',
      cost: new Decimal(500)
    },
    22: {
      title: "Square Strength",
      description: "Square Strength Gain.",
      cost: new Decimal(2500)
    },
    23: {
      title: "Number One!",
      description:
        "Strength Gain is better based on Upgrades Bought in this Layer.",
      cost: new Decimal(10000),
      effect() {
        return new Decimal(player.s.upgrades.length).add(1).root(1.5);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    24: {
      title: "Restore Powers",
      description: "Restore Luthers Powers and start regaining Diegos Power!",
      cost: new Decimal(50000),
      onPurchase() {
        return (player.a.unlocked2 = player.a.unlocked2.add(1));
      }
    }
  },
  infoboxes: {
    luther: {
      title: "Luther",
      body: `Hey, I'm Luther, the leader of The Umbrella Academy, I am Number 1! <br>
      Anyways as you know we have all lost our powers, I need you to regain my powers back, all you need to do is grind and get me enough strength to restore my power, please do this for me or i can't lead The Umbrella Academy!`
    }
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  layerShown() {
    return true;
  },
  doReset(resettingLayer) {
    // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
    if (layers[resettingLayer].row > this.row) {
      layerDataReset("s");
      player.a.unlocked2 = new Decimal(1);
    }
  }
});
