import { Hand } from '../../tiles'
import yaku from './suuankou'


test('test suuankou', () => {
    const hand = Hand.create('m9m9m9 p2p2p2 p3p3p3 wWwWwW s8s8')
    hand.wait = hand.tiles()[13] // wW
    hand.tsumo = true

    expect(yaku.test({ hand })).toEqual(13)

    hand.tsumo = false

    expect(yaku.test({ hand })).toBeFalsy()
})
