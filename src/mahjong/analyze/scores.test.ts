import { Hand, Tile, TileSet } from '../tiles'
import { ScoredGame, YakuItem } from '../types'

import scores from './scores'


const yaku = (fan: number): YakuItem[] => [{ fan, name: 'test', desc: '' }]

const wall = (): Tile[] => {
    const tiles = Array.from({ length: 14 }, () => new Tile('m9'))
    for (const tile of tiles) tile.isClosed = true
    return tiles
}

// an indicator only counts when the tile is revealed
const reveal = (tiles: Tile[], idx: number, name: string): Tile => {
    tiles[idx] = new Tile(name)
    tiles[idx].isClosed = false
    return tiles[idx]
}

const score = (
    hand: Hand,
    fan: number,
    options: { seatWind?: string, prevalentWind?: string, wall?: Tile[] } = {},
): ScoredGame => scores({
    hand,
    yaku: yaku(fan),
    wall: options.wall || wall(),
    seatWind: options.seatWind || 'wS',
    prevalentWind: options.prevalentWind || 'wE',
})

const ronHand = (mask: string): Hand => {
    const hand = Hand.create(mask)
    // wait on the last tile of a chow that is not a penchan
    hand.wait = hand.sets[0].tiles[2]
    return hand
}


test('counts fu for concealed honor kan', () => {
    const hand = new Hand(
        TileSet.create('wEwEwEwE'),
        TileSet.create('m2m3m4'),
        TileSet.create('p2p3p4'),
        TileSet.create('s2s3s4'),
        TileSet.create('m5m5'),
    )

    hand.tsumo = true
    hand.wait = hand.sets[1].tiles[1]

    const wall = Array.from({ length: 14 }, () => new Tile('m1'))
    for (const tile of wall) tile.isClosed = true

    const game = {
        hand,
        yaku: [],
        wall,
        seatWind: 'wS',
        prevalentWind: 'wE',
    }

    const result = scores(game)
    expect(result.minipoints).toEqual(60)
    expect(result.fuDetails.length > 0).toBeTruthy()
    expect(result.fuDetails.find((item) => item.label === 'closed kan (honor)' && item.value === 32)).toBeTruthy()
})


