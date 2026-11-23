import { ScoredGame } from './types'

const generate = require('./index').default as typeof import('./index').default
const { newSeed, random, sample, setSeed, shuffle } = require('./random') as typeof import('./random')

// the parts of the hand a shared url has to bring back
const shape = (game: ScoredGame) => ({
    tiles: game.hand.tiles().map((tile) => tile.tile),
    opened: game.hand.sets.map((set) => !!set.isOpened),
    wait: game.hand.wait!.tile,
    tsumo: game.hand.tsumo,
    riichi: !!game.hand.options.riichi,
    wall: game.wall.map((tile) => `${tile.tile}${tile.isClosed ? '' : '!'}`),
    winds: [game.seatWind, game.prevalentWind],
    yaku: game.yaku.map((item) => `${item.name}:${item.fan}`),
    scores: game.scores,
    fan: game.fan,
})


test('one seed draws the same hand again', () => {
    setSeed(42)
    const first = generate()
    setSeed(42)
    const second = generate()

    expect(shape(second)).toEqual(shape(first))
})


test('another seed draws another hand', () => {
    setSeed(1)
    const first = generate()
    setSeed(2)
    const second = generate()

    expect(shape(second)).not.toEqual(shape(first))
})


test('random stays within the bounds', () => {
    setSeed(7)
    for (let idx = 0; idx < 50; idx++) {
        const single = random(3)
        expect(single).toBeGreaterThanOrEqual(0)
        expect(single).toBeLessThanOrEqual(3)

        const ranged = random(5, 7)
        expect(ranged).toBeGreaterThanOrEqual(5)
        expect(ranged).toBeLessThanOrEqual(7)
    }
})


test('shuffle keeps every item and leaves the source alone', () => {
    setSeed(3)
    const source = [1, 2, 3, 4, 5]

    const result = shuffle(source)

    expect(source).toEqual([1, 2, 3, 4, 5])
    expect([...result].sort()).toEqual(source)
})


test('sample picks one of the items', () => {
    setSeed(5)

    expect([7, 8]).toContain(sample([7, 8]))
})


test('a new seed is a positive integer', () => {
    const seed = newSeed()

    expect(Number.isInteger(seed)).toBeTruthy()
    expect(seed).toBeGreaterThanOrEqual(0)
})


// keep the file a module, the helpers would leak into the global test scope
export {}
