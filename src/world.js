import { MAP_SIZES } from './mapSizes.js'
import { createUnit } from './units/unitFactory.js'
import { camera } from './camera.js'
import { CLIMATE_TYPES } from './world/climateTypes.js'
import { generateStartingPosition } from './world/startingPositions.js'

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
      return 'polar'
    }

    if (distanceFromEquator > 0.7) {
      return 'subpolar'
    }

    if (distanceFromEquator > 0.3) {
      return 'temperate'
    }

    return 'tropical'
  },

  getTerrainType(x, y) {
    const climate = this.getClimate(y)

    const isLand = this.landMap[y][x]

    const random = Math.random()

    if (!isLand) {
      return 'water'
    }

    switch (climate) {
      case 'polar':
        return 'snow'

      case 'subpolar':
        if (random < 0.7) {
          return 'tundra'
        }

        return 'forest'

      case 'temperate':
        if (random < 0.3) {
          return 'forest'
        }

        return 'grass'

      case 'tropical':
        if (random < 0.35) {
          return 'forest'
        }

        if (random > 0.9) {
          return 'desert'
        }

        return 'grass'
    }
  },

  getElevationType() {
    const random = Math.random()

    if (random < 0.08) {
      return 'mountain'
    }

    if (random < 0.25) {
      return 'hill'
    }

    return 'flat'
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

  countLandNeighbors(x, y) {
    let count = 0

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue
        }

        let nx = x + dx
        let ny = y + dy

        // World wrapping по X
        if (nx < 0) {
          nx = this.width - 1
        }

        if (nx >= this.width) {
          nx = 0
        }

        if (ny < 0 || ny >= this.height) {
          continue
        }

        if (this.landMap[ny][nx]) {
          count++
        }
      }
    }

    return count
  },

  generateUnits() {
    this.units = []

    const start = generateStartingPosition(this)

    this.units.push(createUnit('settler', start.x, start.y, 1))

    this.units.push(
      createUnit('warrior', (start.x + 1) % this.width, start.y, 1),
    )

    this.units.push(
      createUnit('warrior', (start.x + 2) % this.width, start.y, 1),
    )
  },

  generate() {
    this.generateLandMap()

    this.smoothLandMap()

    this.generateTerrain()

    this.generateUnits()

    console.log('World generated')
    console.log(this.tiles)
  },
}
