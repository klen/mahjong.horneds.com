# MENZEN TSUMO (Fully Concealed Hand)
module.exports =
    name: 'tsumo'
    desc: "Winning on a self-draw on a concealed hand."
    test: ({ hand }) ->
        return if hand.isOpened
        return unless hand.tsumo
        return 1
