var layoutInfo = {
  startTab: "none",
  showTree: true,

  treeLayout: ""
};

// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
  layerShown: "ghost"
});

addLayer("tree-tab", {
  tabFormat: [
    "upgrades",
    "buyables",
    "blank",
    [
      "tree",
      function() {
        return layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS;
      }
    ]
  ],
  scalingStart(x) {
    switch(x) {
      case 1:
        return new Decimal(8)
        break
      case 2:
        return new Decimal(2)
        break
      case 3:
        return new Decimal(5)
        break
    }
  },
  scalingPower(x) {
    switch(x) {
      case 1:
        return new Decimal(1)
        break
      case 2:
        return new Decimal(1)
        break
      case 3:
        return new Decimal(1)
        break
    }
  },
  softcapStart(x) {
    switch(x) {
      case 1:
        return new Decimal(0)
        break
      case 2:
        return new Decimal(0)
        break
      case 3:
        return new Decimal(10)
        break
    }
  },
  softcapPower(x) {
    switch(x) {
      case 1:
        return new Decimal(1)
        break
      case 2:
        return new Decimal(1)
        break
      case 3:
        return new Decimal(1)
        break
    }
  },
  delay(x) {
    let amt
    switch(x) {
      case 1:
        amt = new Decimal(0)
        amt = amt.add(hasUpgrade(this.layer, 11) ? 1 : 0)
        return amt
        break
      case 2:
        return new Decimal(0)
        break
      case 3:
        amt = new Decimal(0)
        amt = amt.add(hasUpgrade(this.layer, 12) ? 3 : 0)
        return amt
        break
    }
      
  },
  costBase(x) {
    let amt
    switch(x) {
      case 1:
        amt =  new Decimal(6)
        amt = amt.sub(hasUpgrade("o", 14) ? 1 : 0)
        return amt
        break
      case 2:
        amt = new Decimal(8)
        amt = amt.sub(hasUpgrade(this.layer, 14) ? 1 : 0)
        return amt
        break
      case 3:
        amt =  new Decimal(3)
        amt = amt.sub(hasUpgrade("o", 13) ? 0.5 : 0)
        return amt
        break
    }
  },
  base(x) {
    let amt
    switch(x) {
      case 1:
        return new Decimal(2)
        break
      case 2:
        return new Decimal(3)
        break
      case 3:
        amt = new Decimal(1.5)
        amt = amt.add(hasUpgrade(this.layer, 13) ? .5 : 0)
        return amt
        break
    }
  },
  buyables: {
    cols: 2,
    rows: 2,
    11: {
      title: "Doubler",
      cost() {
        if (getBuyableAmount(this.layer, 11).sub(layers[this.layer].delay(1)).max(0).gte(layers[this.layer].scalingStart(1))) {
          return new Decimal(layers[this.layer].costBase(1)).pow(getBuyableAmount(this.layer, 11).sub(layers[this.layer].delay(1)).max(0).pow(layers[this.layer].scalingPower(1).add(1)).div(layers[this.layer].scalingStart(1).pow(layers[this.layer].scalingPower(1)))).times(10)
        } else return new Decimal(layers[this.layer].costBase(1)).pow(getBuyableAmount(this.layer, 11).sub(layers[this.layer].delay(1)).max(0)).times(10)
      },
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `Double your zero gain\n Cost: ${this.cost().round()}\nAmt: ${getBuyableAmount(this.layer, 11)}\n Effect: ${this.effect().round()}\n ${isNerdMode() ? `Scaling Start: ${layers[this.layer].scalingStart(1)}\nScaling Power: ${layers[this.layer].scalingPower(1).times(100)}%\n Cost Formula: base^((buyableAmt)^(Scaling Power + 1) / (Scaling Start ^ Scaling Power)) * 10` : ""}`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost())
        setBuyableAmount(this.layer, 11, new Decimal(getBuyableAmount(this.layer, 11)).add(1))
        
      },
      effect() {
        return new Decimal(layers[this.layer].base(1)).pow(getBuyableAmount(this.layer, 11))
      }
    },
    12: {
      title: "Tripler",
      cost() {
        if (getBuyableAmount(this.layer, 12).sub(layers[this.layer].delay(2)).max(0).gte(layers[this.layer].scalingStart(2))) {
          return new Decimal(layers[this.layer].costBase(2)).pow(getBuyableAmount(this.layer, 12).sub(layers[this.layer].delay(2)).max(0).pow(layers[this.layer].scalingPower(2).add(1)).div(layers[this.layer].scalingStart(2).pow(layers[this.layer].scalingPower(2)))).times(1000)
        } else return new Decimal(layers[this.layer].costBase(2)).pow(getBuyableAmount(this.layer, 12).sub(layers[this.layer].delay(2)).max(0)).times(1000)
      },
      canAfford() {
        return (new Decimal(player.points).gte(this.cost()))
      },
      unlocked() {return true},
      display() {return `Triple your zero gain\n Cost: ${this.cost().round()}\nAmt: ${getBuyableAmount(this.layer, 12)}\n Effect: ${this.effect().round()}\n ${isNerdMode() ? `Scaling Start: ${layers[this.layer].scalingStart(2)}\nScaling Power: ${layers[this.layer].scalingPower(2).times(100)}%\n Cost Formula: base^((buyableAmt)^(Scaling Power + 1) / (Scaling Start ^ Scaling Power)) * 1000` : ""}`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost())
        setBuyableAmount(this.layer, 12, new Decimal(getBuyableAmount(this.layer, 12)).add(1))
        
      },
      effect() {
        return new Decimal(layers[this.layer].base(2)).pow(getBuyableAmount(this.layer, 12))
      },
    },
    21: {
      title: "The Energizer",
      cost() {
        if (getBuyableAmount(this.layer, 21).sub(layers[this.layer].delay(3)).max(0).gte(layers[this.layer].scalingStart(3))) {
          return new Decimal(layers[this.layer].costBase(3)).pow(getBuyableAmount(this.layer, 21).sub(layers[this.layer].delay(3)).max(0).pow(layers[this.layer].scalingPower(3).add(1)).div(layers[this.layer].scalingStart(3).pow(layers[this.layer].scalingPower(3)))).times(100)
        } else return new Decimal(layers[this.layer].costBase(3)).pow(getBuyableAmount(this.layer, 21).sub(layers[this.layer].delay(3)).max(0)).times(100)
      },
      canAfford() {
        return (new Decimal(player.points).gte(this.cost()))
      },
      unlocked() {return true},
      display() {return `1.5x your zero gain\n Cost: ${this.cost().round()}\nAmt: ${getBuyableAmount(this.layer, 21)}\n Effect: ${this.effect().round()}\n ${isNerdMode() ? `Scaling Start: ${layers[this.layer].scalingStart(3)}\nScaling Power: ${layers[this.layer].scalingPower(3).times(100)}%\n Cost Formula: base^((buyableAmt)^(Scaling Power + 1) / (Scaling Start ^ Scaling Power)) * 100\n Softcap Start: ${layers[this.layer].softcapStart(3)}\n Softcap Power: ${layers[this.layer].softcapPower(3).times(100)}%\n Softcap Formula: (buyableEffect ^ (0.5 ^ Softcap Power)) * (Softcap Start ^ (1 - (0.5 ^ Softcap Power)))` : ""}`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost())
        setBuyableAmount(this.layer, 21, new Decimal(getBuyableAmount(this.layer, 21)).add(1))
        
      },
      effect() {
        if (new Decimal(layers[this.layer].base(3)).pow(getBuyableAmount(this.layer, 21)).gte(10)) {
          return new Decimal(layers[this.layer].base(3)).pow(getBuyableAmount(this.layer, 21)).pow(new Decimal(0.5).pow(layers[this.layer].softcapPower(3))).times(layers[this.layer].softcapStart(3).pow(new Decimal(1).sub(new Decimal(0.5).pow(layers[this.layer].softcapPower(3)))))
        }
        else return new Decimal(layers[this.layer].base(3)).pow(getBuyableAmount(this.layer, 21))
      },
        unlocked() {return hasAchievement("a", 11)}
      },
  },
  update(diff) {
    player.points = player.points.min(this.goal())
  },
  goal() {
    return layers.o.requires()
  },
  upgrades: {
    rows: 1,
    cols: 5,
    11: {
      cost: new Decimal(10000),
      title: "EU1",
      description: "The Doublers scaling is delayed by one",
      currencyInternalName: "points",
      currencyDisplayName: "Zeroes",
      unlocked() {return hasAchievement("a", 12)}
    },
    12: {
      cost: new Decimal(26000),
      title: "EU2",
      description: "The Energizers scaling is delayed by three",
      currencyInternalName: "points",
      currencyDisplayName: "Zeroes",
      unlocked() {return hasAchievement("a", 12)}
    },
    13: {
      cost: new Decimal(100000),
      title: "EU3",
      description: "The Energizers base is increased by .5",
      currencyInternalName: "points",
      currencyDisplayName: "Zeroes",
      unlocked() {return hasAchievement("a", 12)}
    },
    14: {
      cost: new Decimal(250000),
      title: "EU4",
      description: "The triplers cost base is decreased by 1",
      currencyInternalName: "points",
      currencyDisplayName: "Zeroes",
      unlocked() {return hasAchievement("a", 12)}
    },
    15: {
      cost: new Decimal(1250000),
      title: "EU5",
      description: "Keep this upgrade and the ones before it when this layer is reset",
      currencyInternalName: "points",
      currencyDisplayName: "Zeroes",
      unlocked() {return hasAchievement("a", 12)}
    }
  },
  
});
