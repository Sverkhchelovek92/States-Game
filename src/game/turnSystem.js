import { game } from './game.js'

export function endTurn() {
  game.turn++

  console.log(`Turn ${game.turn}`)
}
