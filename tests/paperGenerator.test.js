const { generateGridLines, calculatePPI, formatGridCaption, isMajorLine, calculateHeightFromAspectRatio } = require('../src/paperGenerator')

describe('isMajorLine', () => {
  test('インデックスが0はメジャーライン', () => {
    expect(isMajorLine(0, 10)).toBe(true)
  })

  test('インデックスが10はメジャーライン', () => {
    expect(isMajorLine(10, 10)).toBe(true)
  })

  test('インデックスが5はマイナーライン', () => {
    expect(isMajorLine(5, 10)).toBe(false)
  })

  test('インデックスが1はマイナーライン', () => {
    expect(isMajorLine(1, 10)).toBe(false)
  })
})

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

describe('calculateHeightFromAspectRatio', () => {
  test('16:9 で横1920pxのとき縦は1080px', () => {
    expect(calculateHeightFromAspectRatio(1920, 16, 9)).toBe(1080)
  })

  test('16:10 で横1920pxのとき縦は1200px', () => {
    expect(calculateHeightFromAspectRatio(1920, 16, 10)).toBe(1200)
  })

  test('4:3 で横1920pxのとき縦は1440px', () => {
    expect(calculateHeightFromAspectRatio(1920, 4, 3)).toBe(1440)
  })

  test('21:9 で横2560pxのとき縦は1097px', () => {
    expect(calculateHeightFromAspectRatio(2560, 21, 9)).toBe(1097)
  })

  test('1:1 で横1920pxのとき縦は1920px', () => {
    expect(calculateHeightFromAspectRatio(1920, 1, 1)).toBe(1920)
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
