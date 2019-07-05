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

