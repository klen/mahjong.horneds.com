# SUU KAN TSU (Four kongs)
module.exports =
    name: 'suu kan tsu'
    yakuman: true
    desc: "Hand with four kongs."
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isKan)
        return unless sets.length >= 4
        return 13
