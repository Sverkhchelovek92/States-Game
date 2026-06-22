import { game } from './game.js'
import { world } from '../world.js'

export function endTurn() {
  game.turn++

  for (const unit of world.units) {
    unit.movement = unit.maxMovement
  }

  console.log(`Turn ${game.turn}`)
}
