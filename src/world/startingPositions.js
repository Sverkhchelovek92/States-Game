export function generateStartingPosition(world) {
  while (true) {
    const x = Math.floor(Math.random() * world.width)
    const y = Math.floor(Math.random() * world.height)

    const tile = world.tiles[y][x]

    if (tile.type === 'water') {
      continue
    }

    if (tile.type === 'snow') {
      continue
    }

    return { x, y }
  }
}

function hasEnoughSpace(world, x, y) {
  for (let offset = 0; offset < 3; offset++) {
    const checkX = (x + offset) % world.width

    const tile = world.tiles[y][checkX]

    if (tile.type === 'water') {
      return false
    }

    if (tile.type === 'snow') {
      return false
    }

    if (tile.type === 'desert') {
      return false
    }
  }

  return true
}
