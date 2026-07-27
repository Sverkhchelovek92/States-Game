import { hover } from '../input/hover.js'
import { camera } from '../camera.js'
import { selection } from '../input/selection.js'
import { unitSelection } from '../units/unitSelection.js'
import { game } from '../game/game.js'
import { UNIT_TYPES } from '../units/unitTypes.js'
import { TERRAIN_TYPES } from '../world/terrainTypes.js'
import { ELEVATION_TYPES } from '../world/elevationTypes.js'
import { world } from '../world.js'

export function renderDebug(ctx) {
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px Arial'

  let y = 25

  ctx.fillText('STATES DEV BUILD', 10, y)

  y += 35

  ctx.fillText(`Turn: ${game.turn}`, 10, y)

  y += 35

  // HOVER

  ctx.fillText('HOVER', 10, y)

  y += 25

  if (hover.tile) {
    ctx.fillText(`Tile: ${hover.tileX}, ${hover.tileY}`, 10, y)

    y += 25

    const climate = world.getClimate(hover.tileY)

    ctx.fillText(`Climate: ${climate}`, 10, y)

    y += 25

    const terrain = TERRAIN_TYPES[hover.tile.type]

    ctx.fillText(`Terrain: ${terrain.name}`, 10, y)

    y += 15

    const elevation = ELEVATION_TYPES[hover.tile.elevation]

    y += 25

    ctx.fillText(`Elevation: ${elevation.name}`, 10, y)

    y += 25
  }

  // SELECTION

  ctx.fillText('SELECTION', 10, y)

  y += 25

  if (selection.tile) {
    ctx.fillText(`Tile: ${selection.tileX}, ${selection.tileY}`, 10, y)

    y += 25

    const terrain = TERRAIN_TYPES[hover.tile.type]

    ctx.fillText(`Terrain: ${terrain.name}`, 10, y)

    y += 35
  }

  // UNIT

  ctx.fillText('UNIT', 10, y)

  y += 25

  if (unitSelection.unit) {
    const unit = unitSelection.unit

    const unitData = UNIT_TYPES[unit.type]

    ctx.fillText(`ID: ${unit.id}`, 10, y)

    y += 25

    ctx.fillText(`Name: ${unitData.name}`, 10, y)

    y += 25

    ctx.fillText(`Position: ${unit.x}, ${unit.y}`, 10, y)

    y += 25

    ctx.fillText(`Movement: ${unit.movement}/${unit.maxMovement}`, 10, y)

    y += 35
  }
  // CAMERA

  ctx.fillText('CAMERA', 10, y)

  y += 25

  ctx.fillText(`X: ${Math.floor(camera.x)}`, 10, y)

  y += 25

  ctx.fillText(`Y: ${Math.floor(camera.y)}`, 10, y)
}
