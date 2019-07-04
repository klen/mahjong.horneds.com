# TSUU IISOU (All Honours)
# Hand composed entirely of honour tiles.
#
module.exports =
    name: 'tsuu iisou'
    yakuman: true
    test: ({ hand }) ->
        for tile in hand.tiles()
            return unless tile.isHonor
        return 13
