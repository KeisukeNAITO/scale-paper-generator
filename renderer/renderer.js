const { generateGridLines, calculatePPI, formatGridCaption, isMajorLine, calculateHeightFromAspectRatio, formatGridLabel } = require('../src/paperGenerator')

const canvas = document.getElementById('paper')
const ctx = canvas.getContext('2d')
const downloadBtn = document.getElementById('download')
const aspectRatioSelect = document.getElementById('aspectRatio')
const widthInput = document.getElementById('width')
const heightInput = document.getElementById('height')

function applyAspectRatio() {
  const [w, h] = aspectRatioSelect.value.split(':').map(Number)
  heightInput.value = calculateHeightFromAspectRatio(Number(widthInput.value), w, h)
}

aspectRatioSelect.addEventListener('change', applyAspectRatio)
widthInput.addEventListener('input', applyAspectRatio)

document.getElementById('generate').addEventListener('click', () => {
  const widthPx = Number(widthInput.value)
  const heightPx = Number(heightInput.value)
  const diagonalInches = Number(document.getElementById('diagonal').value)

  const ppi = calculatePPI(widthPx, heightPx, diagonalInches)
  const spacingPx = Math.round(ppi / 25.4 * 10) // 10mm間隔

  canvas.width = widthPx
  canvas.height = heightPx

  const { verticalLines, horizontalLines } = generateGridLines(widthPx, heightPx, spacingPx)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const gridMm = 10
  const fontSize = Math.round(spacingPx * 0.4)
  ctx.font = `${fontSize}px sans-serif`

  verticalLines.forEach((x, index) => {
    ctx.strokeStyle = isMajorLine(index, 10) ? '#888888' : '#cccccc'
    ctx.lineWidth = isMajorLine(index, 10) ? 1.5 : 1
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, heightPx)
    ctx.stroke()

    const label = formatGridLabel(index, gridMm)
    if (label) {
      ctx.fillStyle = '#999999'
      ctx.fillText(label, x + spacingPx * 0.05, fontSize)
    }
  })

  horizontalLines.forEach((y, index) => {
    ctx.strokeStyle = isMajorLine(index, 10) ? '#888888' : '#cccccc'
    ctx.lineWidth = isMajorLine(index, 10) ? 1.5 : 1
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(widthPx, y)
    ctx.stroke()

    const label = formatGridLabel(index, gridMm)
    if (label) {
      ctx.fillStyle = '#999999'
      ctx.fillText(label, spacingPx * 0.05, y + fontSize)
    }
  })

  ctx.fillStyle = '#999999'
  ctx.fillText(formatGridCaption(gridMm), spacingPx * 0.2, spacingPx * 0.7)

  downloadBtn.disabled = false
})

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a')
  link.download = 'wallpaper.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
})
