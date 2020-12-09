addLayer("ns", {
  name: "Noob Shop", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "NS", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0)
    };
  },
  tabFormat: [
    ["display-text", () => `<h1><b>Tools</b></h1>`],
    ["row",
      [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
    ["row",
      [["upgrade", 21]]],
    ["display-text", () => `<h1><b>Backpacks</b></h1>`],
      ["row",
      [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]
    ]
  ],
  color: "#22c0e0", // uh oh ive got no clue what youre doing because i havent used tab format yet// dw neither have i, go to modding help in the tmt server
  resource: "Noob Shop", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
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
  upgrades: {
    rows: 3,
    cols: 4,
    11: {
      title: "Rake",
      description: "Upgrade your tool to give x2 pollen",
      cost: new Decimal(80),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    12: {
      title: "Clippers",
      description: "Upgrade your tool to give x2.5 red pollen",
      cost: new Decimal(220),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    13: {
      title: "Magnet",
      description: "Upgrade your tool to give x2 blue pollen",
      cost: new Decimal(550),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    14: {
      title: "Vacuum",
      description:
        "Upgrade your tool 1 last time for this shop to give x3 white pollen",
      cost: new Decimal(1400),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    21: {
      style: {
        opacity: "0%",
        cursor: "auto",
        cost: new Decimal(10000000000000000000000000000000000000000000000000000000000000000)
      }
    },
    31: {
      title: "Shabby Wax",
      description: "Holds 200 Pollen",
      cost: new Decimal(50),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    32: {
      title: "Terrible Wax",
      description: "Holds 750 Pollen",
      cost: new Decimal(150),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    33: {
      title: "Bad Wax",
      description: "Holds 2200 Pollen",
      cost: new Decimal(500),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    },
    34: {
      title: "Decent Wax",
      description: "Holds 8600 Pollen and an Extra x3 Boost to Honey",
      cost: new Decimal(1200),
      currencyDisplayName: "Honey",
      currencyInternalName: "points"
    }
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: "side", // Row the layer is in on the tree (0 is the first row, "side" is the side row)
  layerShown() {
    return true;
  }
});
