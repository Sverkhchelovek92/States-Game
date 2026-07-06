export const TERRAIN_TYPES = {
  grass: {
    name: 'Grassland',

    color: '#4caf50',

    movementCost: 1,

    passable: true,
  },

  forest: {
    name: 'Forest',

    color: '#2e7d32',

    movementCost: 2,

    passable: true,
  },

  water: {
    name: 'Water',

    color: '#2196f3',

    movementCost: 999,

    passable: false,
  },

  snow: {
    name: 'Snow',

    color: '#f5f5f5',

    movementCost: 1,

    passable: true,
  },
}
