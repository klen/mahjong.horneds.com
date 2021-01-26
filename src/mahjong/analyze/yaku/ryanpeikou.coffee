# RYAN PEIKOU (Twice Pure Double Chows)
module.exports =
    name: 'ryanpeikou'
    exclude: ['yakuhai', 'iipeikou', 'sanshoku', 'itsu', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu', 'shou sangen']
    desc: "Concealed hand with four chows which two and two form Pure Double Chows."
    test: ({ hand }) ->
        return if hand.isOpened
        sets = (set for set in hand.sets when set.isRow)
        return unless sets.length >= 4

        identical = 0
        for a in sets
            for b in sets
                continue if a.id == b.id
                identical++ if a.value == b.value
        
        return if identical == 6
        return if identical < 4
        return 3
