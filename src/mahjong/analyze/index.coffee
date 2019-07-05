orderBy = require 'lodash/orderBy'
random = require 'lodash/random'


TSUMO_PERCENT = 40
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
    yaku_list = []
    exclude = {}
    hand.tsumo = TSUMO_PERCENT > random(100)
    for yaku in YAKU_LIST
        continue if exclude[yaku.name]
        fan = yaku.test(game)
        continue unless fan
        yaku_list.push { fan, name: yaku.name }
        hand.options[yaku.name] = true
        if yaku.yakuman
            hand.options.yakuman = true
            break
        continue unless yaku.exclude
        exclude[name] = true for name in yaku.exclude

    unless yaku_list.length
        hand.options.riichi = true
        yaku_list.push name: 'riichi', fan: 1

    return {
        game...,
        yaku: orderBy yaku_list, 'fan', ['desc']
    }
