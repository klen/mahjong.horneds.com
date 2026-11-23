import { GameState } from '../../types'

// DAI SUUSHII (Little Four Winds)
export default {
    name: 'dai suushii',
    yakuman: true,
    desc: 'Hand with four pungs/kongs of winds.',
    test: ({ hand }: GameState) => {
        const sets = hand.sets.filter((set) => set.isHonor && set.suit === 'w')
        if (sets.length !== 4) return
        return 13
    },
}
