flatten = require 'lodash/flatten'
orderBy = require 'lodash/orderBy'
random = require 'lodash/random'
sample = require 'lodash/sample'
some = require 'lodash/some'
uniq = require 'lodash/uniq'

{ SUITS } = require './resources'

uid = 0


class Tile

    constructor: (@tile) ->
        @id = ++uid
        @isClosed = false

        @suit = @tile[0]
        @isHonor = @suit in ['d', 'w']

        @value = @tile[1]
        @value = parseInt @value unless @isHonor
        @isTerminal = @value in [1, 9]
        @set = null

        return @

    isConnected: (tile) ->
        return false unless @suit == tile.suit
        return true if @value == tile.value
        return false if @isHonor
        return Math.abs(@value - tile.value) == 1

    next: ->
        suit = SUITS[@suit]
        return suit[(suit.indexOf(@tile) + 1) % suit.length]


class TileSet

    constructor: (@tiles...) ->
        @id = ++uid

    isValid: ->
        @isPair = @tiles.length == 2
        @isKong = @tiles.length == 4
        unique = uniq(t.value for t in @tiles).length
        isValid = unique in [1, @tiles.length]
        isValid = isValid and @tiles[idx].isConnected @tiles[idx + 1] for idx in [0..@tiles.length - 2]
        isValid = isValid and unique == 1 if @isPair
        return unless isValid

        @isPon = unique == 1
        @isRow = unique == 3
        @isHonor = @tiles[0].isHonor
        @isTerminal = some @tiles, 'isTerminal'
        @isOpened = false

        @tiles = orderBy @tiles, 'value'
        @suit = @tiles[0].suit
        @value = "#{@suit}#{@tiles[0].value}"
        t.set = @ for t in @tiles

        return @

    @create: (mask) ->
        tiles = mask.match /.{1,2}/g
        tiles = (new Tile(t) for t in tiles)
        ts = new TileSet(tiles...)
        ts.isValid()
        return ts


class Hand

    constructor: (sets...) ->
        @pair = null
        @sets = []
        @tsumo = false
        @wait = null
        @isOpened = false
        @options = {}
        @push(set) for set in sets

    push: (set) ->
        return unless set.isValid
        
        @sets.push set unless set.isPair
        @pair = set if set.isPair

        return unless @pair and @sets.length == 4
        @wait = sample @tiles()

    tiles: ->
        tiles = [(flatten (set.tiles for set in @sets))..., @pair.tiles...]
        return orderBy tiles, 'tile'

    @create: (mask) ->
        sets = mask.match /.{1,6}/g
        sets = (TileSet.create(set) for set in sets)
        return new Hand(sets...)


module.exports = { Tile, TileSet, Hand }
