import selector from './selector'

const state = (game: any, scores: any) => ({ app: { game, scores } }) as any

const game = (fan: number, main: number) => ({ fan, scores: { main }, hand: { options: {} } })


test('marks a correct answer', () => {
    const result = selector(state(game(3, 12000), { userFans: 3, userScores: 12000 }))

    expect(result.correctHan).toBeTruthy()
    expect(result.correctScores).toBeTruthy()
})


test('marks a wrong answer', () => {
    const result = selector(state(game(3, 12000), { userFans: 4, userScores: 8000 }))

    expect(result.correctHan).toBeFalsy()
    expect(result.correctScores).toBeFalsy()
})


test('has no opinion before the player answers', () => {
    const result = selector(state(game(3, 12000), { userFans: null, userScores: null }))

    expect(result.correctHan).toBeNull()
    expect(result.correctScores).toBeNull()
})


test('merges the game into the state', () => {
    const result = selector(state(game(3, 12000), { userFans: null, userScores: null }))

    expect(result.fan).toEqual(3)
    expect(result.scores!.main).toEqual(12000)
})


test('is memoized', () => {
    const input = state(game(3, 12000), { userFans: 3, userScores: 12000 })

    expect(selector(input)).toBe(selector(input))
})
