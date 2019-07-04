# Itsu (Pure Straight)
# --------------------
# Hand with three consecutive chows in the same suit
#
module.exports =
    name: 'itsu'
    exclude: ['tanyao', 'chanta', 'junchan', 'ryanpeikou', 'sanshoku', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku doku', 'honroutou', 'sankantsu', 'shou sangen']
    test: ({ hand }) ->
        suits = {s: [], m: [], p: []}
        for set in hand.sets
            continue unless set.isRow
            suits[set.suit].push set.value[1]

        for _, value of suits
            continue unless value.join('') == '147'
            return hand.isOpened and 1 or 2
