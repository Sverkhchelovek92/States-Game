import { world } from '../world.js'

export function attackUnit(attacker, target) {
  if (attacker.movement <= 0) {
    console.log('No movement points for attack')
    return
  }

  const distanceX = getWrappedDistanceX(attacker.x, target.x, world.width)

  const distanceY = Math.abs(attacker.y - target.y)

  const distance = Math.max(distanceX, distanceY)

  if (distance > 1) {
    console.log('Target is too far away')
    return
  }

  target.health -= attacker.attack

  attacker.movement = 0

  console.log(
    `${attacker.type} attacked ${target.type}.`,
    `Target health: ${target.health}`,
  )
}

function getWrappedDistanceX(x1, x2, worldWidth) {
  const distance = Math.abs(x1 - x2)

  return Math.min(distance, worldWidth - distance)
}
