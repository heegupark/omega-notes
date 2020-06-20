const { calculateTip, fahrenheitToCelsius, celsiusTofahrenheit }  = require('../src/math')

test('Should calcualte total with tip', () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
  // if(total !== 13) {
  //   throw new Error('Total tip should be 13. Got ' + total)
  // }
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})
// Why test?
//
// - Saves time
// - Create reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind
test('Should convert 32 F to 0 C', () => {
  const convert = fahrenheitToCelsius(32)
  expect(convert).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
  const convert = celsiusTofahrenheit(0)
  expect(convert).toBe(32)
})
