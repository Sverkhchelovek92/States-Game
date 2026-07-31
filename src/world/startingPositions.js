export function generateStartingPosition(world) {
  while (true) {
    const x = Math.floor(Math.random() * world.width)
    const y = Math.floor(Math.random() * world.height)

    const tile = world.tiles[y][x]

    if (tile.terrain === 'water') {
      continue
    }

    if (tile.terrain === 'snow') {
      continue
    }

    return { x, y }
  }
}

function hasEnoughSpace(world, x, y) {
  for (let offset = 0; offset < 3; offset++) {
    const checkX = (x + offset) % world.width

    const tile = world.tiles[y][checkX]

    if (tile.terrain === 'water') {
      return false
    }

    if (tile.terrain === 'snow') {
      return false
    }

    if (tile.terrain === 'desert') {
      return false
    }
  }

  return true
}
