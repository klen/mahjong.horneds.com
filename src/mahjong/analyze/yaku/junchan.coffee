# JUNCHAN (Terminals in All Sets)
# -------------------------------
#
module.exports =
    name: 'junchan'
    exclude: ['tanyao', 'yakuhai', 'chanta', 'itsu', 'honitsu', 'toitoi', 'chitoitsu', 'honroutou', 'shou sangen']
    desc: """
        All sets contain terminals, and the pair is terminals. The hand
        contains at least one chow. Gives an extra fan if concealed. """
    test: ({ hand }) ->
        return unless hand.pair.isTerminal
        row = false
        for set in hand.sets
            row = row or set.isRow
            return unless set.isTerminal

        return unless row
        return hand.isOpened and 2 or 3
