# MENZEN TSUMO (Fully Concealed Hand)
# -----------------------------------
# Winning on a self-draw on a concealed hand.
#
module.exports =
    name: 'tsumo'
    test: ({ hand }) ->
        return if hand.isOpened
        return unless hand.tsumo
        return 1
