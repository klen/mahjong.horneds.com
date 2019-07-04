# TOI-TOI HOU (All Pungs)
# -----------------------
# Hand with four pungs/kongs and a pair.
#
module.exports =
    name: 'toitoi'
    exclude: ['pinfu', 'chanta', 'junchan', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu']
    test: ({ hand }) ->
        for set in hand.sets
            return if set.isRow
        return 2
