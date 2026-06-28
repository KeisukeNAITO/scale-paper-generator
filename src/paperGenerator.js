function range(max, step) {
  const result = []
  for (let i = 0; i <= max; i += step) {
    result.push(i)
  }
  return result
}

function generateGridLines(width, height, spacing) {
  return {
    verticalLines: range(width, spacing),
    horizontalLines: range(height, spacing)
  }
}

module.exports = { generateGridLines }
