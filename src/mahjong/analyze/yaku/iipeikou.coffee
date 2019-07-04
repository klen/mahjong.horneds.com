uniq = require 'lodash/uniq'

# IIPEIKOU (Pure Double Chow)
# ---------------------------
# Concealed hand with two completely identical chows, i.e. the same values in the
# same suit
#
module.exports =
    name: 'iipeikou'
    exclude: ['ryanpeikou', 'toitoi', 'chitoitsu', 'sanankou', 'sanshoku dokou', 'honroutou', 'sankantsu']
    test: ({ hand }) ->
        return if hand.isOpened
        sets = (set.value for set in hand.sets when set.isRow)
        return if sets.length < 2
        unique = uniq sets
        return if unique.length == sets.length
        return 1
