# DAI SANGEN (Big Three Dragons)
module.exports =
    name: 'dai sangen'
    yakuman: true
    desc: "Hand with three pungs/kongs of dragons."
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isHonor and set.suit == 'd')
        return unless sets.length == 3
        return 13
