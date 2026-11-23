jest.mock('./generator', () => {
    const actual = jest.requireActual('./generator')
    return {
        __esModule: true,
        generateGameState: jest.fn(actual.generateGameState),
    }
})

const { generateGameState } = require('./generator') as { generateGameState: jest.Mock }
const generate = require('./index').default

const { Hand, Tile } = require('./tiles') as typeof import('./tiles')

const game = (mask: string): any => ({
    hand: Hand.create(mask),
    wall: Array.from({ length: 14 }, () => new Tile('m9')).map((tile) => {
        tile.isClosed = true
        return tile
    }),
    seatWind: 'wS',
    prevalentWind: 'wE',
})


test('redraws until the generator produces a hand', () => {
    generateGameState
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(game('m2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5'))

    const result = generate()

    expect(generateGameState).toHaveBeenCalledTimes(3)
    expect(result.hand.tiles()).toHaveLength(14)
    expect(typeof result.scores.main).toEqual('number')
    expect(result.yaku).toBeTruthy()
})


// keep the file a module, the helpers would leak into the global test scope
export {}
