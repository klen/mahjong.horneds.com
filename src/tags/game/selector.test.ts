import selector from './selector'


test('selects the game', () => {
    const game = { inited: true, number: 3 } as any

    expect(selector({ app: { game } } as any)).toBe(game)
})
