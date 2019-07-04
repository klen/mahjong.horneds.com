# CHINROUTO (All Terminals)
# -------------------------
# Hand composed entirely of terminal tiles.
#
module.exports =
    name: 'chinrouto'
    yakuman: true
    test: ({ hand }) ->
        for tile in hand.tiles()
            return unless tile.isTerminal

        return 13
