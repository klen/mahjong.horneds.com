# HONROUTOU (All Terminals and Honours)
# -------------------------------------
# Hand containing only terminals and honours. Add two fan for All Pungs
# (TOI-TOI HOU) or Seven Pairs (CHI TOITSU).
#
module.exports =
    name: 'honroutou'
    exclude: ['tanyao', 'pinfu', 'chanta', 'junchan',  'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chinitsu']
    test: ({ hand }) ->
        for tile in hand.tiles()
            return unless tile.isHonor or tile.isTerminal

        return 2
