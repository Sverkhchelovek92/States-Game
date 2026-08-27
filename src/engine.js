import { renderWorld } from './render/worldRenderer.js'
import { camera } from './camera.js'
import { world } from './world.js'
import { updateHover } from './input/hover.js'
import { renderDebug } from './render/debugRenderer.js'
import { selectHoveredTile } from './input/selection.js'
import { hover } from './input/hover.js'
import { getUnitAt } from './units/unitUtils.js'
import { unitSelection, selectUnitUnderCursor } from './units/unitSelection.js'
import { moveSelectedUnit } from './units/unitActions.js'
import { clearSelection } from './input/selection.js'
import { clearUnitSelection } from './units/unitSelection.js'
import { endTurn } from './game/turnSystem.js'
import { movementState } from './units/unitMovement.js'

export const engine = {
  canvas: null,
  ctx: null,

  width: 0,
  height: 0,

  dpr: window.devicePixelRatio || 1,

  mouse: {
    x: 0,
    y: 0,
  },

  init() {
    this.createCanvas()
    this.resize()

    window.addEventListener('resize', () => {
      this.resize()
    })

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = event.clientX
      this.mouse.y = event.clientY
    })

    window.addEventListener('mousedown', (event) => {
      if (event.button !== 0) {
        return
      }

      const unitUnderCursor = getUnitAt(hover.tileX, hover.tileY)

      // Click on unit
      if (unitUnderCursor) {
        selectUnitUnderCursor()
        return
      }

      // If unit is already clicked
      if (unitSelection.unit) {
        moveSelectedUnit()
        return
      }

      // Otherwise choose tile
      selectHoveredTile()
    })

    window.addEventListener('contextmenu', (event) => {
      event.preventDefault()

      movementState.path = null

      clearSelection()
      clearUnitSelection()
    })

    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        endTurn()
      }
    })

    this.loop()
  },

  createCanvas() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    document.body.appendChild(this.canvas)
  },

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.canvas.width = this.width * this.dpr
    this.canvas.height = this.height * this.dpr

    this.canvas.style.width = `${this.width}px`
    this.canvas.style.height = `${this.height}px`

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  },

  update() {
    // camera mouse tracking
    // left
    if (this.mouse.x < camera.edgeSize) {
      camera.x -= camera.speed
    }

    // right
    if (this.mouse.x > this.width - camera.edgeSize) {
      camera.x += camera.speed
    }

    // top
    if (this.mouse.y < camera.edgeSize) {
      camera.y -= camera.speed
    }

    // bottom
    if (this.mouse.y > this.height - camera.edgeSize) {
      camera.y += camera.speed
    }

    // y limit
    const maxCameraY = Math.max(0, world.getPixelHeight() - this.height)

    if (camera.y < 0) {
      camera.y = 0
    }

    if (camera.y > maxCameraY) {
      camera.y = maxCameraY
    }

    // x wrapping

    const mapPixelWidth = world.getPixelWidth()

    camera.x = ((camera.x % mapPixelWidth) + mapPixelWidth) % mapPixelWidth

    // update hover

    updateHover(this.mouse.x, this.mouse.y)
  },

  render() {
    // background
    this.ctx.fillStyle = '#1a1a1a'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // debug text
    this.ctx.fillStyle = '#1a1a1a'
    this.ctx.fillRect(0, 0, this.width, this.height)

    renderWorld(this.ctx)

    renderDebug(this.ctx)
  },

  loop() {
    this.update()
    this.render()

    requestAnimationFrame(() => this.loop())
  },
}
