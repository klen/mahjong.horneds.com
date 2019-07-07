# Itsu (Pure Straight)
module.exports =
    name: 'itsu'
    exclude: ['tanyao', 'chanta', 'junchan', 'ryanpeikou', 'sanshoku', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku doku', 'honroutou', 'sankantsu', 'shou sangen']
    desc: "Hand with three consecutive chows in the same suit."
    test: ({ hand }) ->
        suits = {s: [], m: [], p: []}
        for set in hand.sets
            continue unless set.isRow
            suits[set.suit].push set.value[1] if set.value[1] in ['1', '4', '7']

        for _, value of suits
            continue unless value.length >= 3
            return hand.isOpened and 1 or 2
