import { GameState } from '../../types'

// SHOU SUUSHII (Little Four Winds)
export default {
    name: 'shou suushii',
    yakuman: true,
    desc: 'Hand with three pungs/kongs of winds and a pair of winds.',
    test: ({ hand }: GameState) => {
        const sets = hand.sets.filter((set) => set.isHonor && set.suit === 'w')
        if (sets.length !== 3) return
        if (hand.pair!.suit !== 'w') return
        return 13
    },
}
