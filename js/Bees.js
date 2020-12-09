addLayer("bh", {
  branches: ["ns"],
  name: "Beehive", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "🐝", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      maxPollen() {
        switch(true) {
          case hasUpgrade("ns",34):
            return 8600
          case hasUpgrade("ns",33):
            return 2200
          case hasUpgrade("ns",32):
            return 750
          case hasUpgrade("ns",31):
            return 200
          default:
            return 50
        }
      },
      currentPollen() {
        return player.bf.points.add(player.c.points).add(player.d.points).add(player.m.points).add(player.s.points)
      }
    };
  },
  tabFormat: [
    "main-display",
    "clickables",
  "upgrades",
],
  color: "#e0da22",
  resource: "Bees", // Name of prestige currency
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
  clickables: {
    rows: 1,
    cols: 1,
    11: {
        display() {return '<b>Convert Pollen to Honey</b>'},
        onClick() {player.points = player.points.add(player.s.points.add(player.c.points).add(player.bf.points).add(player.d.points).add(player.m.points).div(((hasUpgrade("bh",11)) ? 40 : 60))); setCooldown("Beehive",10000);
                   let temporaree = 1
                  let temporarinterval
                  temporarinterval = setInterval(()=>{
                    if(temporaree >= 59) {
                      player.bf.points = new Decimal(0),
                      player.m.points = new Decimal(0)
                      player.c.points = new Decimal(0)
                      player.d.points = new Decimal(0)
                      player.s.points = new Decimal(0)
                  
                      clearInterval(temporarinterval)
                    }
                    player.points = player.points.add(player.s.points.add(player.c.points).add(player.bf.points).add(player.d.points).add(player.m.points).div(((hasUpgrade("bh",11)) ? 40 : 60)))
                    temporaree++
                  },50)
                  
                  }, 
        clickTime: new Decimal(0),
        canClick() { 
            return !(checkCooldown("Beehive"));
        },
    },
},
  upgrades: {
    rows: 5,
    cols: 50,
    11: {
      title: "First Bee",
      description: "Unlock your first bee, this bee gives x1.5 honey",
      cost: new Decimal(0),
      currencyDisplayName: "Honey",
      currencyInternalName: "points",
      onPurchase() {
        player.bh.points = player.bh.points.add(1)
      }
    },
    12: {
      title: "Second Bee",
      description: "Unlock your second bee, this bee gives x2.5 red pollen",
      cost: new Decimal(1000),
      currencyDisplayName: "Honey",
      currencyInternalName: "points",
      onPurchase() {
        player.bh.points = player.bh.points.add(1)
      }
    },
    13: {
      title: "Third Bee",
      description: "Unlock your third bee, this bee gives x3 white pollen",
      cost: new Decimal(2500),
      currencyDisplayName: "Honey",
      currencyInternalName: "points",
      onPurchase() {
        player.bh.points = player.bh.points.add(1)
      }
    },
    14: {
      title: "Fourth Bee",
      description: "Unlock your fourth bee, this bee gives x2 blue pollen",
      cost: new Decimal(10000),
      currencyDisplayName: "Honey",
      currencyInternalName: "points",
      onPurchase() {
        player.bh.points = player.bh.points.add(1)
      }
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
addNode("sideSpacer", {
  row:"side",
  symbol: "thonke",
  color: "transparent"
})