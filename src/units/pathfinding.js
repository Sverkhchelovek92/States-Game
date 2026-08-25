import { world } from '../world.js'
import { getNeighbors } from '../world/neighbors.js'
import { getMovementCost } from '../world/movement.js'
import { getUnitAt } from './unitUtils.js'

export function findPath(unit, targetX, targetY) {
  const startX = unit.x
  const startY = unit.y

  const targetTile = world.tiles[targetY][targetX]
}

function getLowestCostNode(nodes) {
  let bestNode = nodes[0]

  for (const node of nodes) {
    if (node.f < bestNode.f) {
      bestNode = node
      continue
    }

    if (node.f === bestNode.f && node.h < bestNode.h) {
      bestNode = node
    }
  }

  return bestNode
}

function reconstructPath(node) {
  const path = []

  let current = node

  while (current.parent) {
    path.unshift({
      x: current.x,
      y: current.y,
    })

    current = current.parent
  }

  return path
}

function getKey(x, y) {
  return `${x},${y}`
}
