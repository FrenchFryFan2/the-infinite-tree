addLayer("a", {
  row: "side",
  name: "achievements",
  unlocked() {
    return true;
  },
  layerShown() {
    return true;
  },
  tooltip() {
    return "Acievements";
  },
  color: "#FFFF00",
  tabFormat: [
    ["display-text", "Achievements", { "font-size": "32px" }],
    "achievements"
  ],
  achievements: {
    rows: 1,
    cols: 4,
    11: {
      name: "A1",
      tooltip: "Goal: Reach 1000z. Reward: Unlock something",
      done() {return player.points.gte(1000)}
    },
    12: {
      name: "A2",
      tooltip: "Goal: Get 5 Energizers. Reward: Unlock Zero Upgrades",
      done() {return getBuyableAmount("tree-tab", 21).gte(5)}
    },
    13: {
      name: "A3",
      tooltip: "Goal: One Reset",
      done() {return player.o.times.gte(1)},
      unlocked() {return layers[this.layer].achTotal().gte(1)}
    },
    14: {
      name: "A4",
      tooltip: "Goal: Have 5 Zero Upgrades. Reward: 3x Zero Gain",
      done() {return hasUpgrade("tree-tab",11) && hasUpgrade("tree-tab",12) && hasUpgrade("tree-tab",13) && hasUpgrade("tree-tab",14) && hasUpgrade("tree-tab",15)},
      unlocked() {return layers[this.layer].achTotal().gte(2)}
    },
    15: {
      name: "A5",
      tooltip: "Goal: One Reset 5 times. Reward: 3x Zero Gain",
      done() {return player.o.times.gte(5)},
      unlocked() {return layers[this.layer].achTotal().gte(3)}
    }
  },
  achTotal() {
    let total = new Decimal(0)
    if (hasAchievement(this.layer, 11)) total = total.add(1)
    if (hasAchievement(this.layer, 12)) total = total.add(1)
    if (hasAchievement(this.layer, 13)) total = total.add(1)
    if (hasAchievement(this.layer, 14)) total = total.add(1)
    if (hasAchievement(this.layer, 15)) total = total.add(1)
    return total
  }
});
