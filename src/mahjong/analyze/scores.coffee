sumBy = require 'lodash/sumBy'


module.exports = ({ hand, yaku, dora, uraDora, seatWind, prevalentWind, riichi }) ->
    fan = sumBy yaku, 'fan'
    fan += dora
    fan += uraDora if riichi

    fan = Math.min(13, fan)
    fan = Math.min(12, fan) unless hand.options.yakuman

    basePoints = switch
        when fan >= 13 then 8000
        when fan >= 11 then 6000
        when fan >= 8  then 4000
        when fan >= 6  then 3000
        when fan >= 5  then 2000
        else 0

    minipoints = 0
    unless basePoints
        minipoints = 20
        unless hand.tsumo or hand.isOpened
            minipoints = 30

        # minipoints for pair
        if hand.pair.suit == 'd' or hand.pair.value in [seatWind, prevalentWind]
            minipoints += 2

        # +2 for Tsumo
        minipoints += 2 if hand.tsumo

        # Points for sets (TODO: kongs)
        for set in hand.sets
            continue unless set.isPon
            point = if set.isOpened then 2 else 4
            point *= 2 if set.isHonor or set.isTerminal
            minipoints += point

        # Points for waiting
        unless hand.wait.id in [hand.wait.set.tiles[0].id, hand.wait.set.tiles[hand.wait.set.tiles.length - 1].id]
            minipoints += 2

        # No minipoints
        if hand.isOpened and minipoints == 20
            minipoints += 2

        # Round the minipoints
        minipoints = Math.ceil(minipoints / 10) * 10

        if hand.options.pinfu
            minipoints = if hand.tsumo then 20 else 30

        basePoints = minipoints * Math.pow(2, 2 + fan)

        if (fan == 4 and minipoints >= 30) or (fan == 3 and minipoints >= 60)
            basePoints = 2000

    doublePoints = round basePoints * 2
    fourPoints = round basePoints * 4
    sixPoints = round basePoints * 6
    basePoints = round basePoints

    scores =
        main: seatWind == 'wE' and sixPoints or fourPoints

    if hand.tsumo
        scores.east = doublePoints
        scores.additional = basePoints

    return { fan, minipoints, scores }


round = (d) -> Math.ceil(d / 100.0) * 100
