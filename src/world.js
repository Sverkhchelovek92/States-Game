import { MAP_SIZES } from './mapSizes.js'
import { createUnit } from './units/unitFactory.js'
import { camera } from './camera.js'
import { CLIMATE_TYPES } from './world/climateTypes.js'

const currentMapSize = MAP_SIZES.small

export const world = {
  width: currentMapSize.width,
  height: currentMapSize.height,

  tileSize: 32,

  tiles: [],

  landMap: [],

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

  getClimate(y) {
    const latitude = this.getLatitude(y)

    const distanceFromEquator = Math.abs(latitude - 0.5) * 2

    if (distanceFromEquator > 0.9) {
      return CLIMATE_TYPES.polar
    }

    if (distanceFromEquator > 0.7) {
      return CLIMATE_TYPES.subpolar
    }

    if (distanceFromEquator > 0.3) {
      return CLIMATE_TYPES.temperate
    }

    return CLIMATE_TYPES.tropical
  },

  getTerrainType(x, y) {
    const latitude = this.getLatitude(y)

    const distanceFromEquator = Math.abs(latitude - 0.5) * 2

    const climate = this.getClimate(y)

    const isLand = this.landMap[y][x]

    const random = Math.random()

    if (!isLand) {
      return 'water'
    }

    if (climate === CLIMATE_TYPES.polar) {
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

  generateLandMap() {
    this.landMap = []

    for (let y = 0; y < this.height; y++) {
      const row = []

      for (let x = 0; x < this.width; x++) {
        row.push(Math.random() > 0.45)
      }

      this.landMap.push(row)
    }
  },

  smoothLandMap() {
    const newLandMap = []

    for (let y = 0; y < this.height; y++) {
      const row = []

      for (let x = 0; x < this.width; x++) {
        const landNeighbors = this.countLandNeighbors(x, y)

        if (landNeighbors >= 5) {
          row.push(true)
        } else {
          row.push(false)
        }
      }

      newLandMap.push(row)
    }

    this.landMap = newLandMap
  },

  generateUnits() {
    this.units = []

    this.units.push(createUnit('settler', 10, 10, 1))

    this.units.push(createUnit('warrior', 11, 10, 1))

    this.units.push(createUnit('warrior', 13, 10, 1))
  },

  generate() {
    this.generateLandMap()

    this.generateTerrain()

    this.generateUnits()

    console.log('World generated')
    console.log(this.tiles)
  },
}
