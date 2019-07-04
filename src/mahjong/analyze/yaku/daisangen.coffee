# DAI SANGEN (Big Three Dragons)
# ------------------------------
# Hand with three pungs/kongs of dragons.
#
module.exports =
    name: 'dai sangen'
    yakuman: true
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isHonor and set.suit == 'd')
        return unless sets.length == 3
        return 13
