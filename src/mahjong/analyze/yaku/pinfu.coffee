# PINFU
# -----
#
module.exports =
    name: 'pinfu'
    exclude: ['yakuhai', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu', 'shou sangen']
    desc: """
        Concealed all chows hand with a valueless pair. I.e. a concealed hand
        with four chows and a pair that is neither dragons, nor seat wind, nor
        prevalent wind. The winning tile is required to finish a chow with a
        two-sided wait."""

    test: ({ hand, seatWind, prevalentWind }) ->
        return if hand.isOpened
        for set in hand.sets
            return if set.isPon

        return if hand.pair.suit == 'd'
        return if hand.pair.value in [seatWind, prevalentWind]

        waitSet = hand.wait.set
        return 1 unless (
            waitSet.isPair or
            (hand.wait.tile == waitSet.tiles[1].tile) or
            (waitSet.value[1] == '7' and hand.wait.value == 7) or
            (waitSet.value[1] == '1' and hand.wait.value == 3)
        )

        # Analize the wait
        for set in hand.sets
            return 1 if isEmbeded(hand.wait, set)

isEmbeded = (wait, set) ->
    return unless wait.suit == set.suit
    return if wait.set.id == set.id
    return true if set.value[1] != '7' and wait.tile == set.tiles[0].tile
    return true if set.value[1] != '1' and wait.tile == set.tiles[2].tile
