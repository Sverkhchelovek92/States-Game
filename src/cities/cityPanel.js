import { citySelection } from './citySelection.js'

const panel = document.getElementById('city-panel')
const cityName = document.getElementById('city-name')
const cityPopulation = document.getElementById('city-population')
const cityHealth = document.getElementById('city-health')
const cityOwner = document.getElementById('city-owner')
const closeButton = document.getElementById('city-close')

export function showCityPanel() {
  const city = citySelection.city

  if (!city) {
    return
  }

  cityName.textContent = city.name
  cityPopulation.textContent = city.population
  cityHealth.textContent = `${city.health} / ${city.maxHealth}`
  cityOwner.textContent = city.owner

  panel.classList.remove('hidden')
}

export function hideCityPanel() {
  panel.classList.add('hidden')
}

closeButton.addEventListener('click', () => {
  hideCityPanel()
})
