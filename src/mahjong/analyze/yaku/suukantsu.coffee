# SUU KAN TSU (Four kongs)
# ------------------------
# Hand with four kongs.
#
module.exports =
    name: 'suu kan tsu'
    yakuman: true
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isKan)
        return unless sets.length >= 4
        return 13
