# SAN SHOKU DOKOU (Triple Pung)
# -----------------------------
# Hand with three pungs/kongs, one in each suit, of the same number
#
module.exports =
    name: 'sanshoku dokou'
    test: ({ hand }) ->
        suits = {s: [], m: [], p: []}
        for set in hand.sets
            continue unless set.isPon and not set.isHonor
            suits[set.suit].push set.value[1]

        for souSet in suits.s
            for manSet in suits.m
                for pinSet in suits.p
                    continue unless souSet == manSet == pinSet
                    return 2
