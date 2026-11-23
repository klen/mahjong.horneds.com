import { GameState } from '../../types'

// RYUU IISOU (All Green)
const GREEN_TILES = ['s2', 's3', 's4', 's6', 's8', 'dG']

export default {
    name: 'ryuu iisou',
    yakuman: true,
    desc: `Hand composed entirely of green tiles. Green tiles are: green dragons and 2, 3,
        4, 6 and 8 of bamboo. `,
    test: ({ hand }: GameState) => {
        for (const tile of hand.tiles())
            if (!GREEN_TILES.includes(tile.tile)) return

        return 13
    },
}
