# CHUUREN POOTO (Nine Gates)
# --------------------------
FORM = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]
module.exports =
    name: 'chuuren pooto'
    yakuman: true
    test: ({ hand }) ->
        # TODO: Need an implementation
        suit = null
        form = [FORM...]
        for tile in hand.tiles()
            return if tile.isHonor
            return if suit and suit != tile.suit
            suit = tile.suit
            form.splice(form.indexOf(tile.value), 1) unless form.indexOf(tile.value) == -1

        return unless form.length == 0
        return 13
    desc: """
        Concealed hand consisting of the tiles 1112345678999 in the same suit
        plus any one extra tile in the same suit
    """
