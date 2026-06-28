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

  describe('バリデーション', () => {
    test('間隔が0のときエラーをスローする', () => {
      expect(() => generateGridLines(300, 200, 0)).toThrow('spacing は1以上の正の数を指定してください')
    })

    test('間隔が負のときエラーをスローする', () => {
      expect(() => generateGridLines(300, 200, -1)).toThrow('spacing は1以上の正の数を指定してください')
    })
  })
})
