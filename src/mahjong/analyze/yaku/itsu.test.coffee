yaku = require './itsu'
{ Hand } = require '../../tiles'

test 'test itsu', ->
    hand = Hand.create('p1p2p3p4p5p6p7p8p9m1m2m3s1s1')
    expect yaku.test { hand }
        .toEqual 2

    hand = Hand.create('m7m8m9p1p2p3p4p5p6p7p8p9dWdW')
    expect yaku.test { hand }
        .toEqual 2

    hand = Hand.create('m3m4m5 p1p2p3p4p5p6p7p8p9s7s7')
    hand.tsumo = true
    hand.wait = hand.tiles()[7] # p5
    expect yaku.test { hand }
        .toEqual 2

    hand = Hand.create('s1s2s3 s4s5s6 s5s6s7 s7s8s9 s7s7')
    expect yaku.test { hand }
        .toEqual 2

    hand = Hand.create('s4s5s6 s5s6s7 s7s8s9 s1s2s3 s7s7')
    expect yaku.test { hand }
        .toEqual 2

    hand = Hand.create('p4p5p6p7p8p9p7p8p9s7s8s9s3s3')
    expect yaku.test { hand }
        .toBeFalsy()

