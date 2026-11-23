import selector from './selector'


test('merges the game and the history', () => {
    const game = { number: 2, fan: 3 } as any
    const history = { history: [], current: null, scorePoints: 1, hanPoints: 2 }

    const result = selector({ app: { game, history } } as any)

    expect(result.number).toEqual(2)
    expect(result.fan).toEqual(3)
    expect(result.scorePoints).toEqual(1)
    expect(result.hanPoints).toEqual(2)
})
