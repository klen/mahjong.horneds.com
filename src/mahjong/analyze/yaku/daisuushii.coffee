# DAI SUUSHII (Little Four Winds)
module.exports =
    name: 'dai suushii'
    yakuman: true
    desc: "Hand with four pungs/kongs of winds."
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isHonor and set.suit == 'w')
        return unless sets.length == 4
        return 13
