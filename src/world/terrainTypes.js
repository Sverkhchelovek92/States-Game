export const TERRAIN_TYPES = {
  grass: {
    name: 'Grassland',

    color: '#4caf50',

    movementCost: 1,

    passable: true,

    food: 2,
  },

  forest: {
    name: 'Forest',

    color: '#2e7d32',

    movementCost: 2,

    passable: true,

    food: 1,
  },

  water: {
    name: 'Water',

    color: '#2196f3',

    movementCost: 999,

    passable: false,

    food: 1,
  },

  snow: {
    name: 'Snow',

    color: '#f5f5f5',

    movementCost: 1,

    passable: true,

    food: 0,
  },

  tundra: {
    name: 'Tundra',
    color: '#8fa87a',
    movementCost: 1,

    passable: true,

    food: 1,
  },

  desert: {
    name: 'Desert',
    color: '#d8c27a',
    movementCost: 1,

    passable: true,

    food: 0,
  },
}
