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

export function clearSelection() {
  selection.tileX = null
  selection.tileY = null
  selection.tile = null
}
