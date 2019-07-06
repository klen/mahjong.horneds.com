# CHINITSU (Full Flush)
# ---------------------
module.exports =
    name: 'chinitsu'
    exclude: ['yakuhai', 'chanta', 'sanshoku', 'honitsu', 'sanshoku dokou', 'honroutou', 'shou sangen']
    test: ({ hand }) ->
        suit = null
        for tile in hand.tiles()
            return if tile.isHonor
            return if suit and suit != tile.suit
            suit = tile.suit

        return hand.isOpened and 5 or 6
    desc: """
        Hand composed entirely of tiles from only one of the three suits. No
        honours allowed. Gives an extra fan if concealed.
    """
