sample = require 'lodash/sample'
shuffle = require 'lodash/shuffle'
uniq = require 'lodash/uniq'
random = require 'lodash/random'
orderBy = require 'lodash/orderBy'

{ Tile, TileSet, Hand } = require './tiles'


{ TILES, SUITS } = require './resources'

TERMINALS_PERCENT = 80
HONORS_PERCENT = 70
PONS_PERCENT = 30


findSet = (tiles, pair=false) ->
    for t1, idx1 in tiles
        continue if t1.isTerminal and random(100) > TERMINALS_PERCENT
        continue if t1.isHonor and random(100) > HONORS_PERCENT
        for t2, idx2 in tiles[(idx1 + 1)...]
            if pair
                set = new TileSet(t1, t2)
                continue unless set.isValid()
                return set

            continue unless t1.isConnected t2
            continue if t2.isTerminal and random(100) > TERMINALS_PERCENT
            continue if t1.value == t2.value and random(100) > PONS_PERCENT
            for t3 in tiles[(idx1 + idx2 + 2)...]
                continue if t1.isTerminal and random(100) > TERMINALS_PERCENT
                set = new TileSet(t1, t2, t3)
                return set if set.isValid()

generateGameState = ->
    tiles = (new Tile(t) for t in shuffle TILES)
    wall = tiles.splice(0, 14)
    tile.isClosed = true for tile in wall
    indicator = 0
    while not indicator or (random(100) > 75 and indicator < 4)
        wall[2 + indicator].isClosed = wall[9 + indicator].isClosed = false
        indicator += 1

    hand = new Hand()
    while hand.sets.length < 4
        set = findSet tiles
        tiles.splice(tiles.indexOf(tile), 1) for tile in set.tiles
        hand.push set
    hand.push findSet tiles, true

    return {
        wall, hand
        seatWind: sample SUITS.w
        prevalentWind: sample [SUITS.w[0], SUITS.w[1]]
    }

module.exports = { findSet, generateGameState }
