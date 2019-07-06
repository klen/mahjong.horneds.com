# SANSHOKU (Mixed Triple Chow)
module.exports =
    name: 'sanshoku'
    exclude: ['ryanpeikou', 'itsu', 'honitsu', 'chinitsu', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu', 'shou sangen']
    desc: "Hand with three chows of the same numerical sequence, one in each suit"
    test: ({ hand }) ->
        suits = {s: [], m: [], p: []}
        for set in hand.sets
            continue unless set.isRow
            suits[set.suit].push set.value[1]

        for souSet in suits.s
            for manSet in suits.m
                for pinSet in suits.p
                    continue unless souSet == manSet == pinSet
                    return hand.isOpened and 1 or 2
