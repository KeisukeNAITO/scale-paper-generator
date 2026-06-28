const { generateGridLines } = require('../src/paperGenerator')

describe('generateGridLines', () => {
  test('幅300・高さ200・間隔100のとき縦線の座標を返す', () => {
    const { verticalLines } = generateGridLines(300, 200, 100)
    expect(verticalLines).toEqual([0, 100, 200, 300])
  })

  test('幅300・高さ200・間隔100のとき横線の座標を返す', () => {
    const { horizontalLines } = generateGridLines(300, 200, 100)
    expect(horizontalLines).toEqual([0, 100, 200])
  })
})
