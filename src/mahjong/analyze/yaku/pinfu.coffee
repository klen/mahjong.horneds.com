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

        waitSet = hand.wait.set
        return if waitSet.isPon

        return if hand.pair.suit == 'd'
        return if hand.pair.value in [seatWind, prevalentWind]

        if (
                waitSet.isPair or
                (hand.wait.value == 7 and waitSet.value[1] == '7') or
                (hand.wait.value == 3 and waitSet.value[1] == '1') or
                not (hand.wait.id in [waitSet.tiles[0].id, waitSet.tiles[2].id])
                )
            for set in hand.sets
                continue unless set.isRow
                continue if set.id == waitSet.id
                return 1 if hand.wait.tile in [set.tiles[0].tile, set.tiles[2].tile]

            return

        return 1
