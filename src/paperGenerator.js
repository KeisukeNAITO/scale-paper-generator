function range(max, step) {
  const result = []
  for (let i = 0; i <= max; i += step) {
    result.push(i)
  }
  return result
}

function validateSpacing(spacing) {
  if (spacing <= 0) {
    throw new Error('spacing は1以上の正の数を指定してください')
  }
}

function generateGridLines(width, height, spacing) {
  validateSpacing(spacing)
  return {
    verticalLines: range(width, spacing),
    horizontalLines: range(height, spacing)
  }
}

function calculatePPI(widthPx, heightPx, diagonalInches) {
  const diagonalPx = Math.sqrt(widthPx ** 2 + heightPx ** 2)
  return diagonalPx / diagonalInches
}

function isMajorLine(index, majorEvery) {
  return index % majorEvery === 0
}

function formatGridCaption(mm) {
  return `${mm}mm × ${mm}mm`
}

module.exports = { generateGridLines, calculatePPI, formatGridCaption, isMajorLine }
