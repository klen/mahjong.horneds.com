# TSUU IISOU (All Honours)
module.exports =
    name: 'tsuu iisou'
    yakuman: true
    desc: "Hand composed entirely of honour tiles."
    test: ({ hand }) ->
        for tile in hand.tiles()
            return unless tile.isHonor
        return 13
