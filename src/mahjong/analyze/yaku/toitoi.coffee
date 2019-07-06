# TOI-TOI HOU (All Pungs)
module.exports =
    name: 'toitoi'
    exclude: ['pinfu', 'chanta', 'junchan', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu']
    desc: "Hand with four pungs/kongs and a pair."
    test: ({ hand }) ->
        for set in hand.sets
            return if set.isRow
        return 2
