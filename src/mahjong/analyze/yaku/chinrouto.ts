import { GameState } from '../../types'

// CHINROUTO (All Terminals)
export default {
    name: 'chinrouto',
    yakuman: true,
    test: ({ hand }: GameState) => {
        for (const tile of hand.tiles())
            if (!tile.isTerminal) return

        return 13
    },
    desc: 'Hand composed entirely of terminal tiles.',
}
