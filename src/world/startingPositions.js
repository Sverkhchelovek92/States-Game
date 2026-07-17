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
