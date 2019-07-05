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
