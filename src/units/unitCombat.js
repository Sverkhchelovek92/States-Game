import { world } from '../world.js'
import { clearUnitSelection } from './unitSelection.js'

export function attackUnit(attacker, target) {
  if (attacker.movement <= 0) {
    return
  }

  const distanceX = getWrappedDistanceX(attacker.x, target.x, world.width)

  const distanceY = Math.abs(attacker.y - target.y)

  const distance = Math.max(distanceX, distanceY)

  if (distance > attacker.attackRange) {
    console.log('Target is too far away')
    return
  }

  if (attacker.attack <= 0) {
    console.log('This unit cannot attack')
    return
  }

  // Damage to target
  const damageToTarget = Math.max(1, attacker.attack - target.defense / 2)

  target.health -= damageToTarget

  console.log(
    `${attacker.type} attacked ${target.type}.`,
    `Damage: ${damageToTarget}.`,
    `Target health: ${target.health}`,
  )

  // Counterattack
  if (target.health > 0 && target.attack > 0) {
    const damageToAttacker = Math.max(1, target.attack / 4)

    attacker.health -= damageToAttacker

    console.log(
      `${target.type} counterattacked ${attacker.type}.`,
      `Damage: ${damageToAttacker}.`,
      `Attacker health: ${attacker.health}`,
    )
  }

  // Attack consumes all movement
  attacker.movement = 0

  // Target dies
  if (target.health <= 0) {
    removeUnit(target)
  }

  // Attacker dies
  if (attacker.health <= 0) {
    removeUnit(attacker)
    clearUnitSelection()
  }
}

function removeUnit(unit) {
  const index = world.units.indexOf(unit)

  if (index !== -1) {
    world.units.splice(index, 1)
  }
}

function getWrappedDistanceX(x1, x2, worldWidth) {
  const distance = Math.abs(x1 - x2)

  return Math.min(distance, worldWidth - distance)
}
