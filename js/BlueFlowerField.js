addLayer("bf", {
    name: "Blue Flower Field", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💠", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: [
      "main-display",
    "clickables",
    "upgrades",
  ],
    color: "#2190ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Blue Flower Pollen", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
          let gain = [0,0,1]
          if(hasUpgrade("ns",13)) gain[2] *= 2 
          if(hasUpgrade("ns",11)) gain = gain.map(n => n*2)
          player.bf.points = player.bf.points.add(gain[0]+gain[1]+gain[2]); setCooldown("blue-flower-field",500)
          if(player.bh.currentPollen().gte(player.bh.maxPollen())) player.bf.points = player.bf.points.sub(player.bh.currentPollen().sub(player.bh.maxPollen()))
        },
        clickTime: new Decimal(0),
        canClick() { 
            return !(checkCooldown("blue-flower-field"));
        },
    },
},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})
