const { generateGridLines, calculatePPI, formatGridCaption } = require('../src/paperGenerator')

describe('formatGridCaption', () => {
  test('10を渡すと "10mm × 10mm" を返す', () => {
    expect(formatGridCaption(10)).toBe('10mm × 10mm')
  })

  test('5を渡すと "5mm × 5mm" を返す', () => {
    expect(formatGridCaption(5)).toBe('5mm × 5mm')
  })
})

describe('calculatePPI', () => {
  test('1920x1080ピクセルの24インチモニタのPPIを計算する', () => {
    const ppi = calculatePPI(1920, 1080, 24)
    expect(ppi).toBeCloseTo(91.79, 1)
  })
})

describe('generateGridLines', () => {
  test('幅300・高さ200・間隔100のとき縦線の座標を返す', () => {
    const { verticalLines } = generateGridLines(300, 200, 100)
    expect(verticalLines).toEqual([0, 100, 200, 300])
  })

  test('幅300・高さ200・間隔100のとき横線の座標を返す', () => {
    const { horizontalLines } = generateGridLines(300, 200, 100)
    expect(horizontalLines).toEqual([0, 100, 200])
  })

  describe('バリデーション', () => {
    test('間隔が0のときエラーをスローする', () => {
      expect(() => generateGridLines(300, 200, 0)).toThrow('spacing は1以上の正の数を指定してください')
    })

    test('間隔が負のときエラーをスローする', () => {
      expect(() => generateGridLines(300, 200, -1)).toThrow('spacing は1以上の正の数を指定してください')
    })
  })
})
