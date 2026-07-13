import { MAP_SIZES } from './mapSizes.js'
import { createUnit } from './units/unitFactory.js'
import { camera } from './camera.js'

const currentMapSize = MAP_SIZES.small

export const world = {
  width: currentMapSize.width,
  height: currentMapSize.height,

  tileSize: 32,

  tiles: [],

  units: [],

  getPixelWidth() {
    return this.width * world.tileSize
  },

  getPixelHeight() {
    return this.height * world.tileSize
  },

  getLatitude(y) {
    return y / (this.height - 1)
  },

  getTerrainType(x, y) {
    const latitude = this.getLatitude(y)

    const distanceFromEquator = Math.abs(latitude - 0.5) * 2

    const random = Math.random()

    const isLand = random >= 0.15

    if (!isLand) {
      return 'water'
    }

    if (distanceFromEquator > 0.9) {
      return 'snow'
    }

    if (random > 0.85) {
      return 'forest'
    }

    return 'grass'
  },

  generateTerrain() {
    this.tiles = []

    for (let y = 0; y < this.height; y++) {
      const row = []

      for (let x = 0; x < this.width; x++) {
        row.push({
          x,
          y,
          type: this.getTerrainType(x, y),
        })
      }

      this.tiles.push(row)
    }
  },

  generateUnits() {
    this.units = []

    this.units.push(createUnit('settler', 10, 10, 1))

    this.units.push(createUnit('warrior', 11, 10, 1))

    this.units.push(createUnit('warrior', 13, 10, 1))
  },

  generate() {
    this.generateTerrain()

    this.generateUnits()

    console.log('World generated')
    console.log(this.tiles)
  },
}
