# HONROUTOU (All Terminals and Honours)
# -------------------------------------
#
module.exports =
    name: 'honroutou'
    exclude: ['tanyao', 'pinfu', 'chanta', 'junchan',  'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chinitsu']
    desc: """
        Hand containing only terminals and honours. Add two fan for All Pungs
        (TOI-TOI HOU) or Seven Pairs (CHI TOITSU). """
    test: ({ hand }) ->
        for tile in hand.tiles()
            return unless tile.isHonor or tile.isTerminal

        return 2
