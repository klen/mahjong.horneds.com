import { GameState } from '../../types'

// HONROUTOU (All Terminals and Honours)
export default {
    name: 'honroutou',
    exclude: ['tanyao', 'pinfu', 'chanta', 'junchan', 'iipeikou', 'ryanpeikou', 'sanshoku', 'itsu', 'chinitsu'],
    desc: `Hand containing only terminals and honours. Add two fan for All Pungs
        (TOI-TOI HOU) or Seven Pairs (CHI TOITSU). `,
    test: ({ hand }: GameState) => {
        for (const tile of hand.tiles())
            if (!tile.isHonor && !tile.isTerminal) return

        return 2
    },
}
