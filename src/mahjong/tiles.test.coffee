{ TileSet, Hand } = require './tiles'


test 'TileSet:create', ->

    ts = TileSet.create('p1p2p3')
    expect(ts.tiles.length).toEqual(3)

    expect(ts.isValid()).toBeTruthy()

    ts = TileSet.create('p1p1')
    expect(ts.isValid()).toBeTruthy()
    expect(ts.isPair).toBeTruthy()


test 'Hand:create', ->
    hand = Hand.create('p1p2p3p4p5p6p7p8p9m1m2m3s1s1')

    expect hand.pair
        .toBeTruthy()

    expect hand.sets.length
        .toEqual 4
