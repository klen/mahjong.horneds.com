jest.mock('./generator', () => {
    const actual = jest.requireActual('./generator')
    return {
        __esModule: true,
        generateGameState: jest.fn(actual.generateGameState),
    }
})

const { generateGameState } = require('./generator') as { generateGameState: jest.Mock }
const generate = require('./index').default


test('redraws until the generator produces a hand', () => {
    generateGameState.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined)

    const result = generate()

    expect(generateGameState).toHaveBeenCalledTimes(3)
    expect(result.hand.tiles()).toHaveLength(14)
    expect(typeof result.scores.main).toEqual('number')
    expect(result.yaku).toBeTruthy()
})


// keep the file a module, the helpers would leak into the global test scope
export {}
