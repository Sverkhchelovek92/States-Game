import { world } from '../world.js'
import { camera } from '../camera.js'
import { hover } from '../input/hover.js'
import { selection } from '../input/selection.js'
import { unitSelection } from '../units/unitSelection.js'
import { UNIT_TYPES } from '../units/unitTypes.js'
import { TERRAIN_TYPES } from '../world/terrainTypes.js'
import { RESOURCE_TYPES } from '../world/resourceTypes.js'
import { getAvailableMoves } from '../units/unitMovement.js'

export function renderWorld(ctx) {
  drawTiles(ctx)

  drawElevation(ctx)

  drawResources(ctx)

  drawAvailableMoves(ctx)
  drawPath(ctx)

  drawHover(ctx)
  drawSelection(ctx)

  drawUnits(ctx)
  drawSelectedUnit(ctx)
}

function drawTiles(ctx) {
  const mapPixelWidth = world.getPixelWidth()

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      const worldX = x * world.tileSize
      const worldY = y * world.tileSize

      for (const offset of [-1, 0, 1]) {
        const screenX = worldX + offset * mapPixelWidth - camera.x
        const screenY = worldY - camera.y

        const terrain = TERRAIN_TYPES[tile.terrain]

        ctx.fillStyle = terrain.color

        ctx.fillRect(screenX, screenY, world.tileSize, world.tileSize)

        ctx.strokeStyle = '#111'

        ctx.strokeRect(screenX, screenY, world.tileSize, world.tileSize)
      }
    }
  }
}

function drawElevation(ctx) {
  const mapPixelWidth = world.getPixelWidth()

  ctx.save()

  ctx.fillStyle = '#222'
  ctx.font = '18px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      if (tile.elevation === 'flat') {
        continue
      }

      const worldX = x * world.tileSize
      const worldY = y * world.tileSize

      for (const offset of [-1, 0, 1]) {
        const screenX = worldX + offset * mapPixelWidth - camera.x
        const screenY = worldY - camera.y

        let symbol = ''

        if (tile.elevation === 'hill') {
          symbol = '▲'
        }

        if (tile.elevation === 'mountain') {
          symbol = '⛰'
        }

        ctx.fillText(
          symbol,
          screenX + world.tileSize / 2,
          screenY + world.tileSize / 2,
        )
      }
    }
  }

  ctx.restore()
}

function drawResources(ctx) {
  const mapPixelWidth = world.getPixelWidth()

  ctx.save()

  ctx.font = '14px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let y = 0; y < world.height; y++) {
    for (let x = 0; x < world.width; x++) {
      const tile = world.tiles[y][x]

      if (!tile.resource) {
        continue
      }

      const resource = RESOURCE_TYPES[tile.resource]

      ctx.fillStyle = resource.color

      const worldX = x * world.tileSize
      const worldY = y * world.tileSize

      for (const offset of [-1, 0, 1]) {
        const screenX = worldX + offset * mapPixelWidth - camera.x
        const screenY = worldY - camera.y

        ctx.fillText(
          resource.symbol,
          screenX + world.tileSize / 2,
          screenY + world.tileSize / 2,
        )
      }
    }
  }

  ctx.restore()
}

function drawAvailableMoves(ctx) {
  if (!unitSelection.unit) {
    return
  }

  const moves = getAvailableMoves(unitSelection.unit)
  const mapPixelWidth = world.getPixelWidth()

  ctx.save()

  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'

  for (const move of moves) {
    const worldX = move.x * world.tileSize
    const worldY = move.y * world.tileSize

    for (const offset of [-1, 0, 1]) {
      const screenX = worldX + offset * mapPixelWidth - camera.x

      const screenY = worldY - camera.y

      ctx.fillRect(screenX, screenY, world.tileSize, world.tileSize)
    }
  }

  ctx.restore()
}

function drawPath(ctx) {}

function drawHover(ctx) {
  if (!hover.tile) {
    return
  }

  const mapPixelWidth = world.getPixelWidth()

  const worldX = hover.tileX * world.tileSize
  const worldY = hover.tileY * world.tileSize

  ctx.strokeStyle = '#ffff00'
  ctx.lineWidth = 3

  for (const offset of [-1, 0, 1]) {
    const screenX = worldX + offset * mapPixelWidth - camera.x
    const screenY = worldY - camera.y

    ctx.strokeRect(screenX, screenY, world.tileSize, world.tileSize)
  }
}

function drawSelection(ctx) {
  if (!selection.tile) {
    return
  }

  const mapPixelWidth = world.getPixelWidth()

  const worldX = selection.tileX * world.tileSize
  const worldY = selection.tileY * world.tileSize

  ctx.strokeStyle = '#00ff00'
  ctx.lineWidth = 3

  for (const offset of [-1, 0, 1]) {
    const screenX = worldX + offset * mapPixelWidth - camera.x
    const screenY = worldY - camera.y

    ctx.strokeRect(screenX, screenY, world.tileSize, world.tileSize)
  }
}

function drawUnits(ctx) {
  const mapPixelWidth = world.getPixelWidth()

  for (const unit of world.units) {
    const worldX = unit.x * world.tileSize
    const worldY = unit.y * world.tileSize

    const unitType = UNIT_TYPES[unit.type]

    ctx.fillStyle = unitType.color

    for (const offset of [-1, 0, 1]) {
      const screenX = worldX + offset * mapPixelWidth - camera.x
      const screenY = worldY - camera.y

      ctx.fillRect(
        screenX + 8,
        screenY + 8,
        world.tileSize - 16,
        world.tileSize - 16,
      )
    }
  }
}

function drawSelectedUnit(ctx) {
  if (!unitSelection.unit) {
    return
  }

  const mapPixelWidth = world.getPixelWidth()

  const unit = unitSelection.unit

  const worldX = unit.x * world.tileSize
  const worldY = unit.y * world.tileSize

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 3

  for (const offset of [-1, 0, 1]) {
    const screenX = worldX + offset * mapPixelWidth - camera.x
    const screenY = worldY - camera.y

    ctx.strokeRect(
      screenX + 4,
      screenY + 4,
      world.tileSize - 8,
      world.tileSize - 8,
    )
  }
}
