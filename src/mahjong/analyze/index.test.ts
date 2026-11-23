import { Hand } from '../tiles'

import fu from './fu'

// our transform does not hoist jest.mock above the imports, so the mocked
// modules are required by hand after the mock is in place
jest.mock('lodash/random', () => ({ __esModule: true, default: jest.fn() }))

const mockRandom = require('lodash/random').default as jest.Mock
const analyze = require('./index').default as typeof import('./index').default


beforeEach(() => mockRandom.mockReturnValue(99))


const names = (yaku: { name: string }[]): string[] => yaku.map((item) => item.name)


test('offers riichi when the hand has no yaku', () => {
    const hand = Hand.create('m1m2m3 p7p8p9 s2s3s4 m9m9m9 wNwN')

    const { yaku } = analyze({ hand })

    expect(names(yaku)).toEqual(['riichi'])
    expect(hand.options.riichi).toBeTruthy()
})


test('keeps the hand clean when a yaku is found', () => {
    const hand = Hand.create('m2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5')

    const { yaku } = analyze({ hand })

    expect(names(yaku)).toContain('tanyao')
    expect(hand.options.riichi).toBeUndefined()
})


test('marks the hand as tsumo when the draw is a self draw', () => {
    mockRandom.mockReturnValue(0)

    const hand = Hand.create('m2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5')
    const { yaku } = analyze({ hand })

    expect(hand.tsumo).toBeTruthy()
    expect(names(yaku)).toContain('tsumo')
})


test('a yakuman stops the yaku list', () => {
    const hand = Hand.create('dRdRdR dWdWdW dGdGdG m1m2m3 wNwN')

    const { yaku } = analyze({ hand })

    expect(names(yaku)).toEqual(['dai sangen'])
    expect(hand.options.yakuman).toBeTruthy()
    expect(hand.options['toitoi']).toBeUndefined()
})


test('excluded yaku are not scored twice', () => {
    const hand = Hand.create('m1m2m3 m4m5m6 m7m8m9 m1m1m1 m5m5')

    const { yaku } = analyze({ hand })

    expect(names(yaku)).toContain('chinitsu')
    expect(names(yaku)).not.toContain('honitsu')
})


test('opened hands keep their decomposition', () => {
    const hand = Hand.create('m2m3m4 p4p5p6 s4s5s6 m6m7m8 m5m5')
    hand.isOpened = true

    const { yaku, hand: result } = analyze({ hand })

    expect(result.isOpened).toBeTruthy()
    expect(names(yaku)).not.toContain('riichi')
})


test('the wait is placed where it scores the most', () => {
    mockRandom.mockReturnValueOnce(0) // tsumo
    mockRandom.mockReturnValueOnce(99) // no riichi
    // 6s6s7s7s7s8s8s8s9s NNN 8m8m drawn on 8s: the 789 chow turns it into a kanchan
    const hand = Hand.create('s6s7s8s6s7s8s7s8s9wNwNwNm8m8')
    hand.wait = hand.sets[2].tiles[1]

    const { hand: result, yaku } = analyze({ hand })

    expect(names(yaku)).toEqual(['iipeikou', 'tsumo'])
    expect(result.wait!.set!.tiles.map((tile) => tile.tile)).toEqual(['s7', 's8', 's9'])
    expect(fu(result, 2).minipoints).toEqual(40)
})


test('the wait points at the set it belongs to', () => {
    const hand = Hand.create('s1s2s3s1s2s3s1s2s3s4s5s6s1s1')
    hand.wait = hand.tiles().find((tile) => tile.tile === 's4')!

    const { hand: result } = analyze({ hand })

    const holders = [result.pair!, ...result.sets].filter(
        (set) => set.tiles.some((tile) => tile.id === result.wait!.id),
    )
    expect(holders).toHaveLength(1)
    expect(result.wait!.set).toBe(holders[0])
})
