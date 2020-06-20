const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)


const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8
const celsiusTofahrenheit = (temp) => (temp * 1.8) + 32


module.exports = {
  calculateTip, fahrenheitToCelsius, celsiusTofahrenheit
}
