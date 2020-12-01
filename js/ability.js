addLayer("a", {
  name: "Ability", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0)
    };
  },
  nodeStyle: {
    "background": "linear-gradient(to bottom right, #e8bab3, white", // red, orange, yellow, green, blue, indigo, violet
    "background-origin": "border-box"
  },
 tabFormat: {
    Main: { content: ["main-display", "prestige-button", "upgrades", "milestones"]},
    Challenges: { content: ["challenges"] },
    Buyables: { content: ["buyables"] },
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
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  upgrades: {
    rows: 2,
    cols: 4,
    11: {
      title: "A",
      description: "Multiply Point Gain by Point Gain",
      cost: new Decimal(5),
      effect() {
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
      cost: new Decimal(25),
      effect() {
        return player.points
          .add(1)
          .log(10)
          .max(1);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    13: {
      title: "After",
      description: "Multiply Point Gain Based on Upgrades Bought",
      cost: new Decimal(150),
      effect() {
        return new Decimal(player.a.upgrades.length).add(1).root(1.5);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      }
    },
    14: {
      title: "All",
      description: "Unlock the First Buyable.",
      cost: new Decimal(1000)
    }
  },
  buyables: {
    rows: 2,
    cols: 2,
    11: {
      title: "<b>Doubler</b><br>",
      cost() {return new Decimal(10).pow(getBuyableAmount(this.layer,11)).times(10)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `<b>Double your Point gain\n Cost: ${this.cost().round()}\n</b> <b>Effect: ${this.effect().round()}</b>`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost())
        setBuyableAmount(this.layer, 11, new Decimal(getBuyableAmount(this.layer, 11)).add(1))
      },
      effect() {
        return new Decimal(2).pow(getBuyableAmount(this.layer, 11))
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
