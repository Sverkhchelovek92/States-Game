import { renderWorld } from './render/worldRenderer.js'

export const engine = {
  canvas: null,
  ctx: null,

  width: 0,
  height: 0,

  dpr: window.devicePixelRatio || 1,

  init() {
    this.createCanvas()
    this.resize()

    window.addEventListener('resize', () => {
      this.resize()
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
    // game logic
  },

  render() {
    // background
    this.ctx.fillStyle = '#1a1a1a'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // debug text
    this.ctx.fillStyle = '#1a1a1a'
    this.ctx.fillRect(0, 0, this.width, this.height)

    renderWorld(this.ctx)
  },

  loop() {
    this.update()
    this.render()

    requestAnimationFrame(() => this.loop())
  },
}
