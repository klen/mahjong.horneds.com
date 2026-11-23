import { GameState } from '../../types'

// DAI SANGEN (Big Three Dragons)
export default {
    name: 'dai sangen',
    yakuman: true,
    desc: 'Hand with three pungs/kongs of dragons.',
    test: ({ hand }: GameState) => {
        const sets = hand.sets.filter((set) => set.isHonor && set.suit === 'd')
        if (sets.length !== 3) return
        return 13
    },
}
