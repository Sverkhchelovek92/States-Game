export function attackUnit(attacker, target) {
  target.health -= attacker.attack

  console.log(
    `${attacker.type} attacked ${target.type}.`,
    `Target health: ${target.health}`,
  )
}
