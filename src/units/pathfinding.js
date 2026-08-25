import { world } from '../world.js'
import { getNeighbors } from '../world/neighbors.js'
import { getMovementCost } from '../world/movement.js'
import { getUnitAt } from './unitUtils.js'

export function findPath(unit, targetX, targetY) {
  const startX = unit.x
  const startY = unit.y

  const targetTile = world.tiles[targetY][targetX]

  // Impossible Target
  if (!Number.isFinite(getMovementCost(targetTile))) {
    return null
  }

  // Another Unit on Target
  const targetUnit = getUnitAt(targetX, targetY)

  if (targetUnit && targetUnit !== unit) {
    return null
  }

  const openSet = []
  const closedSet = new Set()

  const nodes = new Map()

  const startKey = getKey(startX, startY)

  const startNode = {
    x: startX,
    y: startY,

    g: 0,
    h: heuristic(startX, startY, targetX, targetY),

    parent: null,
  }

  startNode.f = startNode.g + startNode.h

  openSet.push(startNode)
  nodes.set(startKey, startNode)

  while (openSet.length > 0) {
    const current = getLowestCostNode(openSet)

    // On target
    if (current.x === targetX && current.y === targetY) {
      return reconstructPath(current)
    }

    // Delete current square from openSet
    const currentIndex = openSet.indexOf(current)

    openSet.splice(currentIndex, 1)

    closedSet.add(getKey(current.x, current.y))

    const neighbors = getNeighbors(current.x, current.y)

    for (const neighbor of neighbors) {
      const neighborKey = getKey(neighbor.x, neighbor.y)

      if (closedSet.has(neighborKey)) {
        continue
      }

      // You can't go through another unit
      const unitAtNeighbor = getUnitAt(neighbor.x, neighbor.y)

      if (unitAtNeighbor && unitAtNeighbor !== unit) {
        continue
      }

      const tile = world.tiles[neighbor.y][neighbor.x]

      const movementCost = getMovementCost(tile)

      // Impossible square
      if (!Number.isFinite(movementCost)) {
        continue
      }

      const tentativeG = current.g + movementCost

      let neighborNode = nodes.get(neighborKey)

      if (!neighborNode) {
        neighborNode = {
          x: neighbor.x,
          y: neighbor.y,

          g: Infinity,
          h: heuristic(neighbor.x, neighbor.y, targetX, targetY),

          parent: null,
        }

        neighborNode.f = neighborNode.g + neighborNode.h

        nodes.set(neighborKey, neighborNode)
      }

      // Cheaper path
      if (tentativeG >= neighborNode.g) {
        continue
      }

      neighborNode.parent = current
      neighborNode.g = tentativeG
      neighborNode.f = neighborNode.g + neighborNode.h

      if (!openSet.includes(neighborNode)) {
        openSet.push(neighborNode)
      }
    }
  }

  // No path
  return null
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

function heuristic(x, y, targetX, targetY) {
  const dx = Math.abs(targetX - x)
  const dy = Math.abs(targetY - y)

  // Horisontal Wrap
  const wrappedDx = Math.min(dx, world.width - dx)

  return Math.max(wrappedDx, dy)
}
