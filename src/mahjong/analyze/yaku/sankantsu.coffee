# SAN KAN TSU (Three Kongs)
# -------------------------
# Hand with three kongs
#
module.exports =
    name: 'sankantsu'
    exclude: ['pinfu', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu']
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isKan)
        return unless sets.length >= 3
        return 2
