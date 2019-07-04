# CHANTA (Outside Hand)
# ---------------------
# All sets contain terminals or honours, and the pair is terminals or honours.
# The hand contains at least one chow. Gives an extra fan if concealed
#
module.exports =
    name: 'chanta'
    exclude: ['tanyao', 'junchan', 'itsu', 'chinitsu', 'toitoi', 'chitoitsu', 'honroutou']
    test: ({ hand }) ->
        return false unless hand.pair.isHonor or hand.pair.isTerminal
        for set in hand.sets
            return false unless set.isHonor or set.isTerminal

        return hand.isOpened and 1 or 2
