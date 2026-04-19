scores = require './scores'
{ TileSet, Hand } = require '../tiles'
{ Tile } = require '../tiles'


test 'counts fu for concealed honor kan', ->
    hand = new Hand(
        TileSet.create('wEwEwEwE')
        TileSet.create('m2m3m4')
        TileSet.create('p2p3p4')
        TileSet.create('s2s3s4')
        TileSet.create('m5m5')
    )

    hand.tsumo = true
    hand.wait = hand.sets[1].tiles[1]

    game =
        hand: hand
        yaku: []
        wall: (new Tile('m1') for _ in [1..14])
        seatWind: 'wS'
        prevalentWind: 'wE'

    result = scores(game)
    expect(result.minipoints).toEqual(60)
    expect(result.fuDetails.length > 0).toBeTruthy()
    expect(result.fuDetails.find((item) -> item.label == 'closed kan (honor)' and item.value == 32)).toBeTruthy()
