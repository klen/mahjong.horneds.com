yaku = require './pinfu'
{ Hand } = require '../../tiles'

test 'test pinfu', ->
    hand = Hand.create('m7m8m9 p2p3p4 p6p7p8 s2s3s4 p8p8')
    hand.wait = hand.tiles()[3]
    expect yaku.test { hand }
        .toEqual 1

    hand = Hand.create('m7m8m9 p2p3p4 p6p7p8 s2s3s4 p8p8')
    hand.wait = hand.tiles()[9]
    expect yaku.test { hand }
        .toEqual 1

    # Penchan
    hand = Hand.create('m1m2m3 m7m8m9 p7p8p9 s2s3s4 m5m5')
    hand.wait = hand.tiles()[8] # p7
    expect yaku.test { hand }
        .toBeFalsy()

    hand.wait = hand.tiles()[2] # m3
    expect yaku.test { hand }
        .toBeFalsy()
