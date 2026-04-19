orderBy = require 'lodash/orderBy'
random = require 'lodash/random'
sumBy = require 'lodash/sumBy'

{ TileSet, Hand } = require '../tiles'


TSUMO_PERCENT = 40
RIICHI_PERCENT = 20
YAKU_LIST = [

    # Yakuman
    require './yaku/chuuren'
    require './yaku/suuankou'
    require './yaku/suukantsu'
    require './yaku/ryuuiisou'
    require './yaku/chinrouto'
    require './yaku/tsuuiisou'
    require './yaku/daisangen'
    require './yaku/shousuushii'
    require './yaku/daisuushii'

    # 5 fan
    require './yaku/chinitsu'

    # 3 fan
    require './yaku/ryanpeikou'

    # 2 fan
    require './yaku/sanshoku_dokou'
    require './yaku/sanankou'
    require './yaku/sankantsu'
    require './yaku/toitoi'
    require './yaku/honitsu'
    require './yaku/shou_sangen'
    require './yaku/honroutou'
    require './yaku/junchan'

    # 1 fan
    require './yaku/pinfu'
    require './yaku/iipeikou'
    require './yaku/tanyao'
    require './yaku/sanshoku'
    require './yaku/itsu'
    require './yaku/yakuhai'
    require './yaku/chanta'
    require './yaku/tsumo'
]

module.exports = (game) ->
    { hand } = game
    tsumo = TSUMO_PERCENT > random(100)

    candidates = buildCandidates hand
    best = null

    for candidate in candidates
        candidate.options = {}
        candidate.tsumo = tsumo

        yaku_list = evaluateYaku { game..., hand: candidate }
        score = sumBy yaku_list, 'fan'

        continue if best and best.score >= score
        best = { hand: candidate, yaku: yaku_list, score }

    best ?= { hand, yaku: [], score: 0 }

    unless best.hand.isOpened
        if not best.yaku.length or RIICHI_PERCENT >= random(100)
            best.hand.options.riichi = true
            best.yaku.push name: 'riichi', fan: 1, desc: "Concealed waiting hand declared at 1,000 points stake."

    hand.sets = best.hand.sets
    hand.pair = best.hand.pair
    hand.wait = best.hand.wait
    hand.options = best.hand.options
    hand.tsumo = best.hand.tsumo

    return {
        game...
        hand
        yaku: orderBy best.yaku, 'fan', ['desc']
    }


evaluateYaku = (game) ->
    { hand } = game
    yaku_list = []
    exclude = {}

    for yaku in YAKU_LIST
        continue if exclude[yaku.name]
        fan = yaku.test(game)
        continue unless fan
        yaku_list.push { fan, name: yaku.name, desc: yaku.desc }
        hand.options[yaku.name] = true
        if yaku.yakuman
            hand.options.yakuman = true
            break
        continue unless yaku.exclude
        exclude[name] = true for name in yaku.exclude

    return yaku_list


buildCandidates = (hand) ->
    return [hand] if hand.isOpened
    return [hand] if (set for set in hand.sets when set.isKan).length

    tiles = orderBy hand.tiles(), ['suit', 'value', 'id']
    waitTile = hand.wait
    signatures = {}
    candidates = []

    pairs = findPairs tiles
    return [hand] unless pairs.length

    for pair in pairs
        rest = withoutTiles tiles, pair
        melds = []
        collectMelds rest, [], melds

        for meld in melds
            pairSet = (new TileSet(pair...)).isValid()
            meldSets = ((new TileSet(group...)).isValid() for group in meld)
            candidate = new Hand(meldSets..., pairSet)
            candidate.wait = findWait candidate, waitTile
            candidate.isOpened = false

            signature = handSignature candidate
            continue if signatures[signature]
            signatures[signature] = true
            candidates.push candidate

    return candidates.length and candidates or [hand]


findPairs = (tiles) ->
    result = []
    idx = 0
    while idx < tiles.length - 1
        if tiles[idx].tile == tiles[idx + 1].tile
            result.push [tiles[idx], tiles[idx + 1]]
            tile = tiles[idx].tile
            idx += 1 while idx < tiles.length and tiles[idx].tile == tile
            continue
        idx += 1

    return result


withoutTiles = (tiles, exclude) ->
    excludeIds = {}
    excludeIds[tile.id] = true for tile in exclude
    return (tile for tile in tiles when not excludeIds[tile.id])


collectMelds = (tiles, chain, acc) ->
    if not tiles.length
        acc.push chain
        return

    base = tiles[0]

    same = (tile for tile in tiles when tile.tile == base.tile)
    if same.length >= 3
        meld = [same[0], same[1], same[2]]
        rest = withoutTiles tiles, meld
        collectMelds rest, [chain..., meld], acc

    return if base.isHonor

    next1 = tiles.find (tile) -> tile.suit == base.suit and tile.value == base.value + 1
    next2 = tiles.find (tile) -> tile.id != next1?.id and tile.suit == base.suit and tile.value == base.value + 2
    return unless next1 and next2

    meld = [base, next1, next2]
    rest = withoutTiles tiles, meld
    collectMelds rest, [chain..., meld], acc


findWait = (hand, waitTile) ->
    return hand.wait unless waitTile
    for tile in hand.tiles()
        return tile if tile.tile == waitTile.tile
    return hand.wait


handSignature = (hand) ->
    sets = (set.value for set in hand.sets).sort()
    pair = hand.pair?.value or ''
    return "#{pair}|#{sets.join(',')}"
