export const ELEVATION_TYPES = {
  flat: {
    name: 'Flat',
    color: null,
    movementCost: 0,
    passable: true,
  },

  hill: {
    name: 'Hill',
    color: '#8d6e63',
    movementCost: 1,
    passable: true,
  },

  mountain: {
    name: 'Mountain',
    color: '#757575',
    movementCost: 999,
    passable: false,
  },
}
