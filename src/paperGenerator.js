function generateGridLines(width, height, spacing) {
  const verticalLines = []
  for (let x = 0; x <= width; x += spacing) {
    verticalLines.push(x)
  }

  const horizontalLines = []
  for (let y = 0; y <= height; y += spacing) {
    horizontalLines.push(y)
  }

  return { verticalLines, horizontalLines }
}

module.exports = { generateGridLines }
