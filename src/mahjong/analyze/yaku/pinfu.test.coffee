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
    hand.wait = hand.tiles()[9] # p8
    expect yaku.test { hand }
        .toBeFalsy()

    hand.wait = hand.tiles()[2] # m3
    expect yaku.test { hand }
        .toBeFalsy()

    hand = Hand.create('m1m2m3 m7m8m9 p3p4p5 s6s7s8 p8p8')
    hand.wait = hand.tiles()[9] # p8
    expect yaku.test { hand }
        .toBeFalsy()

    hand = Hand.create('m3m4m5m7m8m9s6s7s8s7s8s9p4p4')
    hand.wait = hand.tiles()[12] # s8
    expect yaku.test { hand }
        .toEqual 1
