import { world } from './world.js'

export function getNeighbors(x, y) {
  const neighbors = []

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      // Don't add our square
      if (dx === 0 && dy === 0) {
        continue
      }

      const neighborY = y + dy

      // Top and bottom edge
      if (neighborY < 0 || neighborY >= world.height) {
        continue
      }

      // Horizontal wrap
      const neighborX = (((x + dx) % world.width) + world.width) % world.width

      neighbors.push({
        x: neighborX,
        y: neighborY,
      })
    }
  }

  return neighbors
}
