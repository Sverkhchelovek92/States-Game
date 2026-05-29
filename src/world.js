import { MAP_SIZES } from './mapSizes.js'

const currentMapSize = MAP_SIZES.small

export const world = {
  width: MAP_SIZES.small.width,
  height: MAP_SIZES.small.height,

  tileSize: 32,

  tiles: [],

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

    console.log('World generated')
    console.log(this.tiles)
  },
}
