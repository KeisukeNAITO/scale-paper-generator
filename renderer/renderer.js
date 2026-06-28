const { generateGridLines, calculatePPI } = require('../src/paperGenerator')

const canvas = document.getElementById('paper')
const ctx = canvas.getContext('2d')

document.getElementById('generate').addEventListener('click', () => {
  const widthPx = Number(document.getElementById('width').value)
  const heightPx = Number(document.getElementById('height').value)
  const diagonalInches = Number(document.getElementById('diagonal').value)

  const ppi = calculatePPI(widthPx, heightPx, diagonalInches)
  const spacingPx = Math.round(ppi / 25.4 * 10) // 10mm間隔

  canvas.width = widthPx
  canvas.height = heightPx

  const { verticalLines, horizontalLines } = generateGridLines(widthPx, heightPx, spacingPx)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = '#cccccc'
  ctx.lineWidth = 1

  verticalLines.forEach(x => {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, heightPx)
    ctx.stroke()
  })

  horizontalLines.forEach(y => {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(widthPx, y)
    ctx.stroke()
  })
})
