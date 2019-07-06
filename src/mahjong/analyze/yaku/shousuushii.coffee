# SHOU SUUSHII (Little Four Winds)
module.exports =
    name: 'shou suushii'
    yakuman: true
    desc: "Hand with three pungs/kongs of winds and a pair of winds."
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isHonor and set.suit == 'w')
        return unless sets.length == 3
        return unless hand.pair.suit == 'w'
        return 13
