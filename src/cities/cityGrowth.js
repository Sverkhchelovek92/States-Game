export function processCityGrowth(city) {
  if (city.food < city.foodToGrow) {
    return
  }

  city.food -= city.foodToGrow
  city.population += 1

  city.foodToGrow = city.population * 10

  console.log(`${city.name} grew to population ${city.population}`)
}
