# SAN KAN TSU (Three Kongs)
module.exports =
    name: 'sankantsu'
    exclude: ['pinfu', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chitoitsu']
    desc: "Hand with three kongs."
    test: ({ hand }) ->
        sets = (set for set in hand.sets when set.isKan)
        return unless sets.length >= 3
        return 2
