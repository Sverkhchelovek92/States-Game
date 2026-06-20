import { MAP_SIZES } from './mapSizes.js'
import { createUnit } from './units/unitFactory.js'

const currentMapSize = MAP_SIZES.small

export const world = {
  width: MAP_SIZES.small.width,
  height: MAP_SIZES.small.height,

  tileSize: 32,

  tiles: [],

  units: [],

  getPixelWidth() {
    return this.width * this.tileSize
  },

  getPixelHeight() {
    return this.height * this.tileSize
  },

  generate() {
    this.tiles = []

    for (let y = 0; y < this.height; y++) {
      const row = []

      for (let x = 0; x < this.width; x++) {
        // temporary random terrain
        const random = Math.random()

        let type = 'grass'

        if (random < 0.15) {
          type = 'water'
        }

        if (random > 0.85) {
          type = 'forest'
        }

        row.push({
          x,
          y,
          type,
        })
      }

      this.tiles.push(row)
    }

    this.units.push(createUnit('settler', 10, 10))

    console.log('World generated')
    console.log(this.tiles)
  },
}
