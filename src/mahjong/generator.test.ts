import { findSet, generateGameState } from './generator'
import { SUITS } from './resources'
import { Tile } from './tiles'


const tiles = (...names: string[]): Tile[] => names.map((name) => new Tile(name))


test('findSet picks a row', () => {
    // the search is randomized, so only the shape of the result is guaranteed
    const set = findSet(tiles('m5', 'm6', 'm9', 'm4', 'm5', 'm6', 'm7'))
    expect(set).toBeTruthy()
    expect(set!.tiles).toHaveLength(3)
    expect(set!.isRow).toBeTruthy()
    expect(set!.tiles[0].isConnected(set!.tiles[1])).toBeTruthy()
    expect(set!.tiles[1].isConnected(set!.tiles[2])).toBeTruthy()
})


test('findSet picks a pair on request', () => {
    const set = findSet(tiles('m5', 'm5'), true)
    expect(set!.value).toEqual('m5')
    expect(set!.isPair).toBeTruthy()
})


test('findSet gives up on unconnected tiles', () => {
    expect(findSet(tiles('m5', 'm9'))).toBeUndefined()
    expect(findSet(tiles('m5', 'm5'), false)).toBeUndefined()
})


test('generateGameState builds a playable hand', () => {
    let generated = 0

    while (generated < 50) {
        const game = generateGameState()
        if (!game) continue

        const { wall, hand, seatWind, prevalentWind } = game
        generated += 1

        expect(wall).toHaveLength(14)
        expect(hand.sets).toHaveLength(4)
        expect(hand.pair).toBeTruthy()
        const kans = hand.sets.filter((set) => set.isKan).length
        expect(hand.tiles()).toHaveLength(14 + kans)
        expect(hand.wait).toBeTruthy()

        // indicators: closed wall tiles at 2..n and 9..n, n between 1 and 5
        const open = wall.map((tile, idx) => (tile.isClosed ? null : idx)).filter((idx) => idx !== null)
        const indicators = open.filter((idx) => idx! < 7)
        expect(indicators.length).toBeGreaterThanOrEqual(1)
        expect(indicators.length).toBeLessThanOrEqual(5)
        expect(open).toEqual(indicators.concat(indicators.map((idx) => idx! + 7)))

        expect(SUITS.w).toContain(seatWind)
        expect(SUITS.w.slice(0, 2)).toContain(prevalentWind)
    }
})
