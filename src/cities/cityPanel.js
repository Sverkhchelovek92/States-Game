import { citySelection } from './citySelection.js'
import { startCityProduction } from './cityProduction.js'
import { PRODUCTION_ITEMS } from './productionItems.js'

const panel = document.getElementById('city-panel')
const cityName = document.getElementById('city-name')
const cityPopulation = document.getElementById('city-population')
const cityHealth = document.getElementById('city-health')
const cityOwner = document.getElementById('city-owner')
const closeButton = document.getElementById('city-close')
const productionItem = document.getElementById('city-production-item')
const warriorButton = document.getElementById('produce-warrior')
const settlerButton = document.getElementById('produce-settler')
const productionProgress = document.getElementById('city-production-progress')

export function showCityPanel() {
  const city = citySelection.city

  if (!city) {
    return
  }

  cityName.textContent = city.name
  cityPopulation.textContent = city.population
  cityHealth.textContent = `${city.health} / ${city.maxHealth}`
  cityOwner.textContent = city.owner
  const item = PRODUCTION_ITEMS[city.productionItem]

  productionItem.textContent = item?.name || 'None'

  productionProgress.textContent = item
    ? `${city.productionProgress} / ${item.cost}`
    : '0 / 0'

  panel.classList.remove('hidden')
}

export function hideCityPanel() {
  panel.classList.add('hidden')
}

closeButton.addEventListener('click', () => {
  hideCityPanel()
})

warriorButton.addEventListener('click', () => {
  const city = citySelection.city
  console.log('Warrior button clicked')

  if (!city) {
    return
  }

  startCityProduction(city, 'warrior')
  showCityPanel()
})

settlerButton.addEventListener('click', () => {
  const city = citySelection.city
  console.log('Settler button clicked')

  if (!city) {
    return
  }

  startCityProduction(city, 'settler')
  showCityPanel()
})

document.addEventListener('click', (event) => {
  console.log('CLICK:', event.target)
})
