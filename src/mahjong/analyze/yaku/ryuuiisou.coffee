# RYUU IISOU (All Green)
# Hand composed entirely of green tiles. Green tiles are: green dragons and 2, 3,
# 4, 6 and 8 of bamboo
#
TILES = ['s2', 's3', 's4', 's6', 's8', 'dG']
module.exports =
    name: 'ryuu iisou'
    yakuman: true
    test: ({ hand }) ->
        for tile in hand.tiles()
            return unless tile.tile in TILES

        return 13
