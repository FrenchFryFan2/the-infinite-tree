addLayer("a", {
  branches: ["a", "r"],
  name: "Diegos Accuracy", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
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
        return hasMilestone("a", 0) ? { display: "none" } : {};
      }
    ],
    "milestones",
    "upgrades"
  ],
  resetsNothing() {
    return hasMilestone("a", 0);
  },
  color: "#f5f5f5",
  requires: new Decimal(500), // Can be a function that takes requirement increases into account
  resource: "Diegos Accuracy", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (hasUpgrade("a", 11)) mult = mult.times(2.5);
    if (hasUpgrade("a", 13)) mult = mult.pow(1.2);
    if (hasUpgrade("a", 14)) mult = mult.times(upgradeEffect("a", 14));
    if (hasUpgrade("a", 23)) mult = mult.times(upgradeEffect("a", 23));
    return mult;
  },
  update(diff) {
    if (hasMilestone("a", 0))
      addPoints("a", new Decimal(diff).times(tmp.a.resetGain).mul(0.01 * 10));
    if (hasMilestone("a", 1))
      addPoints("a", new Decimal(diff).times(tmp.a.resetGain).mul(0.01 * 15));
    if (hasMilestone("a", 2))
      addPoints("a", new Decimal(diff).times(tmp.a.resetGain).mul(0.01 * 25));
    if (hasMilestone("a", 3))
      addPoints("a", new Decimal(diff).times(tmp.a.resetGain).mul(0.01 * 25));
    if (hasMilestone("a", 4))
      addPoints("a", new Decimal(diff).times(tmp.a.resetGain).mul(0.01 * 25));
  },
  milestones: {
    0: {
      requirementDescription: "1 Accuracy",
      effectDescription:
        "Lose the ability to prestige, but gain 10% of Accuracy Gain per second.",
      done() {
        return player.a.best.gte(1);
      }
    },
    1: {
      requirementDescription: "25 Accuracy",
      effectDescription: "Gain 25% of Accuracy Gain per second.",
      done() {
        return player.a.best.gte(25);
      }
    },
    2: {
      requirementDescription: "1,000 Accuracy",
      effectDescription: "Gain 50% of Accuracy Gain per second.",
      done() {
        return player.a.best.gte(1000);
      }
    },
    3: {
      requirementDescription: "25,000 Accuracy",
      effectDescription: "Gain 75% of Accuracy Gain per Second.",
      done() {
        return player.a.best.gte(25000);
      }
    },
    4: {
      requirementDescription: "50,000 Accuracy",
      effectDescription: "Gain 100% of Accuracy Gain per second",
      done() {
        return player.a.best.gte(50000);
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
      title: "Accuracy",
      description: "Multiply Accuracy Gain by x2.5.",
      cost: new Decimal(1)
    },
    12: {
      title: "Knives",
      description: "Multiply Point Gain based on Upgrades Bought.",
      cost: new Decimal(5),
      effect() {
        return new Decimal(player.a.upgrades.length).add(1).root(1.5);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    13: {
      title: "Real Men Throw Knives!",
      description: "Raise Accuracy Gain to the power of 1.2.",
      cost: new Decimal(25)
    },
    14: {
      title: "Brother Help",
      description: "Luthers Strength Boosts Diegos Accuracy!",
      cost: new Decimal(100),
      effect() {
        return player.s.points
          .add(1)
          .log(10)
          .div(2)
          .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    21: {
      title: "Giving Back",
      description: "Diegos Accuracy Boosts Luthers Strength.",
      cost: new Decimal(500),
      effect() {
        return player.a.points
          .add(1)
          .log(10)
          .div(2)
          .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    22: {
      title: "Literal Power",
      description: "Square Base Point Gain",
      cost: new Decimal(1500)
    },
    23: {
      title: "Always Bring a Sword to a Gun Fight",
      description: "Multiply Accuracy Gain based on Upgrades Bought",
      cost: new Decimal(10000),
      effect() {
        return new Decimal(player.a.upgrades.length).add(1).root(1.5);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    24: {
      title: "Restore Powers",
      description: "Restore Diegos Powers and start gaining Allisons Power!",
      cost: new Decimal(50000),
      onPurchase() {
        return (player.r.unlocked2 = player.r.unlocked2.add(1));
      }
    }
  },
  infoboxes: {
    luther: {
      title: "Diego",
      body: `Hey, I'm Diego, Obviously i am Number 2 because DAD never thought i was good enough, he was a terrible dad! <br>
      Anyways as you know we have all lost our powers, I need you to regain my powers back, all you need to do is grind and get me enough strength to restore my power, please do this for me or i can't be a hero!`
    }
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  layerShown() {
    return player.a.unlocked2.gte(1);
  },
  doReset(resettingLayer) {
    // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
    if (layers[resettingLayer].row > this.row) {
      layerDataReset("a");
      player.a.unlocked2 = new Decimal(1);
      player.r.unlocked2 = new Decimal(1);
    }
  }
});
