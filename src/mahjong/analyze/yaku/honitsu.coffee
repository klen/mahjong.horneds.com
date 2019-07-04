# HONITSU (Half Flush)
# --------------------
# Hand with tiles from only one of the three suits, in combination with
# honours. Gives an extra fan if concealed.
#
module.exports =
    name: 'honitsu'
    exclude: ['tanyao', 'junchan', 'sanshoku', 'chinitsu', 'sanshoku dokou']
    test: ({ hand }) ->
        isHonor = hand.pair.isHonor
        suits = if isHonor then [] else [hand.pair.suit]
        for set in hand.sets
            if set.isHonor
                isHonor = true
                continue

            suits.push set.suit unless set.suit in suits

        return unless isHonor and suits.length == 1
        return hand.isOpened and 2 or 3
