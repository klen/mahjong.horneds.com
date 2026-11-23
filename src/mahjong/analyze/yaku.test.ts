import { Hand } from '../tiles'
import analyze from './index'


test('test shou_sangen', () => {
    const hand = Hand.create('dWdWdWdRdRdRp7p8p9m1m2m3dGdG')

    expect(hand.wait).toBeTruthy()
    expect(hand.wait!.set).toBeTruthy()

    expect(analyze({ hand })).toBeTruthy()

    expect(hand.options['shou sangen']).toBeTruthy()
    expect(hand.options['yakuhai']).toBeTruthy()

    const other = Hand.create('m3m4m5 p1p2p3p4p5p6p7p8p9s7s7')
    other.wait = other.tiles()[7] // p5
    other.tsumo = true

    expect(analyze({ hand: other })).toBeTruthy()
    expect(other.options['itsu']).toBeTruthy()
})


test('selects highest-fan decomposition for ambiguous hands', () => {
    const hand = Hand.create('s1s2s3s1s2s3s1s2s3s4s5s6s1s1')
    // wait in the chow, so sanankou stays valid on ron and the choice is not random
    hand.wait = hand.tiles().find((tile) => tile.tile === 's4')!

    const { yaku } = analyze({ hand })
    const names = yaku.map((item) => item.name)

    expect(names.includes('sanankou')).toBeTruthy()
    expect(names.includes('iipeikou')).toBeFalsy()
    expect(hand.options['sanankou']).toBeTruthy()
})


test('sanshoku matches sequences other than 123', () => {
    const hand = Hand.create('m4m5m6s4s5s6p4p5p6m2m3m4s1s1')
    hand.wait = hand.tiles()[3]

    analyze({ hand })

    expect(hand.options['sanshoku']).toBeTruthy()
})
