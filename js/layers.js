addLayer("1", {
    name: "P₁",
    resource: "P1",

    symbol: "P₁",
    row: 0,
    color: "#FF8800",
    branches: ["2", ["n-1", [15]]],
    
    startData() { return { unlocked:true, points: new Decimal(0) } },
    layerShown() { return true },
})

addLayer("2", {
    name: "P₂",
    resource: "P₂",

    symbol: "P₂",
    row: 1,
    color: "#FF8800",
    branches: ["3"],
    
    startData() { return { unlocked:true, points: new Decimal(0) } },
    layerShown() { return true },
})

addLayer("3", {
    name: "P₃",
    resource: "P₃",

    symbol: "P₃",
    row: 2,
    color: "#FF8800",
    branches: ["4"],
    
    startData() { return { unlocked:true, points: new Decimal(0) } },
    layerShown() { return true },
})

addLayer("4", {
    name: "P₄",
    resource: "P₄",

    symbol: "P₄",
    row: 3,
    color: "#FF8800",
    
    startData() { return { unlocked:true, points: new Decimal(0) } },
    layerShown() { return true },
})

addLayer("n-1", {
    name: "Pₙ₋₁",
    resource: "Pₙ₋₁",

    symbol: "Pₙ₋₁",
    row: 2,
    color: "#FF8800",
    branches: ["n"],
    
    startData() { return { unlocked:true, points: new Decimal(0) } },
    layerShown() { return true },
})

addLayer("n", {
    name: "Pₙ",
    resource: "Pₙ",

    symbol: "Pₙ",
    row: 3,
    color: "#FF8800",
    
    startData() { return { unlocked:true, points: new Decimal(0) } },
    layerShown() { return true },
})