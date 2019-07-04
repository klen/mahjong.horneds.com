# DAI SUUSHII (Little Four Winds)
# --------------------------------
# Hand with four pungs/kongs of winds.
#
module.exports =
    name: 'dai suushii'
    yakuman: true
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isHonor and set.suit == 'w')
        return unless sets.length == 4
        return 13
