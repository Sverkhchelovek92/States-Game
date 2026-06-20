import { hover } from '../input/hover.js'
import { camera } from '../camera.js'
import { selection } from '../input/selection.js'
import { unitSelection } from '../units/unitSelection.js'
import { game } from '../game/game.js'
import { UNIT_TYPES } from '../units/unitTypes.js'

export function renderDebug(ctx) {
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

    ctx.fillText(`Terrain: ${hover.tile.type}`, 10, y)

    y += 35
  }

  // SELECTION

  ctx.fillText('SELECTION', 10, y)

  y += 25

  if (selection.tile) {
    ctx.fillText(`Tile: ${selection.tileX}, ${selection.tileY}`, 10, y)

    y += 25

    ctx.fillText(`Terrain: ${selection.tile.type}`, 10, y)

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
