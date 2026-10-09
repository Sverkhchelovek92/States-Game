import { world } from "../world.js";
import { createCity } from "./cityFactory.js";
import { unitSelection, clearUnitSelection } from "../units/unitSelection.js";

export function foundCity() {
const unit = unitSelection.unit

if (!unit || unit.type !== 'settler') {
return
}

const tile = world.tiles[unit.y][unit.x]

if (tile.terrain === 'water') {
console.log('Cannot found a city on water')
return
}

const existingCity = world.cities.find(
(city) => city.x === unit.x && city.y === unit.y,
)

if (existingCity) {
console.log('There is already a city here')
return
}

const city = createCity(unit.x, unit.y, unit.owner)

world.cities.push(city)

const unitIndex = world.units.indexOf(unit)

if (unitIndex !== -1) {
world.units.splice(unitIndex, 1)
}

clearUnitSelection()

console.log(Founded ${city.name} at ${city.x}, ${city.y})
}