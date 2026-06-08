import { hover } from './hover.js'

export const selection = {
  tileX: null,
  tileY: null,
  tile: null,
}

export function selectHoveredTile() {
  if (!hover.tile) {
    return
  }

  selection.tileX = hover.tileX
  selection.tileY = hover.tileY
  selection.tile = hover.tile
}
