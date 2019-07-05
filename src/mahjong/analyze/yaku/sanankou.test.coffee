yaku = require './sanankou'
{ Hand } = require '../../tiles'

test 'test sanankou', ->
    hand = Hand.create('m9m9m9 p2p2p2 p7p8p9 wWwWwW s8s8')
    hand.wait = hand.tiles()[13]
    hand.tsumo = true

    expect yaku.test { hand }
        .toEqual 2

    hand.tsumo = false

    expect yaku.test { hand }
        .toBeFalsy()
