addLayer("m", {
    name: "Mushroom Field", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍄", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: [
      "main-display",
    "clickables",
    "upgrades",
  ],
    color: "#f23535",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Mushroom Pollen", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
  clickables: {
    rows: 1,
    cols: 1,
    11: {
        display() {return '<b>Collect Pollen from This Field</b>'},
        onClick() {
          //if player.pollen.eq(player.bh.maxPollen.add(1)) player.pollen = player.pollen.sub(1)
          let gain = [1,0,0]
          if(hasUpgrade("bh",12)) {
            gain[0] *= 2.5
            if(hasUpgrade("ns",12)) gain[0] *= 2
          } else {
            if(hasUpgrade("ns",12)) gain[0] *= 2.5
          }
          if(hasUpgrade("ns",11)) gain = gain.map(n => n*2)
          player.m.points = player.m.points.add(gain[0]+gain[1]+gain[2]); setCooldown("mushroom-field",500)
          if(player.bh.currentPollen().gte(player.bh.maxPollen())) player.m.points = player.m.points.sub(player.bh.currentPollen().sub(player.bh.maxPollen()))
        },
        clickTime: new Decimal(0),
        canClick() { 
            return !(checkCooldown("mushroom-field"));
        },
    },
},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row),
    layerShown(){return true}
})
