import { game } from './game.js'
import { world } from '../world.js'
import { processCityGrowth } from '../cities/cityGrowth.js'

export function endTurn() {
  game.turn++

  for (const unit of world.units) {
    unit.movement = unit.maxMovement
  }

  for (const city of world.cities) {
    processCityGrowth(city)
  }

  console.log(`Turn ${game.turn}`)
}
