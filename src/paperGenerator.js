function range(max, step) {
  const result = []
  for (let i = 0; i <= max; i += step) {
    result.push(i)
  }
  return result
}

function generateGridLines(width, height, spacing) {
  if (spacing <= 0) {
    throw new Error('spacing は1以上の正の数を指定してください')
  }
  return {
    verticalLines: range(width, spacing),
    horizontalLines: range(height, spacing)
  }
}

module.exports = { generateGridLines }