test('1 han 30 fu ron', () => {
    const result = score(ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN'), 1)

    expect(result.minipoints).toEqual(30)
    expect(result.fuDetails).toEqual([{ value: 30, label: 'base (closed ron)' }])
    expect(result.scores).toEqual({ main: 1000 })
})


test('dealer ron is paid 1.5 times', () => {
    const result = score(ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN'), 1, { seatWind: 'wE' })

    expect(result.scores).toEqual({ main: 1500 })
})


test('tsumo splits the payment', () => {
    const hand = ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN')
    hand.tsumo = true

    const result = score(hand, 1)

    // main is the hand total as shown in the scores table
    expect(result.scores).toEqual({ main: 1000, east: 500, additional: 300 })
    expect(result.minipoints).toEqual(30)
    expect(result.fuDetails.find((item) => item.label === 'round up')).toEqual({ value: 8, label: 'round up' })
})


test('limits by fan', () => {
    const hand = () => ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN')

    expect(score(hand(), 5).scores.main).toEqual(8000) // mangan
    expect(score(hand(), 6).scores.main).toEqual(12000) // haneman
    expect(score(hand(), 8).scores.main).toEqual(16000) // baiman
    expect(score(hand(), 11).scores.main).toEqual(24000) // sanbaiman

    const yakuman = ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN')
    yakuman.options.yakuman = true
    const result = score(yakuman, 13)
    expect(result.fan).toEqual(13)
    expect(result.scores.main).toEqual(32000)
    expect(result.minipoints).toEqual(0)
    expect(result.fuDetails).toEqual([])
})


test('13 han without yakuman is capped at sanbaiman', () => {
    const result = score(ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN'), 13)

    expect(result.fan).toEqual(12)
    expect(result.scores.main).toEqual(24000)
})


test('4 han 40 fu is rounded up to mangan', () => {
    // 30 base + 8 closed pon of terminals + 2 value pair
    const hand = ronHand('p4p5p6 s4s5s6 m7m8m9 m1m1m1 dGdG')
    const result = score(hand, 4)

    expect(result.minipoints).toEqual(40)
    expect(result.fuDetails).toContainEqual({ value: 8, label: 'closed pon (m1)' })
    expect(result.fuDetails).toContainEqual({ value: 2, label: 'value pair' })
    expect(result.scores.main).toEqual(8000)
})


test('open kan is worth less than a closed one', () => {
    const hand = new Hand(
        TileSet.create('p4p5p6'),
        TileSet.create('s4s5s6'),
        TileSet.create('m7m8m9'),
        TileSet.create('m5m5m5m5'),
        TileSet.create('dGdG'),
    )
    hand.isOpened = true
    hand.sets[3].isOpened = true
    hand.wait = hand.sets[0].tiles[2]

    const result = score(hand, 2)

    // 20 open base + 2 value pair + 8 open kan
    expect(result.minipoints).toEqual(30)
    expect(result.fuDetails).toContainEqual({ value: 20, label: 'base' })
    expect(result.fuDetails).toContainEqual({ value: 8, label: 'open kan (m5)' })
    expect(result.scores.main).toEqual(2000)
})


test('counts penchan waits', () => {
    const lower = Hand.create('m1m2m3 p4p5p6 s4s5s6 m7m8m9 wNwN')
    lower.wait = lower.sets[0].tiles[2] // m3 finishing 1-2-3
    expect(score(lower, 1).fuDetails).toContainEqual({ value: 2, label: 'penchan wait' })

    const upper = Hand.create('m1m2m3 p4p5p6 s4s5s6 m7m8m9 wNwN')
    upper.wait = upper.sets[3].tiles[0] // m7 starting 7-8-9
    expect(score(upper, 1).fuDetails).toContainEqual({ value: 2, label: 'penchan wait' })
})


test('counts kanchan waits', () => {
    const hand = Hand.create('m1m2m3 p4p5p6 s4s5s6 m7m8m9 wNwN')
    hand.wait = hand.sets[0].tiles[1] // m2 inside 1-2-3

    expect(score(hand, 1).fuDetails).toContainEqual({ value: 2, label: 'kanchan wait' })
})


test('adds the open hand bonus', () => {
    const hand = ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN')
    hand.isOpened = true

    const result = score(hand, 1)

    // 20 open base + 2 open hand bonus, rounded up to 30
    expect(result.fuDetails).toContainEqual({ value: 2, label: 'open hand bonus' })
    expect(result.minipoints).toEqual(30)
})


test('counts a tanki wait', () => {
    const hand = ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN')
    hand.wait = hand.pair!.tiles[0]

    expect(score(hand, 1).fuDetails).toContainEqual({ value: 2, label: 'tanki wait' })
})


test('pinfu fixes the minipoints', () => {
    const hand = ronHand('m4m5m6 p4p5p6 s4s5s6 m7m8m9 wNwN')
    hand.options.pinfu = true

    const ron = score(hand, 1)
    expect(ron.minipoints).toEqual(30)
    expect(ron.fuDetails).toEqual([{ value: 30, label: 'pinfu ron fixed fu' }])

    hand.tsumo = true
    const tsumo = score(hand, 1)
    expect(tsumo.minipoints).toEqual(20)
    expect(tsumo.fuDetails).toEqual([{ value: 20, label: 'pinfu tsumo fixed fu' }])
})


test('dora and ura dora are counted from open indicators only', () => {
    const hand = ronHand('m2m2m2 p4p5p6 s4s5s6 m7m8m9 wNwN')

    const withIndicators = wall()
    reveal(withIndicators, 2, 'm1')
    reveal(withIndicators, 9, 'p3')
    // a closed indicator must not count, otherwise dora would be 6
    const hidden = new Tile('m1')
    hidden.isClosed = true
    withIndicators[3] = hidden

    const plain = score(hand, 1, { wall: withIndicators })
    expect(plain.dora).toEqual(3) // three m2 tiles, m1 indicator
    expect(plain.uraDora).toEqual(1) // one p4 tile, p3 indicator
    expect(plain.fan).toEqual(4) // ura dora only counts on riichi

    hand.options.riichi = true
    const riichi = score(hand, 1, { wall: withIndicators })
    expect(riichi.uraDora).toEqual(1)
    expect(riichi.fan).toEqual(5)
})
