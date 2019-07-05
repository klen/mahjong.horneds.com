{ Hand } = require '../tiles'
analyze = require './index'

test 'test shou_sangen', ->
    hand = Hand.create('dWdWdWdRdRdRp7p8p9m1m2m3dGdG')

    expect hand.wait
        .toBeTruthy()

    expect hand.wait.set
        .toBeTruthy()

    expect analyze({ hand })
        .toBeTruthy()

    expect hand.options['shou sangen']
        .toBeTruthy()

    expect hand.options['yakuhai']
        .toBeTruthy()

    hand = Hand.create('m3m4m5 p1p2p3p4p5p6p7p8p9s7s7')
    hand.wait = hand.tiles()[7] # p5
    hand.tsumo = true

    expect analyze({ hand })
        .toBeTruthy()

    expect hand.options['itsu']
        .toBeTruthy()
