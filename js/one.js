addLayer("o", {
  name: "One", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      times: new Decimal(0),
      total: new Decimal(0)
    };
  },
  color: "#FF0000",
  requires() {
    let amt = new Decimal(1e6)
    amt = new Decimal(1.1).pow(player.o.times).times(1e6)
    amt = amt.div(hasUpgrade("o", 12) ? 4 : 1)
    return amt
  }, // Can be a function that takes requirement increases into account
  resource: "One Points", // Name of prestige currency
  baseResource: "Zeroes", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "p",
      description: "P: Reset for prestige points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      }
    }
  ],
  layerShown() {
    if (player.points.gte(1e6) || player.o.times.gte(1)) {return true}
  },
  doReset(x) {
    if (x == "o") {
      setBuyableAmount("tree-tab", 11, new Decimal(0));
      setBuyableAmount("tree-tab", 12, new Decimal(0));
      setBuyableAmount("tree-tab", 21, new Decimal(0));
      player.o.times = new Decimal(player.o.times).add(1)
    }
    let upgrades = [];
    if (hasUpgrade("tree-tab", 15)) {
      for (let i = 11; i < 16; i++) {
        if (hasUpgrade("tree-tab", i)) upgrades.push(i);
      }
    }
    player["tree-tab"].upgrades = upgrades;
  },
  tabFormat: {
    "Upgrades": {
      content() {
        let format
        format = ["main-display", ["prestige-button", function() {return "Combine your zeroes into "}],"blank","milestones", "clickables", "upgrades"]
        return format
      }
    },
    "Challenges" : {
      content: ["challenges"],
      unlocked() {return hasMilestone("o", 0)}
    }
  },
  upgrades: {
    rows: 1,
    cols: 4,
    11: {
      title: "OU1",
      description: "Gain 2x more zeroes",
      cost: new Decimal(1),
    },
    12: {
      title: "OU2",
      description: "Goal is divided by 4",
      cost: new Decimal(1),
    },
    13: {
      title: "OU3",
      description: "Energizer cost scaling is slower (3x -> 2.5x)",
      cost: new Decimal(2),
    },
    14: {
      title: "OU4",
      description: "Doubler cost scaling is slower (6x -> 5x)",
      cost: new Decimal(2),
    },
  },
  clickables: {
    masterButtonPress() {
      for (let i = 11; i < 100; i += (i.toString().endsWith("5") ? 6 : 1)) {
        if (hasUpgrade("o", i)) {
          player.o.points = player.o.points.add(layers.o.upgrades[i].cost)
          player.o.upgrades = player.o.upgrades.filter(function(value, index, arr){ 
            return value != i;
          });
      }
      }
    },
    masterButtonText: "Respec Upgrades"
  },
  milestones: {
    0: {
      requirementDescription: "Have 5 total one points",
      effectDescription: "Unlock challenges",
      done() { return player.o.total.gte(5) }
    }
  }
});
