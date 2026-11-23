import { GameState } from '../../types'

// SHOU SANGEN (Little Three Dragons)
export default {
    name: 'shou sangen',
    exclude: ['tanyao', 'pinfu', 'junchan', 'ryanpeikou', 'sanshoku', 'itsu', 'chinitsu', 'chitoitsu', 'sanshoku dokou'],
    desc: `Hand with two dragon pungs/kongs and a pair of dragons. Add one fan for
        each of the individual dragon pungs.`,
    test: ({ hand }: GameState) => {
        if (hand.pair!.suit !== 'd') return
        const sets = hand.sets.filter((set) => set.suit === 'd')
        if (sets.length < 2) return
        return 2
    },
}
