yaku = require './itsu'
{ Hand } = require '../../tiles'

test 'test itsu', ->
    hand = Hand.create('p1p2p3p4p5p6p7p8p9m1m2m3s1s1')
    expect yaku.test { hand }
        .toEqual 2

    hand = Hand.create('m7m8m9p1p2p3p4p5p6p7p8p9dWdW')
    expect yaku.test { hand }
        .toEqual 2
