import { GameState } from '../../types'

// TSUU IISOU (All Honours)
export default {
    name: 'tsuu iisou',
    yakuman: true,
    desc: 'Hand composed entirely of honour tiles.',
    test: ({ hand }: GameState) => {
        for (const tile of hand.tiles())
            if (!tile.isHonor) return
        return 13
    },
}
